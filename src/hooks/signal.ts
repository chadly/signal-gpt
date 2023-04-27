import type { SetupForm } from "@/components/setup";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";

// https://bbernhard.github.io/signal-cli-rest-api/

interface SignalProps {
	setup: SetupForm;
	onMessageReceived: (message: string) => void;
}

interface DataMessage {
	expiresInSeconds: number;
	message: string;
	timestamp: number;
	viewOnce: boolean;
}

interface Envelope {
	source: string;
	sourceNumber: string;
	sourceUuid: string;
	sourceName: string;
	sourceDevice: number;
	timestamp: number;
	dataMessage?: DataMessage;
}

interface WebSocketMessage {
	envelope: Envelope;
	account: string;
	subscription: number;
}

const useSignal = ({ setup, onMessageReceived }: SignalProps) => {
	const { lastMessage, readyState } = useWebSocket(
		`ws://localhost:8080/v1/receive/${setup.from}`
	);

	useEffect(() => {
		if (lastMessage) {
			const wsMsg = JSON.parse(lastMessage.data) as WebSocketMessage;

			console.log("debug", JSON.stringify(wsMsg, null, 2));

			if (
				wsMsg.envelope.sourceNumber === setup.to &&
				wsMsg.envelope.dataMessage
			) {
				onMessageReceived(wsMsg.envelope.dataMessage.message);
			}
		}
	}, [lastMessage, onMessageReceived, setup.to]);

	return { readyState };
};

export default useSignal;
