import type { NextApiRequest, NextApiResponse } from "next";
import type { TimelineItem } from "@/components/convo/history";

import { ChatOpenAI } from "langchain/chat_models/openai";
import {
	BaseChatMessage,
	HumanChatMessage,
	SystemChatMessage,
} from "langchain/schema";
import type { SetupForm } from "@/components/setup";

const chat = new ChatOpenAI({
	temperature: 0,
	modelName: process.env.MODEL,
	openAIApiKey: process.env.OPENAI_API_KEY,
});

const convertItemsToMessages = (items: TimelineItem[]) =>
	items
		.filter(({ type }) => type === "human" || type === "ai")
		.map(({ type, content }) => {
			switch (type) {
				case "human":
					return new HumanChatMessage(content);
				case "ai":
					return new SystemChatMessage(content);
			}
		}) as BaseChatMessage[];

export interface AiResponse {
	msg: string;
	reasoning: string;
}

export interface AiRequest {
	setup: SetupForm;
	history: TimelineItem[];
}

const messageFormat = `All of your responses should be in JSON format with two keys: "msg" and "reasoning".`;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AiResponse>
) {
	const { setup, history } = req.body as AiRequest;

	const messages = [
		new SystemChatMessage(
			`${setup.role}\n${setup.style}\n${messageFormat}\nStart the conversation now`
		),
		...convertItemsToMessages(history),
	];

	const chatResponse = await chat.call(messages);

	let data: AiResponse;
	try {
		data = JSON.parse(chatResponse.text);
	} catch (e) {
		console.error(`Unable to parse: ${chatResponse.text}`);
		res.status(500);
		return;
	}

	if (!data.msg || !data.reasoning) {
		console.error(`Missing expected keys: ${chatResponse.text}`);
		res.status(500);
		return;
	}

	//send the message via Signal to recipient
	await fetch("http://localhost:8080/v2/send", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			message: data.msg,
			number: setup.from,
			recipients: [setup.to],
		}),
	});

	res.status(200).json(data);
}
