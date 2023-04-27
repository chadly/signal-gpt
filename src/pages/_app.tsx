import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href="https://signal.org/assets/favicon/apple-icon-57x57-1e56b07703490ebba4713a0b5ea25a03ae8d86eabc4a961158edf5b46590fd3d.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="60x60"
				href="https://signal.org/assets/favicon/apple-icon-60x60-e2db2d0761f2007f5d2b1f9594a5caa49705c1221ced2472a2e471e0c53ed3fa.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href="https://signal.org/assets/favicon/apple-icon-72x72-97b53da0f83cc83e78f550a175abc7655b655a4ff6f8969616ccf6a45431f823.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="https://signal.org/assets/favicon/apple-icon-76x76-9f2b2add20d8060fab5bda1a4fc4dbc23330e56b6ce846dc71af34b643b44294.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="https://signal.org/assets/favicon/apple-icon-114x114-f6319e407b9c5379fbb0753dbf272e8d3b24a0c2e107d3c971fa173f861580bc.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="https://signal.org/assets/favicon/apple-icon-120x120-c98504fda21e8555d8c527f46d170b182630953915e3f35e6be58ad7c2ba2016.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="https://signal.org/assets/favicon/apple-icon-144x144-6673d278a3a610c29c506b94db1c39dbaed7316a3daa8dfa84b115d9a17a3be1.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="https://signal.org/assets/favicon/apple-icon-152x152-8d0419698314ff17820aa277bc5c56df4048fff96b89d021c5e3240c804c008d.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="https://signal.org/assets/favicon/apple-icon-180x180-aa2761b8418076157d993fa209969b64f3ef435dcbefb20e7f9b4ad03e6e76bd.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href="https://signal.org/assets/favicon/android-icon-192x192-2ce7be93a7e75de13098e18298fcb8910772ec2e035cea23f3c2ad438ff8e504.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="https://signal.org/assets/favicon/favicon-32x32-382989a29cc9004cc5b4b723098a5663f944b48d4694df252b89caa831fa205f.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="96x96"
				href="https://signal.org/assets/favicon/favicon-96x96-aa38de7ff5098e6c9a3a41bd2424266d64b0200d347d682292c01a1d6d402660.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="https://signal.org/assets/favicon/favicon-16x16-c6d9330e8b333a3ff4dd7d9ccbfccbb22265db57ba79fd8d3f9a31a90e7d4857.png"
			/>
		</Head>
		<Component {...pageProps} />;
	</>
);

export default App;
