import { renderLevels } from '../screens/levels';
import { state } from './state';

declare global {
	interface Window {
		nearApi: any; // 👈️ turn off type checking
	}
}

const MAX_GAS = "300000000000000";

export let nearConnection: any;
export let walletConnection: any;

export async function initNEAR() {
	const userKeyStore = new window.nearApi.keyStores.BrowserLocalStorageKeyStore(localStorage, 'deadly-affection_')

	const connectionConfig = {
		networkId: "testnet",
		keyStore: userKeyStore,
		nodeUrl: "https://rpc.testnet.near.org",
		walletUrl: "https://wallet.testnet.near.org",
		helperUrl: "https://helper.testnet.near.org",
		headers: {},
		// explorerUrl: "https://explorer.testnet.near.org",
	};

	nearConnection = await window.nearApi.connect(connectionConfig);

	walletConnection = new window.nearApi.WalletConnection(nearConnection, 'deadly-affection_');

	if (isLoggedInWithNEAR()) {
		const items = await getBoughtItems();

		const levelsBought = items.find((item: any) => item.item === 'levels');

		if (levelsBought && !state.near) {
			state.near = true;
			renderLevels();
		}
	}
}

export function isLoggedInWithNEAR() {
	return walletConnection?.isSignedIn() === true;
}

export function loginWithNEAR() {
	if (isLoggedInWithNEAR() === false) {
		walletConnection.requestSignIn({
			contractId: "dev-1659898084435-74777876829079",
			methodNames: [],
			// successUrl: "REPLACE_ME://.com/success", // optional redirect URL on success
			// failureUrl: "REPLACE_ME://.com/failure" // optional redirect URL on failure
		});
	}
}

export function logoutWithNEAR() {
	if (isLoggedInWithNEAR()) {
		walletConnection.signOut();
		location.reload();
	}
}

export async function getBoughtItems() {
	if (isLoggedInWithNEAR()) {
		return await walletConnection.account().viewFunction('dev-1659898084435-74777876829079', 'viewTransactions', { accountId: walletConnection.account().accountId });
	}

	return [];
}

export async function buyItem(item: string, price: number) {
	if (isLoggedInWithNEAR()) {
		await walletConnection.account().functionCall('dev-1659898084435-74777876829079', 'buy', { item, price }, MAX_GAS, window.nearApi.utils.format.parseNearAmount("1"));
	}
}
