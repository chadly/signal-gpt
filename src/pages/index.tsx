import { Inter } from "next/font/google";
import Setup, { SetupForm } from "@/components/setup";
import Conversation from "@/components/convo";
import { useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
	const [setup, setSetup] = useState<SetupForm | undefined>();

	const onSubmit = (data: SetupForm) => {
		setSetup(data);
	};

	const onStop = () => {
		setSetup(undefined);
	};

	return (
		<>
			<Head>
				<title>Signal-GPT</title>
			</Head>
			<main
				className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
			>
				{!setup && <Setup onSubmit={onSubmit} />}
				{setup && <Conversation setup={setup} onStop={onStop} />}
			</main>
		</>
	);
};

export default Home;
