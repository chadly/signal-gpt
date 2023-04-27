import type { SetupForm } from "@/components/setup";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";

// https://bbernhard.github.io/signal-cli-rest-api/

interface SignalProps {
	setup: SetupForm;
	onMessageReceived: (message: string) => void;
}

const useSignal = ({ setup, onMessageReceived }: SignalProps) => {
	const { lastMessage, readyState } = useWebSocket(
		`ws://localhost:8080/v1/receive/${setup.from}`
	);

	useEffect(() => {
		if (lastMessage) {
			onMessageReceived(lastMessage.data);
		}
	}, [lastMessage, onMessageReceived]);

	return { readyState };
};

export default useSignal;
