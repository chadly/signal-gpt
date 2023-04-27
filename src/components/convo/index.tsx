import useAi from "@/hooks/ai";
import type { SetupForm } from "../setup";
import ConversationHistory from "./history";
import { useEffect } from "react";

import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface ConversationProps {
	setup: SetupForm;
}

const Conversation = ({ setup }: ConversationProps) => {
	const { history, onHumanMessage, onStart, status } = useAi(setup);

	return (
		<>
			<h2 className="text-base font-semibold leading-7 text-white">
				Texting with {setup.phone}
			</h2>
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
	);
};

export default Conversation;
