<script>
	import { Check, EllipsisVertical, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { getGames, getUserGames, getUsers } from '$lib/API';
	import { selectedGames } from '$lib/stores/selected-games.js';

	import deepRockLogo from '$lib/assets/DRG_Logo.webp';
	import lethalCompanyLogo from '$lib/assets/lethal company logo.png';
	import overcookedLogo from '$lib/assets/Overcooked_2_logo_image3.webp';
	import peakLogo from '$lib/assets/peak logo.webp';
	import seaOfThievesLogo from '$lib/assets/Sea-Of-Thieves-Logo.png';
	import cs2Logo from '$lib/assets/cs2 logo.jpg';
	import rocketLeagueLogo from '$lib/assets/Rocket_League_logo.webp';
	import btd6Logo from '$lib/assets/BTD6Logo.webp';
	import valorantLogo from '$lib/assets/valorant-logo-png_seeklogo-379976.png';
	import sevenDaysLogo from '$lib/assets/7days logo.webp';
	import civ6Logo from '$lib/assets/civ 6 logo.png';
	import fortniteLogo from '$lib/assets/fortnite logo.png';
	import subnauticaLogo from '$lib/assets/subnautica logo.jpg';
	import finalsLogo from '$lib/assets/The_Finals_logo_(current).jpg';
	import minecraftLogo from '$lib/assets/Minecraft-Logo-1.png';
	import valheimLogo from '$lib/assets/Logo_valheim.webp';
	import fallGuysLogo from '$lib/assets/fall guys logo.png';
	import palworldLogo from '$lib/assets/palworld logo.jpg';
	import helldiversLogo from '$lib/assets/helldiver 2 logo.jpg';
	import groundedLogo from '$lib/assets/grounded logo.jpg';
	import warSelectionLogo from '$lib/assets/war selection logo.png';
	import warDogsLogo from '$lib/assets/war dogs logo.jpg';
	import jumpSpaceLogo from '$lib/assets/jump space logo.webp';
	import subnautica2Logo from '$lib/assets/subnautica 2 logo.jpg';
	import overwatchLogo from '$lib/assets/Overwatch-Logo.png';
	import amongUsLogo from '$lib/assets/Among-Us-Logo.png';
	import terrariaLogo from '$lib/assets/terarria logo.webp';
	import theForestLogo from '$lib/assets/the-forest-logo.png';
	import sonsOfTheForestLogo from '$lib/assets/Sons_of_the_Forest_logo.jpg';
	import arkLogo from '$lib/assets/ARK-Logo.png';
	import raftLogo from '$lib/assets/Raft_logo.png';
	import stickFightLogo from '$lib/assets/stick fight logo.jpg';
	import mordhauLogo from '$lib/assets/mordhau logo.png';
	import rustLogo from '$lib/assets/Rust-Logo.png';
	import humanFallFlatLogo from '$lib/assets/human fall fla logo.png';
	import strandedDeepLogo from '$lib/assets/stranded deep logo.jpg';
	import ultimateChickenHorseLogo from '$lib/assets/ultimate chicken horse logo.jpg';
	import puckLogo from '$lib/assets/puck logo.jpg';
	import arcRaidersLogo from '$lib/assets/arc raiders logo.webp';
	import bodycamLogo from '$lib/assets/body cam logo.jpg';
	import lockdownLogo from '$lib/assets/lockdown logo.jpg';
	import farFarWestLogo from '$lib/assets/farfarwest.jpg';
	import outlastLogo from '$lib/assets/outlast logo.jpg';
	import dstLogo from '$lib/assets/dst logo.jpg';
	import gambleWithFriendsLogo from '$lib/assets/gamble with friends logo.jpg';
	import chivalryLogo from '$lib/assets/chivalry2.jpg';
	import huntLogo from '$lib/assets/hunt logo.webp';
	import apexLegendsLogo from '$lib/assets/apex legends logo.webp';

	const theme = getContext('theme');
	let isDark = $derived(theme.isDark);
	/** @typedef {import('$lib/API').User} User */
	/** @typedef {import('$lib/API').Game} Game */
	let selectedGame = $state(/** @type {Game | null} */ (null));
	let dialogOpen = $state(false);
	let users = $state(/** @type {User[]} */ ([]));
	let backendGames = $state(/** @type {Game[]} */ ([]));
	let userGames = $state(/** @type {Record<string, Game[]>} */ ({}));
	let dataLoading = $state(true);
	let dataError = $state('');
	let dialogLoading = $state(false);
	let dialogError = $state('');
	let sortedGames = $derived(
		[...backendGames].sort((firstGame, secondGame) =>
			firstGame.game_name.localeCompare(secondGame.game_name, undefined, { sensitivity: 'base' })
		)
	);

	const gameImages = /** @type {Record<string, string>} */ ({
		CS2: cs2Logo,
		'War Selection': warSelectionLogo,
		'Rocket League': rocketLeagueLogo,
		BTD6: btd6Logo,
		Valorant: valorantLogo,
		'Deep Rock Galactic': deepRockLogo,
		'7 Days to Die': sevenDaysLogo,
		'War Dogs': warDogsLogo,
		'Civ 6': civ6Logo,
		'Overcooked! 2': overcookedLogo,
		'Lethal Company': lethalCompanyLogo,
		Fortnite: fortniteLogo,
		Subnautica: subnauticaLogo,
		'The Finals': finalsLogo,
		Minecraft: minecraftLogo,
		Valheim: valheimLogo,
		'Fall Guys': fallGuysLogo,
		Palworld: palworldLogo,
		'Jump Space': jumpSpaceLogo,
		'Helldivers 2': helldiversLogo,
		Grounded: groundedLogo,
		'Subnautica 2': subnautica2Logo,
		Overwatch: overwatchLogo,
		'Among Us': amongUsLogo,
		PEAK: peakLogo,
		'Sea of Thieves': seaOfThievesLogo,
		Terraria: terrariaLogo,
		'The Forest': theForestLogo,
		'Sons of the Forest': sonsOfTheForestLogo,
		Ark: arkLogo,
		Raft: raftLogo,
		'Mordhau': mordhauLogo,
		Rust: rustLogo,
		'Stick Fight': stickFightLogo,
		'Human Fall Flat': humanFallFlatLogo,
		'Stranded Deep': strandedDeepLogo,
		'Ultimate Chicken Horse': ultimateChickenHorseLogo,
		Puck: puckLogo,
		'Arc Raiders': arcRaidersLogo,
		Bodycam: bodycamLogo,
		'Lockdown Protocol': lockdownLogo,
		'Far Far West': farFarWestLogo,
		'The Outlast Trials': outlastLogo,
		'Outlast Trials': outlastLogo,
		'Dont Starve Together': dstLogo,
		"Don't Starve Together": dstLogo,
		DST: dstLogo,
		'Gamble With Your Friends': gambleWithFriendsLogo,
		Gamble: gambleWithFriendsLogo,
		Chivalry: chivalryLogo,
		'Chivalry 2': chivalryLogo,
		'Hunt: Showdown': huntLogo,
		'Hunt Showdown': huntLogo,
		'Apex Legends': apexLegendsLogo
	});

	let selectedDetails = $derived(
		selectedGame ?? {
			game_name: '',
			genre: 'Game night favorite',
			platform: 'Multiple platforms',
			player_limit: 0
		}
	);
	let owners = $derived(
		users.filter((user) => (userGames[user.full_name] ?? []).some((game) => game.game_name === selectedDetails.game_name))
	);

	/** @param {Game} game */
	function isSelected(game) {
		return $selectedGames.some((selectedGame) => selectedGame.game_name === game.game_name);
	}

	/** @param {string} gameName */
	function getGameImage(gameName) {
		return gameImages[gameName] ?? `https://placehold.co/600x840/332027/f3edef?text=${encodeURIComponent(gameName)}`;
	}

	onMount(loadGames);

	async function loadGames() {
		dataLoading = true;
		dataError = '';
		try {
			backendGames = await getGames();
		} catch (error) {
			dataError = error instanceof Error ? error.message : 'Could not load the game library.';
		} finally {
			dataLoading = false;
		}
	}

	/** @param {Game} game */
	function toggleGame(game) {
		$selectedGames = isSelected(game)
			? $selectedGames.filter((selectedGame) => selectedGame.game_name !== game.game_name)
			: [...$selectedGames, game];
	}

	/** @param {Game} game */
	async function openGameInfo(game) {
		selectedGame = game;
		dialogOpen = true;
		dialogError = '';
		dialogLoading = true;
		try {
			const [loadedUsers, loadedGames] = await Promise.all([getUsers(), getGames()]);
			users = loadedUsers;
			backendGames = loadedGames;
			const loadedOwnership = await Promise.all(
				loadedUsers.map(async (user) => [user.full_name, await getUserGames(user.full_name)])
			);
			userGames = Object.fromEntries(loadedOwnership);
		} catch (error) {
			dialogError = error instanceof Error ? error.message : 'Could not load ownership.';
		} finally {
			dialogLoading = false;
		}
	}

</script>

<svelte:head>
	<title>Library | What 2 Play</title>
	<meta name="description" content="Browse the What 2 Play game library." />
</svelte:head>

<div class="library-page" class:dark-mode={isDark}>
	<header class="library-header">
		<p class="eyebrow">Your game shelf</p>
		<h1>Library</h1>
		<p class="subtitle">Choose games to add to tonight's random selection pool.</p>
	</header>

	<main class="library-grid" aria-label="Game library">
		{#if dataLoading}
			<p class="data-status">Loading games...</p>
		{:else if dataError}
			<p class="data-status data-error">{dataError}</p>
		{:else if backendGames.length === 0}
			<p class="data-status">No games have been added yet.</p>
		{:else}
		{#each sortedGames as game}
			<article class="library-card" class:selected={isSelected(game)}>
				<button
					type="button"
					class="library-select"
					class:selected={isSelected(game)}
					aria-label={`${isSelected(game) ? 'Remove' : 'Add'} ${game.game_name} ${isSelected(game) ? 'from' : 'to'} the selection pool`}
					aria-pressed={isSelected(game)}
					onclick={() => toggleGame(game)}
				>
					<img src={getGameImage(game.game_name)} alt={game.game_name} />
					{#if isSelected(game)}<span class="selected-mark"><Check size={15} strokeWidth={3} /></span>{/if}
					<span class="card-shade"></span>
					<span class="card-title">{game.game_name}</span>
				</button>
				<button
					type="button"
					class="game-info"
					aria-label={`View information for ${game.game_name}`}
					onclick={() => openGameInfo(game)}
				>
					<EllipsisVertical size={20} />
				</button>
			</article>
		{/each}
		{/if}
	</main>
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class={`game-dialog ${isDark ? 'dark-dialog' : ''}`} showCloseButton={false} portalProps={{}}>
		<button class="dialog-close" type="button" aria-label="Close game details" onclick={() => (dialogOpen = false)}>
			<X size={18} />
		</button>
		{#if selectedGame}
			<div class="dialog-game-heading">
				<img src={getGameImage(selectedGame.game_name)} alt={selectedGame.game_name} />
				<div>
					<p class="eyebrow">Game details</p>
					<Dialog.Title class="dialog-title">{selectedGame.game_name}</Dialog.Title>
				</div>
			</div>
			<div class="game-stats">
				<div><span>Genre</span><strong>{selectedDetails.genre}</strong></div>
				<div><span>Players</span><strong>{selectedDetails.player_limit ? `Up to ${selectedDetails.player_limit}` : 'Not set'}</strong></div>
				<div><span>Platform</span><strong>{selectedDetails.platform}</strong></div>
			</div>
			<section class="owners-section">
				<h3>Owners</h3>
				{#if dialogLoading}<p class="dialog-muted">Loading ownership...</p>{:else if owners.length === 0}<p class="dialog-muted">Nobody owns this yet.</p>{:else}<div class="owner-list">
					{#each owners as owner}<span class="owner-pill">{owner.full_name}</span>{/each}
				</div>{/if}
				{#if dialogError}<p class="dialog-error">{dialogError}</p>{/if}
			</section>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<style>
	.library-page {
		--library-bg: #f6e9d6;
		--library-glow: rgba(224, 163, 110, 0.28);
		--library-text: #302721;
		--library-muted: #81756d;
		--library-card: #fffdf7;
		--library-border: #d6c7a9;
		min-height: 100%;
		overflow: auto;
		padding: clamp(22px, 4vh, 44px) max(20px, 4vw) 48px;
		box-sizing: border-box;
		color: var(--library-text);
		background: radial-gradient(circle at 50% 12%, var(--library-glow), transparent 35rem), var(--library-bg);
	}

	.library-page.dark-mode {
		--library-bg: #1b1517;
		--library-glow: rgba(168, 68, 92, 0.18);
		--library-text: #f3edef;
		--library-muted: #aa9ba0;
		--library-card: #332027;
		--library-border: #766067;
	}

	.library-header {
		width: min(1120px, 100%);
		margin: 0 auto clamp(22px, 4vh, 38px);
		text-align: center;
	}

	.eyebrow {
		margin: 0 0 8px;
		color: #c56f73;
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.library-header h1 {
		margin: 0;
		font-size: clamp(30px, 4vw, 48px);
		line-height: 1;
		letter-spacing: -0.065em;
	}

	.subtitle {
		margin: 10px 0 0;
		color: var(--library-muted);
		font-size: 14px;
	}

	.library-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(12px, 2vw, 22px);
		width: min(1120px, 100%);
		margin: 0 auto;
	}

	.data-status {
		grid-column: 1 / -1;
		margin: 20px 0;
		color: var(--library-muted);
		font-size: 14px;
		text-align: center;
	}

	.data-error {
		color: #b54b55;
	}

	.library-card {
		position: relative;
		aspect-ratio: 0.72;
		min-width: 0;
		overflow: hidden;
		padding: 0;
		border: 1px solid var(--library-border);
		border-radius: 8px;
		color: #fff;
		background: var(--library-card);
		box-shadow: 0 8px 18px rgba(48, 39, 33, 0.12);
		cursor: pointer;
		isolation: isolate;
		transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
	}

	.library-card.selected {
		border: 3px solid #d28696;
		box-shadow: 0 12px 24px rgba(181, 93, 120, 0.24);
	}

	.library-select {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		color: inherit;
		background: transparent;
		cursor: pointer;
	}

	.library-select:focus-visible {
		outline: 2px solid #d28696;
		outline-offset: -5px;
	}

	.game-info {
		position: absolute;
		top: 9px;
		right: 9px;
		z-index: 4;
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		color: #fff;
		background: rgba(20, 12, 16, 0.45);
		cursor: pointer;
		transition: background 160ms ease, border-color 160ms ease;
	}

	.game-info:hover,
	.game-info:focus-visible {
		border-color: #fff;
		background: rgba(20, 12, 16, 0.72);
		outline: none;
	}

	.selected-mark {
		position: absolute;
		top: 9px;
		left: 9px;
		z-index: 3;
		display: grid;
		place-items: center;
		width: 27px;
		height: 27px;
		border-radius: 50%;
		color: #fff;
		background: #d28696;
		box-shadow: 0 2px 8px rgba(20, 12, 16, 0.28);
	}

	.library-card:hover,
	.library-card:focus-visible {
		transform: translateY(-4px);
		border-color: #d28696;
		box-shadow: 0 14px 24px rgba(48, 39, 33, 0.2);
		outline: none;
	}

	.library-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-shade {
		position: absolute;
		inset: 35% 0 0;
		z-index: 1;
		background: linear-gradient(transparent, rgba(20, 12, 16, 0.86));
	}

	.card-title {
		position: absolute;
		z-index: 2;
		left: 13px;
		right: 13px;
		bottom: 13px;
		font-size: clamp(12px, 1.25vw, 16px);
		font-weight: 800;
		text-align: left;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
	}

	.game-dialog {
		--library-text: #302721;
		--library-muted: #81756d;
		--library-card: #fffdf7;
		--library-border: #d6c7a9;
		position: relative;
		border-color: var(--library-border);
		color: var(--library-text);
		background: var(--library-card);
	}

	.game-dialog.dark-dialog {
		--library-text: #f3edef;
		--library-muted: #aa9ba0;
		--library-card: #332027;
		--library-border: #766067;
	}

	.dialog-close {
		position: absolute;
		top: 18px;
		right: 18px;
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border: 1px solid var(--library-border);
		border-radius: 50%;
		color: var(--library-muted);
		background: transparent;
	}

	.dialog-game-heading {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-right: 34px;
	}

	.dialog-game-heading img {
		width: 58px;
		height: 58px;
		border-radius: 8px;
		object-fit: cover;
	}

	.dialog-game-heading :global([data-slot='dialog-title']) {
		font-size: 24px;
	}

	.game-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		margin-top: 24px;
	}

	.game-stats div {
		display: grid;
		gap: 4px;
		padding: 10px;
		border: 1px solid var(--library-border);
		border-radius: 6px;
	}

	.game-stats span,
	.dialog-muted {
		color: var(--library-muted);
		font-size: 12px;
	}

	.game-stats strong {
		font-size: 13px;
	}

	.owners-section {
		position: relative;
		margin-top: 22px;
	}

	.owners-section h3 {
		margin: 0 0 10px;
		font-size: 15px;
	}

	.owner-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		min-height: 28px;
		margin-bottom: 12px;
	}

	.owner-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 9px;
		border-radius: 999px;
		border: 1px solid transparent;
		color: var(--library-text);
		background: var(--library-border);
		font-size: 12px;
		font-weight: 700;
		cursor: pointer;
		transition: border-color 160ms ease, background 160ms ease;
	}

	.owner-pill:hover,
	.owner-pill:focus-visible {
		border-color: #d28696;
		background: rgba(210, 134, 150, 0.22);
		outline: none;
	}

	.owner-remove-icon {
		opacity: 0;
		color: #b54b55;
		transition: opacity 160ms ease;
	}

	.owner-pill:hover .owner-remove-icon,
	.owner-pill:focus-visible .owner-remove-icon {
		opacity: 1;
	}

	.add-owners-heading {
		margin-top: 22px;
	}

	.available-owner-list {
		margin-bottom: 0;
	}

	.available-owner-pill {
		color: var(--library-text);
		background: transparent;
		border-color: var(--library-border);
	}

	.owner-add-label {
		color: var(--library-muted);
		font-size: 12px;
	}

	.dialog-error {
		margin: 10px 0 0;
		color: #b54b55;
		font-size: 12px;
	}

	@media (max-width: 700px) {
		.library-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>