<script>
    import {
        Check,
        ChevronDown,
        FileSpreadsheet,
        Gamepad2,
        Moon,
        ListFilter,
        Search,
        Sparkles,
        Sun,
        Upload,
        Users,
        X,
        Zap,
    } from "@lucide/svelte";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import deepRockLogo from "$lib/assets/DRG_Logo.webp";
    import lethalCompanyLogo from "$lib/assets/lethal company logo.png";
    import overcookedLogo from "$lib/assets/overcooked logo.png";
    import peakLogo from "$lib/assets/peak logo.webp";
    import seaOfThievesLogo from "$lib/assets/Sea-Of-Thieves-Logo.png";

    let selectedNames = $state(["Alex", "Tommy", "Otto"]);
    let searchTerm = $state("");
    let platformFilter = $state("All platforms");
    let maxMinutes = $state("Any length");
    let importedFile = $state("");
    let isSpinning = $state(false);
    let chosenGame = $state(/** @type {typeof games[number] | null} */ (null));
    let showResult = $state(false);
    let isDark = $state(true);

    const players = [
        { name: "Alex", initials: "AL", color: "coral", gameCount: 42 },
        { name: "Tommy", initials: "TO", color: "blue", gameCount: 28 },
        { name: "Otto", initials: "OT", color: "gold", gameCount: 35 },
        { name: "Nick", initials: "NI", color: "green", gameCount: 19 },
        { name: "Shena", initials: "SH", color: "purple", gameCount: 31 },
    ];

    const games = [
        { title: "Deep Rock Galactic", platform: "Steam", players: "1-4", minutes: 90, genre: "Co-op shooter", accent: "amber", image: deepRockLogo },
        { title: "Overcooked! 2", platform: "Steam", players: "2-4", minutes: 45, genre: "Co-op chaos", accent: "tomato", image: overcookedLogo },
        { title: "Lethal Company", platform: "Steam", players: "1-4", minutes: 60, genre: "Horror co-op", accent: "moss", image: lethalCompanyLogo },
        { title: "PEAK", platform: "Steam", players: "1-4", minutes: 120, genre: "Cozy co-op", accent: "sky", image: peakLogo },
        { title: "Sea of Thieves", platform: "Xbox", players: "2-4", minutes: 90, genre: "Adventure", accent: "navy", image: seaOfThievesLogo },
    ];

    let selectedPlayers = $derived(players.filter((player) => selectedNames.includes(player.name)));
    let playerCount = $derived(selectedPlayers.length);

    let filteredGames = $derived.by(() => {
        const query = searchTerm.toLowerCase();
        const supportsGroup = /** @param {typeof games[number]} game */ (game) =>
            playerCount > 0 && (game.players.includes("4") || (playerCount === 1 && game.players.includes("1")));
        return games.filter(
            (game) =>
                (game.title.toLowerCase().includes(query) || game.genre.toLowerCase().includes(query)) &&
                (platformFilter === "All platforms" || game.platform === platformFilter) &&
                (maxMinutes === "Any length" || game.minutes <= Number(maxMinutes)) &&
                supportsGroup(game),
        );
    });
    let matchingGames = $derived(filteredGames);

    /** @param {string} name */
    function togglePlayer(name) {
        selectedNames = selectedNames.includes(name)
            ? selectedNames.filter((item) => item !== name)
            : [...selectedNames, name];
    }

    /** @param {Event} event */
    function importCsv(event) {
        const file = /** @type {HTMLInputElement} */ (event.currentTarget)?.files?.[0];
        if (file) importedFile = file.name;
    }

    function findGame() {
        if (matchingGames.length === 0 || selectedPlayers.length < 2) return;
        isSpinning = true;
        setTimeout(() => {
            chosenGame = matchingGames[Math.floor(Math.random() * matchingGames.length)];
            isSpinning = false;
            showResult = true;
        }, 4200);
    }
</script>

<svelte:head>
    <title>Gameing</title>
    <meta name="description" content="Find the perfect game for everyone in your group." />
