<script>
	import { X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { addOwnedGame, getGames, getUserGames, getUsers, removeOwnedGame } from '$lib/API';

	const theme = getContext('theme');
	let isDark = $derived(theme.isDark);
	/** @typedef {import('$lib/API').User} User */
	/** @typedef {import('$lib/API').Game} Game */
	let users = $state(/** @type {User[]} */ ([]));
	let games = $state(/** @type {Game[]} */ ([]));
	let selectedUser = $state(/** @type {User | null} */ (null));
	let selectedUserGames = $state(/** @type {Game[]} */ ([]));
	let dialogOpen = $state(false);
	let dataLoading = $state(true);
	let dataError = $state('');
	let dialogLoading = $state(false);
	let addingGame = $state('');
	let removingGame = $state('');
	let dialogError = $state('');

	let sortedUsers = $derived(
		[...users].sort((firstUser, secondUser) =>
			firstUser.full_name.localeCompare(secondUser.full_name, undefined, { sensitivity: 'base' })
		)
	);
	let sortedGames = $derived(
		[...games].sort((firstGame, secondGame) =>
			firstGame.game_name.localeCompare(secondGame.game_name, undefined, { sensitivity: 'base' })
		)
	);
	let availableGames = $derived(
		sortedGames.filter(
			(game) => !selectedUserGames.some((ownedGame) => ownedGame.game_name === game.game_name)
		)
	);

	onMount(loadFriends);

	async function loadFriends() {
		dataLoading = true;
		dataError = '';
		try {
			users = await getUsers();
		} catch (error) {
			dataError = error instanceof Error ? error.message : 'Could not load friends.';
		} finally {
			dataLoading = false;
		}
	}

	/** @param {User} user */
	async function openUser(user) {
		selectedUser = user;
		dialogOpen = true;
		dialogLoading = true;
		dialogError = '';
		try {
			const [ownedGames, loadedGames] = await Promise.all([getUserGames(user.full_name), getGames()]);
			selectedUserGames = ownedGames;
			games = loadedGames;
		} catch (error) {
			dialogError = error instanceof Error ? error.message : 'Could not load this friend\'s games.';
		} finally {
			dialogLoading = false;
		}
	}

	/** @param {Game} game */
	async function addGame(game) {
		if (!selectedUser) return;
		addingGame = game.game_name;
		dialogError = '';
		try {
			await addOwnedGame(selectedUser.full_name, game.game_name);
			selectedUserGames = [...selectedUserGames, game];
		} catch (error) {
			dialogError = error instanceof Error ? error.message : 'Could not add this game.';
		} finally {
			addingGame = '';
		}
	}

	/** @param {Game} game */
	async function removeGame(game) {
		if (!selectedUser) return;
		removingGame = game.game_name;
		dialogError = '';
		try {
			await removeOwnedGame(selectedUser.full_name, game.game_name);
			selectedUserGames = selectedUserGames.filter((ownedGame) => ownedGame.game_name !== game.game_name);
		} catch (error) {
			dialogError = error instanceof Error ? error.message : 'Could not remove this game.';
		} finally {
			removingGame = '';
		}
	}
</script>

<svelte:head>
	<title>Friends | What 2 Play</title>
	<meta name="description" content="See what games your friends own." />
</svelte:head>

<div class="friends-page" class:dark-mode={isDark}>
	<header class="friends-header">
		<p class="eyebrow">Your game-night crew</p>
		<h1>Friends</h1>
		<p class="subtitle">Choose a friend to see and update their game shelf.</p>
	</header>

	<main class="friends-grid" aria-label="Friends">
		{#if dataLoading}
			<p class="data-status">Loading friends...</p>
		{:else if dataError}
			<p class="data-status data-error">{dataError}</p>
		{:else if users.length === 0}
			<p class="data-status">No friends have been added yet.</p>
		{:else}
			{#each sortedUsers as user}
				<button
					type="button"
					class="friend-card"
					aria-label={`View games owned by ${user.full_name}`}
					onclick={() => openUser(user)}
				>
					<span class="friend-initials">{user.initials}</span>
					<span class="card-shade"></span>
					<span class="friend-name">{user.full_name}</span>
					<span class="friend-count">{user.game_count} {user.game_count === 1 ? 'game' : 'games'}</span>
				</button>
			{/each}
		{/if}
	</main>
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class={`friend-dialog ${isDark ? 'dark-dialog' : ''}`} showCloseButton={false} portalProps={{}}>
		<button class="dialog-close" type="button" aria-label="Close friend details" onclick={() => (dialogOpen = false)}>
			<X size={18} />
		</button>
		{#if selectedUser}
			<div class="dialog-heading">
				<span class="dialog-initials">{selectedUser.initials}</span>
				<div>
					<p class="eyebrow">Friend details</p>
					<Dialog.Title class="dialog-title">{selectedUser.full_name}</Dialog.Title>
				</div>
			</div>

			<section class="games-section">
				<h3>Owned Games</h3>
				{#if dialogLoading}
					<p class="dialog-muted">Loading games...</p>
				{:else if selectedUserGames.length === 0}
					<p class="dialog-muted">No games added yet.</p>
				{:else}
					<div class="game-list">
						{#each selectedUserGames as game}
							<button
								class="game-pill owned-game-pill"
								type="button"
								aria-label={`Remove ${game.game_name} from ${selectedUser.full_name}`}
								onclick={() => removeGame(game)}
								disabled={Boolean(addingGame) || Boolean(removingGame)}
							>
								<span>{game.game_name}</span>
								<X size={13} class="game-remove-icon" />
							</button>
						{/each}
					</div>
				{/if}

				<h3 class="add-games-heading">Add Games</h3>
				{#if dialogLoading}
					<p class="dialog-muted">Loading available games...</p>
				{:else if availableGames.length === 0}
					<p class="dialog-muted">This friend owns every game.</p>
				{:else}
					<div class="game-list available-game-list">
						{#each availableGames as game}
							<button
								class="game-pill available-game-pill"
								type="button"
								onclick={() => addGame(game)}
								disabled={Boolean(addingGame) || Boolean(removingGame)}
							>
								<span>{game.game_name}</span>
								<span class="game-add-label">{addingGame === game.game_name ? 'Adding...' : 'Add'}</span>
							</button>
						{/each}
					</div>
				{/if}
				{#if dialogError}<p class="dialog-error">{dialogError}</p>{/if}
			</section>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<style>
	.friends-page {
		--friends-bg: #f6e9d6;
		--friends-glow: rgba(224, 163, 110, 0.28);
		--friends-text: #302721;
		--friends-muted: #81756d;
		--friends-card: #fffdf7;
		--friends-border: #d6c7a9;
		min-height: 100%;
		overflow: auto;
		padding: clamp(22px, 4vh, 44px) max(20px, 4vw) 48px;
		box-sizing: border-box;
		color: var(--friends-text);
		background: radial-gradient(circle at 50% 12%, var(--friends-glow), transparent 35rem), var(--friends-bg);
	}

	.friends-page.dark-mode {
		--friends-bg: #1b1517;
		--friends-glow: rgba(168, 68, 92, 0.18);
		--friends-text: #f3edef;
		--friends-muted: #aa9ba0;
		--friends-card: #332027;
		--friends-border: #766067;
	}

	.friends-header {
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

	.friends-header h1 {
		margin: 0;
		font-size: clamp(30px, 4vw, 48px);
		line-height: 1;
		letter-spacing: -0.065em;
	}

	.subtitle {
		margin: 10px 0 0;
		color: var(--friends-muted);
		font-size: 14px;
	}

	.friends-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(12px, 2vw, 22px);
		width: min(1120px, 100%);
		margin: 0 auto;
	}

	.data-status {
		grid-column: 1 / -1;
		margin: 20px 0;
		color: var(--friends-muted);
		font-size: 14px;
		text-align: center;
	}

	.data-error,
	.dialog-error {
		color: #b54b55;
	}

	.friend-card {
		position: relative;
		aspect-ratio: 0.72;
		min-width: 0;
		overflow: hidden;
		padding: 0;
		border: 1px solid var(--friends-border);
		border-radius: 8px;
		color: #fff;
		background: var(--friends-card);
		box-shadow: 0 8px 18px rgba(48, 39, 33, 0.12);
		cursor: pointer;
		isolation: isolate;
		transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
	}

	.friend-card:hover,
	.friend-card:focus-visible {
		transform: translateY(-4px);
		border-color: #d28696;
		box-shadow: 0 14px 24px rgba(48, 39, 33, 0.2);
		outline: none;
	}

	.friend-initials {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 0;
		transform: translate(-50%, -58%);
		font-size: clamp(54px, 8vw, 96px);
		font-weight: 850;
		letter-spacing: -0.08em;
		color: #d28696;
	}

	.card-shade {
		position: absolute;
		inset: 35% 0 0;
		z-index: 1;
		background: linear-gradient(transparent, rgba(20, 12, 16, 0.86));
	}

	.friend-name,
	.friend-count {
		position: absolute;
		z-index: 2;
		left: 13px;
		right: 13px;
		text-align: left;
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
	}

	.friend-name {
		bottom: 31px;
		font-size: clamp(13px, 1.25vw, 17px);
		font-weight: 800;
	}

	.friend-count {
		bottom: 14px;
		color: rgba(255, 255, 255, 0.72);
		font-size: 11px;
		font-weight: 700;
	}

	.friend-dialog {
		--friends-text: #302721;
		--friends-muted: #81756d;
		--friends-card: #fffdf7;
		--friends-border: #d6c7a9;
		position: relative;
		border-color: var(--friends-border);
		color: var(--friends-text);
		background: var(--friends-card);
	}

	.friend-dialog.dark-dialog {
		--friends-text: #f3edef;
		--friends-muted: #aa9ba0;
		--friends-card: #332027;
		--friends-border: #766067;
	}

	.dialog-close {
		position: absolute;
		top: 18px;
		right: 18px;
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border: 1px solid var(--friends-border);
		border-radius: 50%;
		color: var(--friends-muted);
		background: transparent;
	}

	.dialog-heading {
		display: flex;
		align-items: center;
		gap: 14px;
		padding-right: 34px;
	}

	.dialog-initials {
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 8px;
		color: #fff;
		background: #c56f73;
		font-size: 20px;
		font-weight: 850;
	}

	.dialog-heading :global([data-slot='dialog-title']) {
		font-size: 24px;
	}

	.games-section {
		position: relative;
		margin-top: 24px;
	}

	.games-section h3 {
		margin: 0 0 10px;
		font-size: 15px;
	}

	.dialog-muted {
		color: var(--friends-muted);
		font-size: 12px;
	}

	.game-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		min-height: 28px;
		margin-bottom: 12px;
	}

	.game-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 9px;
		border: 1px solid transparent;
		border-radius: 999px;
		color: var(--friends-text);
		background: var(--friends-border);
		font-size: 12px;
		font-weight: 700;
	}

	.owned-game-pill {
		cursor: pointer;
		transition: border-color 160ms ease, background 160ms ease;
	}

	.owned-game-pill:hover,
	.owned-game-pill:focus-visible {
		border-color: #d28696;
		background: rgba(210, 134, 150, 0.22);
		outline: none;
	}

	.game-remove-icon {
		opacity: 0;
		color: #b54b55;
		transition: opacity 160ms ease;
	}

	.owned-game-pill:hover .game-remove-icon,
	.owned-game-pill:focus-visible .game-remove-icon {
		opacity: 1;
	}

	.add-games-heading {
		margin-top: 22px !important;
	}

	.available-game-list {
		margin-bottom: 0;
	}

	.available-game-pill {
		justify-content: space-between;
		border-color: var(--friends-border);
		background: transparent;
		cursor: pointer;
		transition: border-color 160ms ease, background 160ms ease;
	}

	.available-game-pill:hover,
	.available-game-pill:focus-visible {
		border-color: #d28696;
		background: rgba(210, 134, 150, 0.22);
		outline: none;
	}

	.game-add-label {
		color: var(--friends-muted);
		font-size: 12px;
	}

	.dialog-error {
		margin: 10px 0 0;
		font-size: 12px;
	}

	@media (max-width: 700px) {
		.friends-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
