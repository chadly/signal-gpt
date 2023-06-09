import type { TimelineItem } from "@/components/convo/history";
import type { SetupForm } from "@/components/setup";
import type { AiRequest, AiResponse } from "@/pages/api/llm";
import { Dispatch, useCallback, useEffect, useReducer } from "react";
import { debounce } from "lodash";

interface AiState {
	status: "idle" | "thinking" | "waiting";
	history: TimelineItem[];
}

type Action =
	| {
			type: "start";
	  }
	| {
			type: "error";
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
		case "start":
			return {
				...state,
				status: "thinking",
			};

		case "error":
			return {
				...state,
				status: "waiting",
			};

		case "ai":
			return {
				...state,
				status: "waiting",
				history: [
					...state.history,
					{
						id: state.history.length + 1,
						type: "reasoning",
						datetime: new Date(),
						content: action.reasoning,
					},
					{
						id: state.history.length + 2,
						type: "ai",
						datetime: new Date(),
						content: action.message,
					},
				],
			};
		case "human":
			return {
				...state,
				status: "thinking",
				history: [
					...state.history,
					{
						id: state.history.length + 1,
						type: "human",
						datetime: new Date(),
						content: action.message,
					},
				],
			};

		default:
			return state;
	}
};

async function callAi({ setup, history, dispatch }: AiArgs) {
	const data: AiRequest = { setup, history };

	const response = await fetch("/api/llm", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.status === 200) {
		const { msg, reasoning } = (await response.json()) as AiResponse;
		dispatch({ type: "ai", message: msg, reasoning });
	} else {
		console.error("LLM Error. Check server logs.", response.status);
	}
}

// wait 5 seconds for more human messages to come in before calling the AI
const callAiDebounced = debounce(callAi, 5000);

const useAi = (setup: SetupForm) => {
	const [{ status, history }, dispatch] = useReducer(reducer, {
		status: "idle",
		history: [],
	});

	const onHumanMessage = useCallback(
		(message: string) => dispatch({ type: "human", message }),
		[]
	);

	useEffect(() => {
		if (status === "thinking") {
			callAiDebounced({ setup, history, dispatch });
		}
	}, [status, history, setup]);

	const onStart = useCallback(() => dispatch({ type: "start" }), []);

	return {
		status,
		history,
		onHumanMessage,
		onStart,
	};
};

interface AiArgs {
	setup: SetupForm;
	history: TimelineItem[];
	dispatch: Dispatch<Action>;
}

export default useAi;