</svelte:head>

<div class="app-shell" class:dark-mode={isDark}>
    <button
        class="theme-toggle"
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        onclick={() => (isDark = !isDark)}
    >
        {#if isDark}<Sun size={16} />{:else}<Moon size={16} />{/if}
    </button>

    <main>
        <section class="intro">
            <p class="eyebrow">Game night planner</p>
            <h1>What are we playing?</h1>
            <p class="subtitle">Pick your crew. We'll find the games you all have.</p>
        </section>

        <section class="players-section">
            <div class="section-heading">
                <h2>Who's playing?</h2>
                <Badge href="" class="pill" variant="secondary">{playerCount} selected</Badge>
            </div>

            <div class="player-grid">
                {#each players as player}
                    <button
                        type="button"
                        class="player-card"
                        class:chosen={selectedNames.includes(player.name)}
                        aria-pressed={selectedNames.includes(player.name)}
                        onclick={() => togglePlayer(player.name)}
                    >
                        <Avatar class="player-avatar {player.color}">
                            <AvatarFallback class="avatar-fallback">{player.initials}</AvatarFallback>
                        </Avatar>
                        <span class="player-info">
                            <strong>{player.name}</strong>
                            <small>{player.gameCount} games</small>
                        </span>
                        <span class="check-circle">
                            {#if selectedNames.includes(player.name)}<Check size={14} strokeWidth={3} />{/if}
                        </span>
                    </button>
                {/each}
            </div>
        </section>

        <section class="results-section">
            <div class="section-heading">
                <h2>Matching games</h2>
                <Badge href="" class="pill" variant="secondary">{matchingGames.length} available</Badge>
            </div>

            <div class="bubble-stage" class:spinning={isSpinning} class:empty={matchingGames.length === 0}>
                <div class="bubble-glow"></div>
                <div class="orbit orbit-one"></div>
                <div class="orbit orbit-two"></div>

                {#each matchingGames as game, index}
                    <div class="game-orb {game.accent}" style={`--index: ${index}; --total: ${matchingGames.length}`}>
                        <img class="orb-icon" src={game.image} alt={game.title} />
                        <span class="orb-name">{game.title}</span>
                    </div>
                {/each}

                {#if matchingGames.length === 0}
                    <div class="no-games">
                        <span>¯\_(ツ)_/¯</span>
                        <strong>No matches yet</strong>
                        <small>Select a new crew to find something to play.</small>
                    </div>
                {:else}
                    <div class="bubble-core">
                        <Gamepad2 size={27} />
                        <span>{matchingGames.length}</span>
                    </div>
                {/if}
            </div>

            {#if playerCount > 1 && matchingGames.length > 0}
                <button type="button" class="find-button" disabled={isSpinning} onclick={findGame}>
                    {isSpinning ? "Choosing a game..." : "Find a game"}
                </button>
            {:else if playerCount === 1}
                <p class="helper-text">Choose one more player to start the game picker.</p>
            {/if}
        </section>
    </main>
</div>

<Dialog.Root bind:open={showResult}>
    <Dialog.Content class="result-dialog" portalProps={{}}>
        <Dialog.Header class="dialog-header">
            <Dialog.Title class="dialog-title">Tonight's game is...</Dialog.Title>
            <Dialog.Description class="dialog-description">Everyone's got it. Time to play.</Dialog.Description>
        </Dialog.Header>

        {#if chosenGame}
            <div class="chosen-art {chosenGame.accent}"><img src={chosenGame.image} alt={chosenGame.title} /></div>
            <div class="chosen-details">
                <h3>{chosenGame.title}</h3>
                <p>{chosenGame.genre} · {chosenGame.players} players · {chosenGame.platform}</p>
            </div>
        {/if}

        <Dialog.Footer class="dialog-footer">
            <Dialog.Close class="dialog-button">Let's play</Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<style>
    /* ============================================
       DESIGN TOKENS
       One source of truth per color/spacing value.
       Dark mode just re-points the same variables,
       so nothing below ever needs !important or a
       second copy of every rule.
       ============================================ */
    .app-shell {
        --bg: #f6e9d6;
        --bg-glow: rgba(224, 163, 110, 0.4);
        --surface: #fffdf7;
        --text: #302721;
        --text-muted: #81756d;
        --text-faint: #9d9188;
        --border: #d6c7a9;
        --border-hover: #c48686;
        --accent: #c56f73;
        --accent-soft: #dc9290;
        --pill-bg: #f4e7cb;
        --pill-text: #8b684b;
        --chosen-bg: #c67e8e;
        --chosen-border: #d28696;
        --chosen-shadow: #894c5e;
        --chosen-text-muted: #f9e1df;
        --check-bg: #da98a2;
        --check-border: #c77f8f;
        --core-bg: rgba(255, 247, 218, 0.86);
        --core-border: rgba(196, 151, 71, 0.5);
        --core-text: #8c642e;
        --orbit-border: rgba(190, 145, 65, 0.3);
        --glow-color: rgba(239, 203, 111, 0.42);
        --action-bg: #4a2030;
        --action-bg-hover: #74304a;
        --action-shadow: #2e1420;

        --radius-sm: 0.25rem;
        --radius-md: 0.6rem;

        min-height: 100vh;
        color: var(--text);
        background: radial-gradient(circle at 50% 46%, var(--bg-glow), transparent 31rem), var(--bg);
    }

    .app-shell.dark-mode {
        --bg: #1b1517;
        --bg-glow: rgba(168, 68, 92, 0.2);
        --surface: #332027;
        --text: #f3edef;
        --text-muted: #aa9ba0;
        --text-faint: #897d80;
        --border: #766067;
        --border-hover: #d18eaa;
        --accent-soft: #ef9079;
        --pill-bg: #412934;
        --pill-text: #dcaebe;
        --chosen-bg: #b55d78;
        --chosen-border: #e398ab;
        --chosen-shadow: #5c2436;
        --chosen-text-muted: #f0c6d2;
        --check-bg: #a8506a;
        --check-border: #c97a8f;
        --core-bg: rgba(58, 28, 38, 0.82);
        --core-border: rgba(224, 138, 160, 0.5);
        --core-text: #e6a8bb;
        --orbit-border: rgba(224, 138, 160, 0.25);
        --glow-color: rgba(168, 68, 92, 0.25);
    }

    :global(body) {
        margin: 0;
        background: var(--bg, #f7f7f3);
    }
    :global(button),
    :global(input),
    :global(select) {
        font: inherit;
    }
    :global(button) {
        cursor: pointer;
    }

    /* ============================================
       LAYOUT
       ============================================ */
    main {
        width: min(984px, calc(100% - 56px));
        margin: auto;
        padding: 62px 0 86px;
    }

    .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 20;
        display: grid;
        place-items: center;
        width: 42px;
        height: 42px;
        border: 2px solid #314a3a;
        border-radius: var(--radius-sm);
        color: #1f3028;
        background: #b55d78;
        box-shadow: 0 3px 0 rgba(31, 48, 40, 0.25);
    }
    .dark-mode .theme-toggle {
        border-color: #b85e72;
        color: #17251e;
    }

    /* ============================================
       INTRO
       ============================================ */
    .intro {
        text-align: center;
    }
    .eyebrow {
        margin: 0 0 13px;
        color: var(--accent, #ec765d);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }
    .dark-mode .eyebrow {
        color: var(--accent-soft);
    }
    h1 {
        margin: 0;
        font-size: clamp(32px, 4vw, 49px);
        line-height: 0.98;
        letter-spacing: -0.065em;
    }
    .subtitle {
        margin: 14px 0 0;
        color: var(--text-muted);
        font-size: 15px;
    }

    /* ============================================
       SHARED SECTION HEADING + PILL
       (Badge component keeps its own internals;
       we only add spacing/typography via :global)
       ============================================ */
    .section-heading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
    h2 {
        margin: 0;
        font-size: 16px;
        letter-spacing: -0.02em;
    }
    :global(.pill) {
        color: var(--pill-text);
        background: var(--pill-bg);
        font-size: 11px;
        font-weight: 750;
    }

    /* ============================================
       PLAYERS
       ============================================ */
    .players-section {
        margin-top: 52px;
    }
    .player-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-top: 16px;
    }
    .player-card {
        display: flex;
        align-items: center;
        height: 92px;
        min-width: 0;
        padding: 12px;
        border: 2px solid var(--border);
        border-radius: var(--radius-sm);
        color: var(--text);
        background: var(--surface);
        text-align: left;
        transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
    }
    .player-card:hover {
        border-color: var(--border-hover);
    }
    .player-card.chosen {
        color: #ffffff;
        border-color: var(--chosen-border);
        background: var(--chosen-bg);
        box-shadow: 0 3px 0 var(--chosen-shadow);
    }
    :global(.player-avatar) {
        flex: 0 0 auto;
        width: 34px;
        height: 34px;
        border-radius: var(--radius-sm);
        color: #fff;
    }
    :global(.player-avatar) :global([data-slot="avatar-fallback"]) {
        font-size: 10px;
        font-weight: 800;
    }
    :global(.coral) { background: #e68067; }
    :global(.blue) { background: #77a5ad; }
    :global(.gold) { background: #d3a64c; }
    :global(.green) { background: #c9748d; }
    :global(.purple) { background: #9587aa; }

    .player-info {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 3px;
        margin-left: 9px;
    }
    .player-info strong {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
    }
    .player-info small {
        color: var(--text-faint);
        font-size: 10px;
    }
    .chosen .player-info small {
        color: var(--chosen-text-muted);
    }

    .check-circle {
        display: grid;
        place-items: center;
        width: 18px;
        height: 18px;
        margin-left: auto;
        border: 1px solid var(--border);
        border-radius: 50%;
        color: #fff;
    }
    .chosen .check-circle {
        border-color: var(--check-border);
        background: var(--check-bg);
    }

    /* ============================================
       RESULTS / BUBBLE STAGE
       ============================================ */
    .results-section {
        margin-top: 75px;
    }

    .bubble-stage {
        position: relative;
        display: grid;
        place-items: center;
        width: min(100%, 690px);
        height: 390px;
        margin: 22px auto 0;
        isolation: isolate;
    }
    .bubble-glow {
        position: absolute;
        width: 270px;
        height: 270px;
        border-radius: 50%;
        background: var(--glow-color);
        filter: blur(24px);
    }
    .orbit {
        position: absolute;
        border: 1px dashed var(--orbit-border);
        border-radius: 50%;
    }
    .orbit-one { width: 270px; height: 270px; }
    .orbit-two { width: 435px; height: 210px; transform: rotate(-18deg); }

    .bubble-core {
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        width: 86px;
        height: 86px;
        border: 1px solid var(--core-border);
        border-radius: 50%;
        color: var(--core-text);
        background: var(--core-bg);
        box-shadow: 0 8px 26px rgba(91, 119, 68, 0.12);
    }
    .bubble-core span {
        font-size: 12px;
        font-weight: 800;
    }

    .game-orb {
        user-select: none;
        position: absolute;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: clamp(75px, 10vw, 94px);
        height: clamp(75px, 10vw, 94px);
        border: 4px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        box-shadow: 0 9px 22px rgba(42, 57, 40, 0.15);
        animation: orbit 22s linear infinite;
        animation-delay: calc(var(--index) * -2s);
        transform: rotate(calc(var(--index) * (360deg / var(--total)))) translateY(-155px);
    }
    .orb-icon {
        width: 68%;
        height: 68%;
        object-fit: contain;
        filter: drop-shadow(0 4px 3px rgba(30, 40, 20, 0.15));
    }
    .orb-name {
        position: absolute;
        top: calc(100% + 8px);
        width: 125px;
        color: var(--text-muted);
        font-size: 10px;
        font-weight: 750;
        text-align: center;
    }

    :global(.amber) { background: #d6a852; }
    :global(.tomato) { background: #df8062; }
    :global(.moss) { background: #718767; }
    :global(.sky) { background: #7fadb0; }
    :global(.navy) { background: #435d72; }
    :global(.rose) { background: #bc7784; }

    .spinning .game-orb {
        animation: spin-fast 1.25s linear infinite;
    }
    .spinning .bubble-core {
        animation: pulse 1.1s ease-in-out infinite alternate;
    }
    .empty .bubble-glow,
    .empty .orbit {
        opacity: 0.35;
    }

    .no-games {
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;
        color: var(--text-muted);
    }
    .no-games span { font-size: 25px; }
    .no-games strong { color: var(--text); font-size: 14px; }
    .no-games small { font-size: 11px; }

    .find-button {
        display: block;
        margin: 24px auto 0;
        padding: 12px 28px;
        border: 0;
        border-radius: var(--radius-sm);
        color: #fff;
        background: var(--action-bg);
        box-shadow: 0 4px 0 var(--action-shadow);
        font-size: 14px;
        font-weight: 700;
    }
    .find-button:hover:not(:disabled) {
        background: var(--action-bg-hover);
    }
    .find-button:disabled {
        cursor: default;
        opacity: 0.75;
    }
    .helper-text {
        margin: 10px 0 0;
        color: var(--text-faint);
        font-size: 12px;
        text-align: center;
    }

    /* ============================================
       RESULT DIALOG
       (Dialog keeps its own chrome; we only style
       the content we place inside it)
       ============================================ */
    :global(.chosen-art) {
        display: grid;
        place-items: center;
        height: 178px;
        margin-top: 8px;
        border-radius: var(--radius-md);
    }
    :global(.chosen-art) img {
        max-width: 72%;
        max-height: 72%;
        object-fit: contain;
        filter: drop-shadow(0 9px 5px rgba(30, 40, 20, 0.18));
    }
    :global(.chosen-details) {
        text-align: center;
    }
    :global(.chosen-details) h3 {
        margin: 17px 0 6px;
        font-size: 22px;
        letter-spacing: -0.04em;
    }
    :global(.chosen-details) p {
        margin: 0;
        color: var(--text-muted);
        font-size: 12px;
    }
    :global(.dialog-button) {
        margin-left: auto;
        padding: 10px 20px;
        border: 0;
        border-radius: var(--radius-sm);
        color: #fff;
        background: var(--action-bg);
        font-size: 13px;
        font-weight: 700;
    }
    :global(.dialog-button):hover {
        background: var(--action-bg-hover);
    }

    /* ============================================
       RESPONSIVE
       ============================================ */
    @media (max-width: 700px) {
        main {
            width: min(100% - 32px, 520px);
            padding-top: 42px;
        }
        .theme-toggle {
            top: 14px;
            right: 14px;
        }
        .player-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .bubble-stage {
            height: 350px;
        }
        .orbit-two {
            width: 335px;
        }
    }
    @media (max-width: 430px) {
        .player-grid {
            grid-template-columns: 1fr;
        }
    }

    /* ============================================
       ANIMATIONS
       ============================================ */
    @keyframes orbit {
        from { transform: rotate(calc(var(--index) * (360deg / var(--total)))) translateY(-155px) rotate(calc(var(--index) * (-360deg / var(--total)))); }
        to { transform: rotate(calc(var(--index) * (360deg / var(--total) + 360deg))) translateY(-155px) rotate(calc(var(--index) * (-360deg / var(--total) - 360deg))); }
    }
    @keyframes spin-fast {
        from { transform: rotate(0deg) translateY(-155px); }
        to { transform: rotate(360deg) translateY(-155px); }
    }
    @keyframes pulse {
        from { scale: 0.94; }
        to { scale: 1.06; }
    }
</style>