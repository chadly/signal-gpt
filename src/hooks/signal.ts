import type { SetupForm } from "@/components/setup";
import useWebSocket from "react-use-websocket";
import { useEffect } from "react";
import { NETWORK_HOST } from "./host";

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

interface SyncMessage {
	sentMessage?: {
		destination: string;
		destinationNumber: string;
		destinationUuid: string;
		timestamp: number;
		message: string;
		expiresInSeconds: number;
		viewOnce: boolean;
	};
}

interface Envelope {
	source: string;
	sourceNumber: string;
	sourceUuid: string;
	sourceName: string;
	sourceDevice: number;
	timestamp: number;
	dataMessage?: DataMessage;
	syncMessage?: SyncMessage;
}

interface WebSocketMessage {
	envelope: Envelope;
	account: string;
	subscription: number;
}

const useSignal = ({ setup, onMessageReceived }: SignalProps) => {
	const { lastMessage, readyState } = useWebSocket(
		`ws://${NETWORK_HOST}/v1/receive/${setup.from}`
	);

	useEffect(() => {
		if (lastMessage) {
			const wsMsg = JSON.parse(lastMessage.data) as WebSocketMessage;

			console.log("debug", JSON.stringify(wsMsg, null, 2));

			if (wsMsg.envelope.sourceNumber === setup.to) {
				if (wsMsg.envelope.dataMessage) {
					onMessageReceived(wsMsg.envelope.dataMessage.message);
				} else if (
					wsMsg.envelope.syncMessage?.sentMessage &&
					setup.from === setup.to &&
					wsMsg.envelope.syncMessage.sentMessage.destinationNumber === setup.to
				) {
					// talking to yourself; useful for debugging
					onMessageReceived(wsMsg.envelope.syncMessage.sentMessage.message);
				}
			}
		}
	}, [lastMessage, onMessageReceived, setup.from, setup.to]);

	return { readyState };
};

export default useSignal;
