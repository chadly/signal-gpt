import useAi from "@/hooks/ai";
import type { SetupForm } from "../setup";
import ConversationHistory from "./history";

import { ArrowPathIcon } from "@heroicons/react/20/solid";
import useSignal from "@/hooks/signal";
import { ReadyState } from "react-use-websocket";

interface ConversationProps {
	setup: SetupForm;
}

const Conversation = ({ setup }: ConversationProps) => {
	const { history, onHumanMessage, onStart, status } = useAi(setup);
	const { readyState } = useSignal({
		setup,
		onMessageReceived: onHumanMessage,
	});

	return (
		<>
			<h2 className="text-base font-semibold leading-7 text-white">
				Texting from {setup.from} to {setup.to}
			</h2>

			{readyState === ReadyState.CONNECTING && (
				<div className="my-4 text-white">
					<ArrowPathIcon className="animate-spin" />
					Connecting to Signal Network...
				</div>
			)}

			{readyState === ReadyState.OPEN && (
				<>
					<ConversationHistory timeline={history} />
					<div className="my-4 text-white">
						{status === "idle" && (
							<button
								type="button"
								className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								onClick={onStart}
							>
								Send Initial Message
							</button>
						)}
						{status === "thinking" && (
							<span>
								<ArrowPathIcon className="animate-spin" />
								Thinking...
							</span>
						)}
						{status === "waiting" && <span>Waiting for human...</span>}
					</div>
				</>
			)}
		</>
	);
};

export default Conversation;
