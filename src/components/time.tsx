import { format, formatISO, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface TimeProps {
	value: Date;
}

const formatRelativeTime = (value: Date): string =>
	formatDistanceToNow(value, { addSuffix: true });

const Time = ({ value }: TimeProps) => {
	const [relativeTime, setRelativeTime] = useState(formatRelativeTime(value));

	useEffect(() => {
		const t = setInterval(() => {
			setRelativeTime(formatRelativeTime(value));
		}, 30000);

		return () => {
			clearInterval(t);
		};
	}, [value]);

	return (
		<time
			dateTime={formatISO(value)}
			title={format(value, "MMM d h:mm:ss aaa")}
		>
			{relativeTime}
		</time>
	);
};

export default Time;
