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
	modelName: "gpt-4",
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
			`${setup.role}\n${setup.style}\n${messageFormat}\nYou should start the conversation off with "${setup.starter}"`
		),
		...convertItemsToMessages(history),
	];

	console.log(messages);

	const chatResponse = await chat.call(messages);

	console.log(chatResponse);

	const data = JSON.parse(chatResponse.text) as AiResponse;

	res.status(200).json(data);
}
