import TimelineIcon from "./icon";

export interface TimelineItem {
	id: number;
	type: TimelineItemType;
	content: string;
	datetime: string;
}

export type TimelineItemType = "human" | "reasoning" | "ai";

interface ConversationHistoryProps {
	timeline: TimelineItem[];
}

const ConversationHistory = ({ timeline }: ConversationHistoryProps) => {
	return (
		<div className="flow-root">
			<ul role="list" className="-mb-8">
				{timeline.map((event, eventIdx) => (
					<li key={event.id}>
						<div className="relative pb-8">
							{eventIdx !== timeline.length - 1 ? (
								<span
									className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							) : null}
							<div className="relative flex space-x-3">
								<div>
									<TimelineIcon type={event.type} />
								</div>
								<div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
									<div>
										<p className="text-sm text-white">{event.content}</p>
									</div>
									<div className="whitespace-nowrap text-right text-sm text-slate-200">
										<time dateTime={event.datetime}>{event.datetime}</time>
									</div>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ConversationHistory;
