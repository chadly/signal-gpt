import type { TimelineItem } from "@/components/convo/history";
import type { SetupForm } from "@/components/setup";
import type { AiRequest, AiResponse } from "@/pages/api/llm";
import { useCallback, useEffect, useState } from "react";

const useAi = (setup: SetupForm) => {
	const [isThinking, setIsThinking] = useState(false);
	const [history, setHistory] = useState<TimelineItem[]>([]);

	const onMessageReceived = useCallback((message: string) => {
		setHistory((messages) => [
			...messages,
			{
				id: messages.length + 1,
				type: "human",
				datetime: new Date().toISOString(),
				content: message,
			},
		]);
	}, []);

	useEffect(() => {
		async function callAi() {
			const data: AiRequest = { setup, history };

			setIsThinking(true);

			try {
				const response = await fetch("/api/llm", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				const { msg, reasoning } = (await response.json()) as AiResponse;

				setHistory((messages) => [
					...messages,
					{
						id: messages.length + 1,
						type: "reasoning",
						datetime: new Date().toISOString(),
						content: reasoning,
					},
					{
						id: messages.length + 2,
						type: "ai",
						datetime: new Date().toISOString(),
						content: msg,
					},
				]);
			} finally {
				setIsThinking(false);
			}
		}

		if (
			!isThinking &&
			(history.length === 0 || history[history.length - 1].type === "human")
		) {
			callAi();
		}
	}, [isThinking, history, setup]);

	return {
		isThinking,
		history,
		onMessageReceived,
	};
};

export default useAi;
