import type { TimelineItem } from "@/components/convo/history";
import type { SetupForm } from "@/components/setup";
import type { AiRequest, AiResponse } from "@/pages/api/llm";
import { useCallback, useEffect, useReducer } from "react";

interface AiState {
	status: "idle" | "thinking" | "waiting";
	history: TimelineItem[];
}

type Action =
	| {
			type: "think";
	  }
	| {
			type: "ai";
			message: string;
			reasoning: string;
	  }
	| {
			type: "human";
			message: string;
	  };

const reducer = (state: AiState, action: Action): AiState => {
	switch (action.type) {
		case "think":
			return { ...state, status: "thinking" };
		case "ai":
			return {
				...state,
				status: "waiting",
				history: [
					...state.history,
					{
						id: state.history.length + 1,
						type: "reasoning",
						datetime: new Date().toISOString(),
						content: action.reasoning,
					},
					{
						id: state.history.length + 2,
						type: "ai",
						datetime: new Date().toISOString(),
						content: action.message,
					},
				],
			};
		case "human":
			return {
				...state,
				status: "idle",
				history: [
					...state.history,
					{
						id: state.history.length + 1,
						type: "human",
						datetime: new Date().toISOString(),
						content: action.message,
					},
				],
			};

		default:
			return state;
	}
};

const useAi = (setup: SetupForm) => {
	const [{ status, history }, dispatch] = useReducer(reducer, {
		status: "idle",
		history: [],
	});

	const onMessageReceived = useCallback(
		(message: string) => dispatch({ type: "human", message }),
		[]
	);

	useEffect(() => {
		async function callAi() {
			const data: AiRequest = { setup, history };

			dispatch({ type: "think" });

			const response = await fetch("/api/llm", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const { msg, reasoning } = (await response.json()) as AiResponse;

			dispatch({ type: "ai", message: msg, reasoning });
		}

		if (
			status === "idle" &&
			(history.length === 0 || history[history.length - 1].type === "human")
		) {
			callAi();
		}
	}, [status, history, setup]);

	return {
		status,
		history,
		onMessageReceived,
	};
};

export default useAi;
