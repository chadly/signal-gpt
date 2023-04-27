import type { SetupForm } from "@/components/setup";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCallback, useEffect, useReducer } from "react";

// https://bbernhard.github.io/signal-cli-rest-api/

interface SignalProps {
	setup: SetupForm;
	onMessageReceived: (message: string) => void;
}

const useSignal = ({ setup, onMessageReceived }: SignalProps) => {
	const { lastMessage, readyState } = useWebSocket(
		"ws://localhost:8080/v1/receive"
	);

	useEffect(() => {
		if (lastMessage) {
			onMessageReceived(lastMessage.data);
		}
	}, [lastMessage, onMessageReceived]);

	const sendMessage = useCallback(
		(message: string) => {
			fetch("http://localhost:8080/v1/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
					number: setup.from,
					recipients: [setup.to],
				}),
			});
		},
		[setup.from, setup.to]
	);

	return { readyState, sendMessage };
};

export default useSignal;
