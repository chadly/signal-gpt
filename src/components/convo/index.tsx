import useAi from "@/hooks/ai";
import type { SetupForm } from "../setup";
import ConversationHistory from "./history";
import { useEffect } from "react";

import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface ConversationProps {
	setup: SetupForm;
}

const Conversation = ({ setup }: ConversationProps) => {
	const { history, onMessageReceived, status } = useAi(setup);

	useEffect(() => {
		const t = setTimeout(() => {
			onMessageReceived("hello my sweet baby boy");
		}, 10000);

		return () => clearTimeout(t);
	}, [onMessageReceived]);

	return (
		<>
			<h2 className="text-base font-semibold leading-7 text-white">
				Texting with {setup.phone}
			</h2>
			<ConversationHistory timeline={history} />
			<div className="my-4 text-white">
				{status === "thinking" && (
					<span>
						<ArrowPathIcon className="animate-spin" />
						Thinking...
					</span>
				)}
				{status === "waiting" && <span>Waiting for human... </span>}
			</div>
		</>
	);
};

export default Conversation;
