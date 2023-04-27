import type { ReactNode } from "react";
import {
	UserIcon,
	CpuChipIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	ChatBubbleOvalLeftIcon,
} from "@heroicons/react/20/solid";

import { TimelineItemType } from "./history";

interface TimelineIconWrapperProps {
	children: ReactNode;
	iconBackground: string;
}

const TimelineIconWrapper = ({
	iconBackground,
	children,
}: TimelineIconWrapperProps) => (
	<span
		className={`${iconBackground} h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}
	>
		{children}
	</span>
);

interface TimelineIconProps {
	type: TimelineItemType;
}

const TimelineIcon = ({ type }: TimelineIconProps) => {
	switch (type) {
		case "human":
			return (
				<TimelineIconWrapper iconBackground="bg-green-500">
					<UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
				</TimelineIconWrapper>
			);

		case "reasoning":
			return (
				<TimelineIconWrapper iconBackground="bg-sky-400">
					<CpuChipIcon className="h-5 w-5 text-white" aria-hidden="true" />
				</TimelineIconWrapper>
			);

		case "ai":
			return (
				<TimelineIconWrapper iconBackground="bg-blue-500">
					<ChatBubbleOvalLeftIcon
						className="h-5 w-5 text-white"
						aria-hidden="true"
					/>
				</TimelineIconWrapper>
			);

		default:
			return (
				<TimelineIconWrapper iconBackground="bg-indigo-600">
					<ChatBubbleOvalLeftEllipsisIcon
						className="h-5 w-5 text-white"
						aria-hidden="true"
					/>
				</TimelineIconWrapper>
			);
	}
};

export default TimelineIcon;
