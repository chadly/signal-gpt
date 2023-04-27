import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

const Alert = ({ children }: { children: ReactNode }) => (
	<div className="rounded-md bg-yellow-50 p-4 w-full">
		<div className="flex">
			<div className="flex-shrink-0">
				<ExclamationTriangleIcon
					className="h-5 w-5 text-yellow-400"
					aria-hidden="true"
				/>
			</div>
			<div className="ml-3">
				<h3 className="text-sm font-medium text-yellow-800">Warning</h3>
				<div className="mt-2 text-sm text-yellow-700">
					<p>{children}</p>
				</div>
			</div>
		</div>
	</div>
);

export default Alert;
