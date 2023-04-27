import Alert from "./alert";
import { useForm } from "react-hook-form";

export interface SetupForm {
	phone: string;
	role: string;
	style: string;
	starter: string;
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

	const phoneNumber = watch("phone");

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
								htmlFor="phone"
								className="block text-sm font-medium leading-6 text-white"
							>
								Phone Number
							</label>
							<div className="mt-2 rounded-md shadow-sm">
								<input
									type="text"
									id="phone"
									{...register("phone", { required: true })}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									placeholder="+1 (555) 987-6543"
									aria-invalid={errors.phone ? "true" : "false"}
								/>
							</div>
							{errors.phone && (
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

						<div className="col-span-full">
							<label
								htmlFor="starter"
								className="block text-sm font-medium leading-6 text-white"
							>
								Conversation Starter
							</label>
							<div className="mt-2">
								<textarea
									id="starter"
									{...register("starter", { required: true })}
									rows={3}
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									defaultValue={`hello, mother`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isValid && (
				<div className="mt-6 flex items-center">
					<Alert>
						You are about to enable GPT-4 to send a message to{" "}
						<strong>{phoneNumber}</strong> and respond to any subsequent
						messages as long as the app is running.
					</Alert>
				</div>
			)}

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="submit"
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Unleash the Beast
				</button>
			</div>
		</form>
	);
};

export default Setup;
