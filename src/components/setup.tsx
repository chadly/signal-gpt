import Alert from "./alert";
import { useForm } from "react-hook-form";

export interface SetupForm {
	from: string;
	to: string;
	role: string;
	style: string;
}

interface SetupProps {
	onSubmit: (data: SetupForm) => void;
}

const Setup = ({ onSubmit }: SetupProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<SetupForm>();

	const fromPhone = watch("from");
	const toPhone = watch("to");

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<div className="space-y-12">
				<div className="border-b border-white/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-white">
						Setup
					</h2>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="fromPhone"
								className="block text-sm font-medium leading-6 text-white"
							>
								Your Phone Number
							</label>
							<div className="mt-2 rounded-md shadow-sm">
								<input
									type="text"
									id="fromPhone"
									{...register("from", { required: true })}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									placeholder="+15559876543"
									aria-invalid={errors.from ? "true" : "false"}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500" id="email-description">
								This is your phone number in{" "}
								<strong>international format</strong>.
							</p>
							{errors.from && (
								<p className="mt-2 text-sm text-red-600">
									Please enter a valid phone number.
								</p>
							)}
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="toPhone"
								className="block text-sm font-medium leading-6 text-white"
							>
								Recipient Phone Number
							</label>
							<div className="mt-2 rounded-md shadow-sm">
								<input
									type="text"
									id="toPhone"
									{...register("to", { required: true })}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									placeholder="+15559876543"
									aria-invalid={errors.from ? "true" : "false"}
								/>
							</div>
							<p className="mt-2 text-sm text-gray-500" id="email-description">
								This is the recipient&apos;s phone number in{" "}
								<strong>international format</strong>.
							</p>
							{errors.to && (
								<p className="mt-2 text-sm text-red-600">
									Please enter a valid phone number.
								</p>
							)}
						</div>

						<div className="col-span-full">
							<label
								htmlFor="role"
								className="block text-sm font-medium leading-6 text-white"
							>
								Role
							</label>
							<div className="mt-2">
								<textarea
									id="role"
									{...register("role", { required: true })}
									rows={4}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									defaultValue={`You are Chad, son to Vicki.\nYou will be chatting with Vicki with a goal of getting her to lend you $500.\nYou will not mention that you are an AI or a language model.\nYou are pretending to be human.`}
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="style"
								className="block text-sm font-medium leading-6 text-white"
							>
								Conversation Style
							</label>
							<div className="mt-2">
								<textarea
									id="style"
									{...register("style", { required: true })}
									rows={3}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									defaultValue={`You respond to messages by not capitalizing your sentences and using slang.\nYou capitalize proper names and the word "I".\nYou use punctuation where appropriate.`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isValid && (
				<div className="mt-6 flex items-center">
					<Alert>
						You are about to enable GPT-4 to send a message from{" "}
						<strong>{fromPhone}</strong> to <strong>{toPhone}</strong> and
						respond to any subsequent messages as long as the app is running.
					</Alert>
				</div>
			)}

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Next Step
				</button>
			</div>
		</form>
	);
};

export default Setup;
