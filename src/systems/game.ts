import { Button } from "./../components/button";
import { LinkSetting } from "../components/link-setting";
import { closeModal, openModal } from "../components/modal";
import { Screens } from "../components/screens";
import { ToggleSetting } from "../components/toggle-setting";
import { el, mount } from "redom";
import { SVGs } from "../helpers/svgs";
import { createGameScreen } from "../screens/game";
import { createLevelsScreen } from "../screens/levels";
import { getSVGElement } from "../helpers/utilities";
import { state } from "./state";
import { playLevel } from "./play";

export const colorSchemes = [
	{ name: 'Ocean', bg: '#03182b', color: '#8be9ff', shadow: '#4f838f', icon: 'ocean-mage' as keyof typeof SVGs },
	{ name: 'Sunset', bg: '#2b1803', color: '#ffb366', shadow: '#8f6b4f', icon: 'sunset-ranger' as keyof typeof SVGs },
	{ name: 'Forest', bg: '#0b1f1b', color: '#4fff88', shadow: '#2d8f52', icon: 'forest-druid' as keyof typeof SVGs },
	{ name: 'Magenta', bg: '#2b0333', color: '#ff33ff', shadow: '#8f4f7f', icon: 'magenta-witch' as keyof typeof SVGs },
	{ name: 'Gold', bg: '#2b2303', color: '#ffdd44', shadow: '#8f7f4f', icon: 'gold-knight' as keyof typeof SVGs },
	{ name: 'Purple', bg: '#1a0b2e', color: '#bb86fc', shadow: '#6b4f8f', icon: 'purple-sorcerer' as keyof typeof SVGs },
	{ name: 'Coral', bg: '#2b1a18', color: '#ff7f6b', shadow: '#8f5f52', icon: 'coral-pirate' as keyof typeof SVGs },
	{ name: 'Cyan', bg: '#0b2929', color: '#33ffff', shadow: '#4f8f8f', icon: 'cyan-wizard' as keyof typeof SVGs },
	{ name: 'Rose', bg: '#2b1a25', color: '#ff6bb6', shadow: '#8f5f7f', icon: 'rose-paladin' as keyof typeof SVGs },
];

export let levelIndicator: HTMLElement;
export let headerContainer: HTMLElement;
export let gameContainer: HTMLElement;

export let screens: Screens;

function applyColorScheme(schemeIndex: number) {
	const scheme = colorSchemes[schemeIndex];
	state.colorScheme = schemeIndex;

	document.documentElement.style.setProperty("--bg", scheme.bg);
	document.documentElement.style.setProperty("--color", scheme.color);
	document.documentElement.style.setProperty("--shadow", scheme.shadow);

	playLevel(state.level);
	screens.openScreen("game");
	closeModal();
}

export function openColorSchemeScreen() {
	const schemeContainer = el("div.color-schemes");

	colorSchemes.forEach((scheme, index) => {
		const iconSvg = getSVGElement(SVGs[scheme.icon]);
		iconSvg.style.fill = scheme.color;

		const button = el(
			"div.scheme-button",
			{
				style: `background: ${scheme.bg}; border-color: ${scheme.color};`,
			},
			[iconSvg, el("span", scheme.name)]
		) as HTMLElement;

		if (index === state.colorScheme) {
			button.classList.add("active");
		}

		button.onclick = () => {
			applyColorScheme(index);
		};

		mount(schemeContainer, button);
	});

	const buttons: Button[] = [
		{
			type: "normal",
			content: "Close",
			onClickCallback: () => {},
		},
	];

	openModal(
		gameContainer,
		"Color Schemes",
		[
			el("p", "Pick a color scheme!"),
			schemeContainer,
		],
		buttons,
		() => {},
		"color-scheme-modal",
	);
}

export let soundToggle: ToggleSetting;

let deferredPrompt: any = null;

window.addEventListener("beforeinstallprompt", (e) => {
	deferredPrompt = e;

	new LinkSetting(headerContainer, SVGs.install, "#ffffff", 112, 360, async () => {
		if (deferredPrompt !== null) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === "accepted") {
				deferredPrompt = null;
			}
		}
	});
});

export function initGame() {
	headerContainer = el("div.header");
	gameContainer = el("div.game");

	screens = new Screens(gameContainer, {
		levels: createLevelsScreen(),
		game: createGameScreen(),
	});

	new LinkSetting(
		headerContainer,
		SVGs.discord,
		"#5865F2",
		4,
		360,
		"https://discord.com/invite/NygP3y7wsE",
	);
	new LinkSetting(
		headerContainer,
		SVGs.coffee,
		"#FBAA19",
		40,
		360,
		"https://ko-fi.com/martintale?ref=deadly-affection",
	);

	new LinkSetting(headerContainer, SVGs.palette, "#ff3ed9", 76, 360, openColorSchemeScreen);

	soundToggle = new ToggleSetting(headerContainer, SVGs.sound, "sound", 4, 4);

	new ToggleSetting(headerContainer, SVGs.levels, "screen", 40, 4);

	levelIndicator = el("b", "");
	mount(headerContainer, levelIndicator);

	mount(document.body, headerContainer);
	mount(document.body, gameContainer);

	globalThis.onresize = resizeGame;
	resizeGame();

	// Apply saved color scheme on startup
	const scheme = colorSchemes[state.colorScheme];
	document.documentElement.style.setProperty("--bg", scheme.bg);
	document.documentElement.style.setProperty("--color", scheme.color);
	document.documentElement.style.setProperty("--shadow", scheme.shadow);
}

export function getScale() {
	return Math.min(globalThis.innerWidth / 400, globalThis.innerHeight / 800);
}

function resizeGame() {
	gameContainer.style.transform = `scale(${getScale()})`;
	headerContainer.style.transform = `scale(${getScale()})`;
}
