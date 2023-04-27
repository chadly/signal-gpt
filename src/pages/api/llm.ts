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

	console.log(JSON.stringify(messages, null, 2));

	const chatResponse = await chat.call(messages);

	let data: AiResponse;
	try {
		data = JSON.parse(chatResponse.text);
	} catch (e) {
		console.warn(`Unable to parse: ${chatResponse.text}`);

		data = {
			msg: chatResponse.text,
			reasoning: "Unable to parse response from AI",
		};
	}

	if (!data.msg || !data.reasoning) {
		console.error(`Missing expected keys: ${chatResponse.text}`);
		res.status(500).json({
			reasoning: `Missing expected keys: ${chatResponse.text}`,
			msg: "um...",
		});
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

function convertItemsToMessages(items: TimelineItem[]): BaseChatMessage[] {
	const results: (BaseChatMessage | string)[] = [];

	for (const item of items) {
		if (item.type === "human") {
			results.push(new HumanChatMessage(item.content));
		} else if (item.type === "reasoning") {
			results.push(item.content);
		} else if (item.type === "ai") {
			const reasoning = results.pop();
			results.push(
				new SystemChatMessage(JSON.stringify({ reasoning, msg: item.content }))
			);
		}
	}

	return results as BaseChatMessage[];
}
