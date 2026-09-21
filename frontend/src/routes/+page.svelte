<script>
    import {
        Check,
        ChevronDown,
        CirclePlus,
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
    import { onMount } from "svelte";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {
        addOwnedGame,
        createGame,
        createUser,
        getGames,
        getUserGames,
        getUsers,
    } from "$lib/API";

    /** @typedef {import("$lib/API").Game} Game */
    /** @typedef {import("$lib/API").User} User */
    import GameSelection from "$lib/components/GameSelection.svelte";
    import deepRockLogo from "$lib/assets/DRG_Logo.webp";
    import lethalCompanyLogo from "$lib/assets/lethal company logo.png";
    import overcookedLogo from "$lib/assets/overcooked logo.png";
    import peakLogo from "$lib/assets/peak logo.webp";
    import seaOfThievesLogo from "$lib/assets/Sea-Of-Thieves-Logo.png";
    import cs2Logo from "$lib/assets/cs2 logo.jpg";
    import warSelectionLogo from "$lib/assets/war selection logo.png";
    import rocketLeagueLogo from "$lib/assets/Rocket_League_logo.webp";
    import btd6Logo from "$lib/assets/BTD6Logo.webp";
    import valorantLogo from "$lib/assets/valorant-logo-png_seeklogo-379976.png";
    import sevenDaysLogo from "$lib/assets/7days logo.webp";
    import warDogsLogo from "$lib/assets/war dogs logo.jpg";
    import civ6Logo from "$lib/assets/civ 6 logo.png";
    import fortniteLogo from "$lib/assets/fortnite logo.png";
    import subnauticaLogo from "$lib/assets/subnautica logo.jpg";
    import finalsLogo from "$lib/assets/The_Finals_logo_(current).jpg";
    import minecraftLogo from "$lib/assets/Minecraft-Logo-1.png";
    import valheimLogo from "$lib/assets/Logo_valheim.webp";
    import fallGuysLogo from "$lib/assets/fall guys logo.png";
    import palworldLogo from "$lib/assets/palworld logo.jpg";
    import jumpSpaceLogo from "$lib/assets/jump space logo.webp";
    import helldiversLogo from "$lib/assets/helldiver 2 logo.jpg";
    import groundedLogo from "$lib/assets/grounded logo.jpg";
    import subnautica2Logo from "$lib/assets/subnautica 2 logo.jpg";
    import overwatchLogo from "$lib/assets/Overwatch-Logo.png";
    import amongUsLogo from "$lib/assets/Among-Us-Logo.png";
    import terrariaLogo from "$lib/assets/terarria logo.webp";
    import theForestLogo from "$lib/assets/the-forest-logo.png";
    import sonsOfTheForestLogo from "$lib/assets/Sons_of_the_Forest_logo.jpg";
    import arkLogo from "$lib/assets/ARK-Logo.png";
    import raftLogo from "$lib/assets/Raft_logo.png";
    import stickFightLogo from "$lib/assets/stick fight logo.jpg";
    import mordhauLogo from "$lib/assets/mordhau logo.png";
    import rustLogo from "$lib/assets/Rust-Logo.png";
    import humanFallFlatLogo from "$lib/assets/human fall fla logo.png";
    import strandedDeepLogo from "$lib/assets/stranded deep logo.jpg";
    import ultimateChickenHorseLogo from "$lib/assets/ultimate chicken horse logo.jpg";
    import puckLogo from "$lib/assets/puck logo.jpg";
    import arcRaidersLogo from "$lib/assets/arc raiders logo.webp";
    import bodycamLogo from "$lib/assets/body cam logo.jpg";

    let selectedNames = $state(/** @type {string[]} */ ([]));
    let searchTerm = $state("");
    let platformFilter = $state("All platforms");
    let maxMinutes = $state("Any length");
    let importedFile = $state("");
    let chosenGame = $state(/** @type {typeof games[number] | null} */ (null));
    let showResult = $state(false);
    let isDark = $state(true);
    let userDialogOpen = $state(false);
    let gameDialogOpen = $state(false);
    let userName = $state("");
    let userGames = $state(/** @type {Game[]} */ ([]));
    let selectedUserGames = $state(/** @type {string[]} */ ([]));
    let gameName = $state("");
    let playerLimit = $state(4);
    let selectedGenres = $state(/** @type {string[]} */ ([]));
    let selectedPlatforms = $state(/** @type {string[]} */ ([]));
    let gameUsers = $state(/** @type {User[]} */ ([]));
    let selectedGameUsers = $state(/** @type {string[]} */ ([]));
    let dialogLoading = $state(false);
    let dialogError = $state("");
    let dataLoading = $state(true);
    let dataError = $state("");

    let players = $state(
        /** @type {Array<{name: string, initials: string, color: string, gameCount: number, ownedGames: string[]}>} */ ([]),
    );
    let games = $state(
        /** @type {Array<{title: string, platform: string, players: string, maxPlayers: number, minutes: number, genre: string, accent: string, image?: string, orbitDuration?: number, orbitDelay?: number}>} */ ([]),
    );

    const platformOptions = [
        "Steam",
        "Xbox",
        "Epic Games",
        "Blizzard",
        "Riot Games",
    ];
    const genreOptions = [
        "Action",
        "Adventure",
        "Co-op",
        "Competitive",
        "Fighting",
        "Horror",
        "Party",
        "Puzzle",
        "RPG",
        "Shooter",
        "Simulation",
        "Sports",
        "Strategy",
        "Survival",
    ];

    const gameImages = /** @type {Record<string, string>} */ ({
        CS2: cs2Logo,
        "War Selection": warSelectionLogo,
        "Rocket League": rocketLeagueLogo,
        BTD6: btd6Logo,
        Valorant: valorantLogo,
        "Deep Rock Galactic": deepRockLogo,
        "7 Days to Die": sevenDaysLogo,
        "War Dogs": warDogsLogo,
        "Civ 6": civ6Logo,
        "Overcooked! 2": overcookedLogo,
        "Lethal Company": lethalCompanyLogo,
        Fortnite: fortniteLogo,
        Subnautica: subnauticaLogo,
        "The Finals": finalsLogo,
        Minecraft: minecraftLogo,
        Valheim: valheimLogo,
        "Fall Guys": fallGuysLogo,
        Palworld: palworldLogo,
        "Jump Space": jumpSpaceLogo,
        "Helldivers 2": helldiversLogo,
        Grounded: groundedLogo,
        "Subnautica 2": subnautica2Logo,
        Overwatch: overwatchLogo,
        "Among Us": amongUsLogo,
        PEAK: peakLogo,
        "Sea of Thieves": seaOfThievesLogo,
        Terraria: terrariaLogo,
        "The Forest": theForestLogo,
        "Sons of the Forest": sonsOfTheForestLogo,
        Ark: arkLogo,
        Raft: raftLogo,
        "Stick Fight": stickFightLogo,
        Mordhau: mordhauLogo,
        Rust: rustLogo,
        "Human Fall Flat": humanFallFlatLogo,
        "Stranded Deep": strandedDeepLogo,
        "Ultimate Chicken Horse": ultimateChickenHorseLogo,
        Puck: puckLogo,
        "Arc Raiders": arcRaidersLogo,
        Bodycam: bodycamLogo,
    });
    const playerColors = ["coral", "blue", "gold", "green", "purple"];

    onMount(loadBackendData);

    async function loadBackendData() {
        dataLoading = true;
        dataError = "";
        try {
            const [backendUsers, backendGames] = await Promise.all([
                getUsers(),
                getGames(),
            ]);
            const usersWithGames = await Promise.all(
                backendUsers.map(async (user) => ({
                    user,
                    ownedGames: (await getUserGames(user.full_name)).map(
                        (game) => game.game_name,
                    ),
                })),
            );
            players = usersWithGames.map(({ user, ownedGames }, index) => ({
                name: user.full_name,
                initials: user.initials,
                color: playerColors[index % playerColors.length],
                gameCount: user.game_count,
                ownedGames,
            }));
            games = backendGames.map((game, index) => ({
                title: game.game_name,
                platform: game.platform,
                players: `up to ${game.player_limit}`,
                maxPlayers: game.player_limit,
                minutes: 0,
                genre: game.genre,
                accent: ["amber", "tomato", "moss", "sky", "navy"][index % 5],
                image: gameImages[game.game_name],
                orbitDuration: 30 + Math.random() * 15,
                orbitDelay: -(Math.random() * 45),
            }));
        } catch (error) {
            dataError =
                error instanceof Error
                    ? error.message
                    : "Could not load players and games.";
        } finally {
            dataLoading = false;
        }
    }

    let selectedPlayers = $derived(
        players.filter((player) => selectedNames.includes(player.name)),
    );
    let playerCount = $derived(selectedPlayers.length);

    let filteredGames = $derived.by(() => {
        const query = searchTerm.toLowerCase();
        const selectedOwnedGames =
            selectedPlayers.length > 0
                ? selectedPlayers
                      .slice(1)
                      .reduce(
                          (commonGames, player) =>
                              commonGames.filter((gameName) =>
                                  player.ownedGames.includes(gameName),
                              ),
                          [...selectedPlayers[0].ownedGames],
                      )
                : [];
        const supportsGroup = /** @param {typeof games[number]} game */ (
            game,
        ) =>
            selectedOwnedGames.includes(game.title) &&
            game.maxPlayers >= playerCount;
        return games.filter(
            (game) =>
                (game.title.toLowerCase().includes(query) ||
                    game.genre.toLowerCase().includes(query)) &&
                (platformFilter === "All platforms" ||
                    game.platform
                        .split(",")
                        .map((item) => item.trim())
                        .includes(platformFilter)) &&
                (maxMinutes === "Any length" ||
                    game.minutes <= Number(maxMinutes)) &&
                supportsGroup(game),
        );
    });
    let matchingGames = $derived(filteredGames);

    /** @param {typeof games[number]} winner */
    function handleGameResult(winner) {
        chosenGame = winner;
        showResult = true;
    }

    /** @param {string} name */
    function togglePlayer(name) {
        selectedNames = selectedNames.includes(name)
            ? selectedNames.filter((item) => item !== name)
            : [...selectedNames, name];
    }

    /** @param {Event} event */
    function importCsv(event) {
        const file = /** @type {HTMLInputElement} */ (event.currentTarget)
            ?.files?.[0];
        if (file) importedFile = file.name;
    }

    async function openUserDialog() {
        userDialogOpen = true;
        dialogError = "";
        dialogLoading = true;
        try {
            userGames = await getGames();
        } catch (error) {
            dialogError =
                error instanceof Error
                    ? error.message
                    : "Could not load games.";
        } finally {
            dialogLoading = false;
        }
    }

    async function openGameDialog() {
        gameDialogOpen = true;
        dialogError = "";
        dialogLoading = true;
        try {
            gameUsers = await getUsers();
        } catch (error) {
            dialogError =
                error instanceof Error
                    ? error.message
                    : "Could not load users.";
        } finally {
            dialogLoading = false;
        }
    }

    /** @param {string} gameName */
    function toggleUserGame(gameName) {
        selectedUserGames = selectedUserGames.includes(gameName)
            ? selectedUserGames.filter((item) => item !== gameName)
            : [...selectedUserGames, gameName];
    }

    /** @param {string} fullName */
    function toggleGameUser(fullName) {
        selectedGameUsers = selectedGameUsers.includes(fullName)
            ? selectedGameUsers.filter((item) => item !== fullName)
            : [...selectedGameUsers, fullName];
    }

    /** @param {string} selectedGenre */
    function toggleGenre(selectedGenre) {
        selectedGenres = selectedGenres.includes(selectedGenre)
            ? selectedGenres.filter((item) => item !== selectedGenre)
            : [...selectedGenres, selectedGenre];
    }

    /** @param {string} selectedPlatform */
    function togglePlatform(selectedPlatform) {
        selectedPlatforms = selectedPlatforms.includes(selectedPlatform)
            ? selectedPlatforms.filter((item) => item !== selectedPlatform)
            : [...selectedPlatforms, selectedPlatform];
    }

    function cancelUserDialog() {
        userDialogOpen = false;
        userName = "";
        selectedUserGames = [];
        dialogError = "";
    }

    function cancelGameDialog() {
        gameDialogOpen = false;
        gameName = "";
        playerLimit = 4;
        selectedGenres = [];
        selectedPlatforms = [];
        selectedGameUsers = [];
        dialogError = "";
    }

    async function submitUser() {
        if (!userName.trim()) return;
        dialogLoading = true;
        dialogError = "";
        try {
            const createdUser = await createUser({ full_name: userName });
            if (selectedUserGames.length > 0) {
                await Promise.all(
                    selectedUserGames.map((gameName) =>
                        addOwnedGame(createdUser.full_name, gameName),
                    ),
                );
            }
            await loadBackendData();
            userDialogOpen = false;
            userName = "";
            selectedUserGames = [];
        } catch (error) {
            dialogError =
                error instanceof Error
                    ? error.message
                    : "Could not create user.";
        } finally {
            dialogLoading = false;
        }
    }

    async function submitGame() {
        if (
            !gameName.trim() ||
            selectedGenres.length === 0 ||
            selectedPlatforms.length === 0
        )
            return;
        dialogLoading = true;
        dialogError = "";
        try {
            const createdGame = await createGame({
                game_name: gameName,
                player_limit: Number(playerLimit),
                genre: selectedGenres.join(", "),
                platform: selectedPlatforms.join(", "),
            });
            if (selectedGameUsers.length > 0) {
                await Promise.all(
                    selectedGameUsers.map((user) =>
                        addOwnedGame(user, createdGame.game_name),
                    ),
                );
            }
            await loadBackendData();
            gameDialogOpen = false;
            gameName = "";
            selectedGenres = [];
            selectedPlatforms = [];
            playerLimit = 4;
            selectedGameUsers = [];
        } catch (error) {
            dialogError =
                error instanceof Error
                    ? error.message
                    : "Could not create game.";
        } finally {
            dialogLoading = false;
        }
    }
</script>

<svelte:head>
    <title>Gameing</title>
    <meta
        name="description"
        content="Find the perfect game for everyone in your group."
    />
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
            <p class="subtitle">
                Pick your crew. We'll find the games you all have.
            </p>
        </section>

        <section class="players-section">
            <div class="section-heading">
                <h2>Who's playing?</h2>
                <Badge href="" class="pill" variant="secondary"
                    >{playerCount} selected</Badge
                >
            </div>

            {#if dataLoading}<p class="data-status">
                    Loading players and games...
                </p>{:else if dataError}<p class="data-error">
                    {dataError}
                </p>{:else if players.length === 0}<div class="player-grid">
                    <button
                        type="button"
                        class="add-player-card flex items-center justify-center gap-2"
                        onclick={openUserDialog}
                        aria-label="Add user"
                    >
                        <CirclePlus size={24} />
                        <span>Add Friend</span>
                    </button>
                </div>{:else}<div class="player-grid">
                    {#each players as player}
                        <button
                            type="button"
                            class="player-card"
                            class:chosen={selectedNames.includes(player.name)}
                            aria-pressed={selectedNames.includes(player.name)}
                            onclick={() => togglePlayer(player.name)}
                        >
                            <Avatar class="player-avatar {player.color}">
                                <AvatarFallback class="avatar-fallback"
                                    >{player.initials}</AvatarFallback
                                >
                            </Avatar>
                            <span class="player-info">
                                <strong>{player.name}</strong>
                                <small>{player.gameCount} games</small>
                            </span>
                            <span class="check-circle">
                                {#if selectedNames.includes(player.name)}<Check
                                        size={14}
                                        strokeWidth={3}
                                    />{/if}
                            </span>
                        </button>
                    {/each}
                    <button
                        type="button"
                        class="add-player-card flex items-center justify-center gap-2"
                        onclick={openUserDialog}
                        aria-label="Add user"
                    >
                        <CirclePlus size={24} />
                        <span>Add Friend</span>
                    </button>
                </div>{/if}
        </section>

        <section class="results-section">
            <div class="section-heading">
                <h2>Matching games</h2>
                <Badge href="" class="pill" variant="secondary"
                    >{matchingGames.length} available</Badge
                >
                <button
                    type="button"
                    class="add-game-icon"
                    aria-label="Add game"
                    onclick={openGameDialog}
                >
                    <CirclePlus size={18} />
                </button>
            </div>

            <div class="bubble-stage" class:empty={matchingGames.length === 0}>
                <div class="bubble-glow"></div>
                <div class="orbit orbit-one"></div>
                <div class="orbit orbit-two"></div>

                {#each matchingGames as game, index}
                    <div
                        class="game-orb {game.accent}"
                        style={`--index: ${index}; --total: ${matchingGames.length}; --orbit-duration: ${game.orbitDuration ?? 30}s; --orbit-delay: ${game.orbitDelay ?? 0}s`}
                    >
                        {#if game.image}<img
                                class="orb-icon"
                                src={game.image}
                                alt={game.title}
                            />{:else}<span class="orb-fallback"
                                >{game.title.slice(0, 2).toUpperCase()}</span
                            >{/if}
                        <span class="orb-name">{game.title}</span>
                    </div>
                {/each}

                {#if matchingGames.length === 0}
                    <div class="no-games">
                        <span>¯\_(ツ)_/¯</span>
                        <strong>No matches yet</strong>
                        <small
                            >Select a new crew to find something to play.</small
                        >
                    </div>
                {/if}
                <button
                    type="button"
                    class="bubble-core"
                    aria-label="Add game"
                    onclick={openGameDialog}
                >
                    <span class="bubble-count">
                        <Gamepad2 size={27} />
                        <span>{matchingGames.length}</span>
                    </span>
                    <span class="bubble-add" aria-hidden="true">
                        <CirclePlus size={30} />
                    </span>
                </button>
            </div>

            {#if playerCount > 1 && matchingGames.length > 0}
                <GameSelection
                    items={matchingGames}
                    {isDark}
                    onResult={handleGameResult}
                />
            {:else if playerCount === 1}
                <p class="helper-text">
                    Choose one more player to start the game picker.
                </p>
            {/if}
        </section>
    </main>
</div>

<Dialog.Root bind:open={userDialogOpen}>
    <Dialog.Content
        class={`form-dialog ${isDark ? "dark-dialog" : ""}`}
        showCloseButton={false}
        portalProps={{}}
    >
        <Dialog.Header class="dialog-header">
            <Dialog.Title class="dialog-title">Insert user</Dialog.Title>
            <Dialog.Description class="dialog-description"
                >Add a friend and choose the games they own.</Dialog.Description
            >
        </Dialog.Header>
        <div class="form-fields">
            <label for="user-name">Full name</label>
            <Input
                id="user-name"
                type="text"
                class="form-input"
                bind:value={userName}
                placeholder="Alex Smith"
            />
            <label>Games owned</label>
            {#if dialogLoading}<p class="dialog-status">
                    Loading games...
                </p>{:else if userGames.length === 0}<p class="dialog-status">
                    No games found.
                </p>{:else}<div class="multi-select-list">
                    {#each userGames as game}<Button
                            variant="outline"
                            disabled={false}
                            class={`multi-select-option ${selectedUserGames.includes(game.game_name) ? "option-selected" : ""}`}
                            onclick={() => toggleUserGame(game.game_name)}
                            >{game.game_name}<span
                                >{selectedUserGames.includes(game.game_name)
                                    ? "Added"
                                    : "Add"}</span
                            ></Button
                        >{/each}
                </div>{/if}
        </div>
        {#if dialogError}<p class="dialog-error">{dialogError}</p>{/if}
        <Dialog.Footer class="dialog-footer">
            <Button
                class="dialog-cancel"
                variant="outline"
                disabled={dialogLoading}
                onclick={cancelUserDialog}>Cancel</Button
            >
            <Button
                class="dialog-button"
                disabled={dialogLoading || !userName.trim()}
                onclick={submitUser}>Confirm</Button
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={gameDialogOpen}>
    <Dialog.Content
        class={`form-dialog ${isDark ? "dark-dialog" : ""}`}
        showCloseButton={false}
        portalProps={{}}
    >
        <Dialog.Header class="dialog-header">
            <Dialog.Title class="dialog-title">Insert game</Dialog.Title>
            <Dialog.Description class="dialog-description"
                >Add a game and assign it to any existing friends.</Dialog.Description
            >
        </Dialog.Header>
        <div class="form-fields">
            <label for="game-name">Game name</label>
            <Input
                id="game-name"
                type="text"
                class="form-input"
                bind:value={gameName}
                placeholder="Deep Rock Galactic"
            />
            <label for="player-limit">Player limit</label>
            <Input
                id="player-limit"
                type="number"
                class="form-input"
                min="1"
                max="10"
                bind:value={playerLimit}
            />
            <fieldset class="badge-fieldset">
                <legend>Genre</legend>
                <div class="selection-badges">
                    {#each genreOptions as genreOption}
                        <button
                            type="button"
                            class="selection-badge"
                            class:selected={selectedGenres.includes(
                                genreOption,
                            )}
                            aria-pressed={selectedGenres.includes(genreOption)}
                            onclick={() => toggleGenre(genreOption)}
                        >
                            {genreOption}
                        </button>
                    {/each}
                </div>
            </fieldset>
            <fieldset class="badge-fieldset">
                <legend>Platform</legend>
                <div class="selection-badges">
                    {#each platformOptions as platformOption}
                        <button
                            type="button"
                            class="selection-badge"
                            class:selected={selectedPlatforms.includes(
                                platformOption,
                            )}
                            aria-pressed={selectedPlatforms.includes(
                                platformOption,
                            )}
                            onclick={() => togglePlatform(platformOption)}
                        >
                            {platformOption}
                        </button>
                    {/each}
                </div>
            </fieldset>
            <label>Owned by</label>
            {#if dialogLoading}<p class="dialog-status">
                    Loading users...
                </p>{:else if gameUsers.length === 0}<p class="dialog-status">
                    No users found.
                </p>{:else}<div class="multi-select-list">
                    {#each gameUsers as user}<Button
                            variant="outline"
                            disabled={false}
                            class={`multi-select-option ${selectedGameUsers.includes(user.full_name) ? "option-selected" : ""}`}
                            onclick={() => toggleGameUser(user.full_name)}
                            >{user.full_name}<span
                                >{selectedGameUsers.includes(user.full_name)
                                    ? "Added"
                                    : "Add"}</span
                            ></Button
                        >{/each}
                </div>{/if}
        </div>
        {#if dialogError}<p class="dialog-error">{dialogError}</p>{/if}
        <Dialog.Footer class="dialog-footer">
            <Button
                class="dialog-cancel"
                variant="outline"
                disabled={dialogLoading}
                onclick={cancelGameDialog}>Cancel</Button
            >
            <Button
                class="dialog-button"
                disabled={dialogLoading ||
                    !gameName.trim() ||
                    selectedGenres.length === 0 ||
                    selectedPlatforms.length === 0}
                onclick={submitGame}>Confirm</Button
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={showResult}>
    <Dialog.Content
        class={`result-dialog ${isDark ? "dark-dialog" : ""}`}
        showCloseButton={false}
        portalProps={{}}
    >
        <Dialog.Header class="dialog-header">
            <Dialog.Title class="dialog-title"
                >Tonight's game is...</Dialog.Title
            >
            <Dialog.Description class="dialog-description"
                >Everyone's got it. Time to play.</Dialog.Description
            >
        </Dialog.Header>

        {#if chosenGame}
            <div class="chosen-art {chosenGame.accent}">
                {#if chosenGame.image}<img
                        src={chosenGame.image}
                        alt={chosenGame.title}
                    />{:else}<span class="chosen-fallback"
                        >{chosenGame.title.slice(0, 2).toUpperCase()}</span
                    >{/if}
            </div>
            <div class="chosen-details">
                <h3>{chosenGame.title}</h3>
                <p>
                    {chosenGame.genre} · {chosenGame.players} players · {chosenGame.platform}
                </p>
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

        /*
         * IMPORTANT:
         * The page itself is the viewport.
         * Nothing on the main page should create vertical
         * overflow on desktop.
         */
        height: 100dvh;
        min-height: 0;
        overflow: hidden;

        color: var(--text);

        background:
            radial-gradient(
                circle at 50% 46%,
                var(--bg-glow),
                transparent 31rem
            ),
            var(--bg);
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

    :global(html),
    :global(body) {
        width: 100%;
        height: 100%;
        min-height: 0;
        margin: 0;
        overflow: hidden;
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

       The desktop page is now a fixed viewport layout.
       This is the most important part of the change.
       ============================================ */

    main {
        /*
         * Use the full viewport instead of allowing the
         * document to grow based on its children.
         */
        box-sizing: border-box;
        width: min(984px, calc(100% - 56px));
        height: 100%;
        min-height: 0;

        /*
         * Smaller vertical padding than before.
         * Horizontal spacing is preserved.
         */
        margin: 0 auto;
        padding: clamp(24px, 4vh, 62px) 0 clamp(18px, 3vh, 40px);

        /*
         * Make the three major sections share the available
         * screen height.
         */
        display: grid;
        grid-template-rows:
            auto
            auto
            minmax(0, 1fr);

        /*
         * Never let the children force the page taller.
         */
        overflow: hidden;
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
        min-height: 0;
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

        /*
         * Smaller on short screens.
         */
        font-size: clamp(28px, 4vw, 49px);
        line-height: 0.98;
        letter-spacing: -0.065em;
    }

    .subtitle {
        margin: 10px 0 0;

        color: var(--text-muted);
        font-size: clamp(12px, 1.1vw, 15px);
    }

    /* ============================================
       SHARED SECTION HEADING + PILL
       ============================================ */

    .section-heading {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        /*
         * Prevent a heading from consuming unexpected height.
         */
        min-height: 0;
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

       Previously this was:
           margin-top: 52px
           cards = 92px

       Those fixed heights are a major source of overflow.
       ============================================ */

    .players-section {
        min-height: 0;
        margin-top: clamp(18px, 3vh, 32px);
    }

    .data-status,
    .data-error {
        margin: 12px 0 0;

        color: var(--text-muted);
        font-size: 12px;
        text-align: center;
    }

    .data-error {
        color: #c45464;
    }

    .player-grid {
        display: grid;

        grid-template-columns: repeat(5, minmax(0, 1fr));

        gap: clamp(6px, 0.7vw, 10px);

        margin-top: clamp(10px, 1.5vh, 16px);

        /*
         * Cards are allowed to become shorter on small desktop
         * displays instead of forcing the page to grow.
         */
        min-height: 0;
    }

    .player-card {
        box-sizing: border-box;

        display: flex;
        align-items: center;

        /*
         * Responsive card height.
         * 92px was too rigid for shorter monitors.
         */
        height: clamp(60px, 8vh, 92px);

        min-width: 0;

        padding: clamp(7px, 0.7vw, 12px);

        border: 2px solid var(--border);
        border-radius: var(--radius-sm);

        color: var(--text);
        background: var(--surface);

        text-align: left;

        transition:
            border-color 0.18s ease,
            background 0.18s ease,
            color 0.18s ease;
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

    .add-player-card {
        box-sizing: border-box;

        display: flex;
        align-items: center;

        height: clamp(60px, 8vh, 92px);

        min-width: 0;

        padding: clamp(7px, 0.7vw, 12px);

        border: 2px solid #999999;
        border-radius: var(--radius-sm);

        color: #dbdbdb;
        background: #777777;

        text-align: left;

        transition:
            border-color 0.18s ease,
            background 0.18s ease,
            color 0.18s ease;
    }

    .add-player-card:hover {
        border-color: var(--border-hover);
    }

    .dark-mode .add-player-card {
        display: flex;
        align-items: center;

        height: clamp(60px, 8vh, 92px);

        min-width: 0;

        padding: clamp(7px, 0.7vw, 12px);

        border: 2px solid #b8b8b8;
        border-radius: var(--radius-sm);

        color: #b8b8b8;
        background: #292929;

        text-align: left;

        transition:
            border-color 0.18s ease,
            background 0.18s ease,
            color 0.18s ease;
    }

    .dark-mode .add-player-card:hover {
        border-color: var(--border-hover);
    }

    :global(.player-avatar) {
        flex: 0 0 auto;

        width: clamp(28px, 2.7vw, 34px);
        height: clamp(28px, 2.7vw, 34px);

        border-radius: var(--radius-sm);

        color: #fff;
    }

    :global(.player-avatar) :global([data-slot="avatar-fallback"]) {
        font-size: 10px;
        font-weight: 800;
    }

    :global(.coral) {
        background: #e68067;
    }

    :global(.blue) {
        background: #77a5ad;
    }

    :global(.gold) {
        background: #d3a64c;
    }

    :global(.green) {
        background: #c9748d;
    }

    :global(.purple) {
        background: #9587aa;
    }

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

       This is where most of the vertical overflow was
       coming from.

       Previously:
           margin-top: 75px
           bubble height: 390px
           margin top: 22px

       Now the entire results section gets the remaining
       viewport height.
       ============================================ */

    .results-section {
        /*
         * IMPORTANT:
         * Do not give this section a fixed height.
         * It receives whatever space remains after the
         * intro + players sections.
         */
        min-height: 0;

        margin-top: clamp(14px, 2vh, 26px);

        display: flex;
        flex-direction: column;

        overflow: hidden;
    }

    .bubble-stage {
        position: relative;

        display: grid;
        place-items: center;

        /*
         * Take the remaining available height.
         */
        flex: 1 1 auto;

        width: min(100%, 690px);

        /*
         * This is the key change:
         * NEVER use a fixed 390px height.
         */
        min-height: 0;
        height: auto;

        margin: clamp(8px, 1.5vh, 22px) auto 0;

        isolation: isolate;
    }

    .bubble-glow {
        position: absolute;

        /*
         * Scale with the available stage.
         */
        width: clamp(150px, 28vh, 270px);
        height: clamp(150px, 28vh, 270px);

        border-radius: 50%;

        background: var(--glow-color);

        filter: blur(24px);
    }

    .orbit {
        position: absolute;

        border: 1px dashed var(--orbit-border);
        border-radius: 50%;
    }

    .orbit-one {
        width: clamp(170px, 28vh, 270px);
        height: clamp(170px, 28vh, 270px);
    }

    .orbit-two {
        width: clamp(270px, 45vh, 435px);
        height: clamp(130px, 22vh, 210px);

        transform: rotate(-18deg);
    }

    .bubble-core {
        z-index: 3;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 3px;

        /*
         * Scale with viewport height.
         */
        width: clamp(64px, 9vh, 86px);
        height: clamp(64px, 9vh, 86px);

        border: 1px solid var(--core-border);
        border-radius: 50%;

        color: var(--core-text);
        background: var(--core-bg);

        box-shadow: 0 8px 26px rgba(91, 119, 68, 0.12);

        cursor: pointer;

        transition:
            transform 0.18s ease,
            background 0.18s ease,
            border-color 0.18s ease;
    }

    .bubble-count,
    .bubble-add {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bubble-count {
        gap: 3px;
    }

    .bubble-add {
        display: none;
    }

    .bubble-core:hover .bubble-count {
        display: none;
    }

    .bubble-core:hover .bubble-add {
        display: flex;
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

        /*
         * The orbiting objects also shrink on short displays.
         */
        width: clamp(60px, 10vh, 94px);
        height: clamp(60px, 10vh, 94px);

        border: 0;
        border-radius: 50%;

        background: transparent !important;
        box-shadow: none;

        animation: orbit var(--orbit-duration) linear infinite;
        animation-delay: var(--orbit-delay);

        transform:
            rotate(calc(var(--index) * (360deg / var(--total))))
            translateY(clamp(-125px, -16vh, -155px));
    }

    .orb-icon {
        width: 84%;
        height: 84%;

        object-fit: contain;

        filter: drop-shadow(0 4px 3px rgba(30, 40, 20, 0.15));
    }

    .orb-fallback,
    .chosen-fallback {
        color: #fff;

        font-size: 22px;
        font-weight: 850;

        letter-spacing: 0.04em;
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

    :global(.amber) {
        background: #d6a852;
    }

    :global(.tomato) {
        background: #df8062;
    }

    :global(.moss) {
        background: #718767;
    }

    :global(.sky) {
        background: #7fadb0;
    }

    :global(.navy) {
        background: #435d72;
    }

    :global(.rose) {
        background: #bc7784;
    }

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

    .no-games span {
        font-size: 25px;
    }

    .no-games strong {
        color: var(--text);
        font-size: 14px;
    }

    .no-games small {
        font-size: 11px;
    }

    .empty .no-games {
        transform: translateY(72px);
    }

    .find-button {
        display: block;

        margin: 16px auto 0;

        padding: 10px 24px;

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
        flex: 0 0 auto;

        margin: 6px 0 0;

        color: var(--text-faint);

        font-size: 12px;

        text-align: center;
    }

    /* ============================================
       RESULT DIALOG
       ============================================ */

    :global(.chosen-art) {
        display: grid;
        place-items: center;

        height: 178px;

        margin-top: 8px;

        border-radius: var(--radius-md);

        background: transparent !important;
    }

    :global(.chosen-art) img {
        max-width: 72%;
        max-height: 72%;

        object-fit: contain;

        filter: drop-shadow(0 9px 5px rgba(30, 40, 20, 0.18));
    }

    :global(.chosen-fallback) {
        font-size: 64px;
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

        color: #ffffff !important;
        background: #000000 !important;

        font-size: 13px;
        font-weight: 700;
    }

    :global(.dialog-button):hover {
        color: #ffffff !important;
        background: #1f1f1f !important;
    }

    /* ============================================
       ANIMATIONS
       ============================================ */

    @keyframes orbit {
        from {
            transform:
                rotate(calc(var(--index) * (360deg / var(--total))))
                translateY(clamp(-125px, -16vh, -155px))
                rotate(calc(var(--index) * (-360deg / var(--total))));
        }

        to {
            transform:
                rotate(
                    calc(
                        var(--index) * (360deg / var(--total) + 360deg)
                    )
                )
                translateY(clamp(-125px, -16vh, -155px))
                rotate(
                    calc(
                        var(--index) * (-360deg / var(--total) - 360deg)
                    )
                );
        }
    }

    @keyframes spin-fast {
        from {
            transform:
                rotate(0deg)
                translateY(clamp(-125px, -16vh, -155px));
        }

        to {
            transform:
                rotate(360deg)
                translateY(clamp(-125px, -16vh, -155px));
        }
    }

    @keyframes pulse {
        from {
            scale: 0.94;
        }

        to {
            scale: 1.06;
        }
    }

    /* ============================================
       FORM DIALOGS

       Dialogs are separate from the main page and are
       allowed to scroll internally if their contents are
       genuinely too large.
       ============================================ */

    .form-dialog {
        max-height: min(86vh, 720px);
        overflow-y: auto;
    }

    :global(.form-dialog),
    :global(.result-dialog) {
        --dialog-bg: #fffdf7;
        --dialog-text: #302721;
        --dialog-muted: #81756d;
        --dialog-border: #d6c7a9;
        --dialog-input-bg: #f6e9d6;
        --dialog-selected-bg: #f6e9d6;
        --dialog-selected-border: #c7b58f;
        --dialog-selected-text: #302721;

        background: var(--dialog-bg);
        color: var(--dialog-text);
    }

    :global(.form-dialog.dark-dialog),
    :global(.result-dialog.dark-dialog) {
        --dialog-bg: #332027;
        --dialog-text: #f3edef;
        --dialog-muted: #aa9ba0;
        --dialog-border: #766067;
        --dialog-input-bg: #1b1517;
        --dialog-selected-bg: #b55d78;
        --dialog-selected-border: #e398ab;
        --dialog-selected-text: #ffffff;
    }

    :global(.form-dialog input) {
        color: var(--dialog-text);

        border-color: var(--dialog-border);
        background: var(--dialog-input-bg);
    }

    :global(.form-dialog .dialog-title),
    :global(.form-dialog .dialog-description),
    :global(.result-dialog .dialog-title),
    :global(.result-dialog .dialog-description) {
        color: var(--dialog-text);
    }

    :global(.form-dialog .dialog-description),
    :global(.result-dialog .dialog-description) {
        color: var(--dialog-muted);
    }

    :global(.dark-dialog [data-slot="button"].multi-select-option) {
        color: var(--dialog-text) !important;
        border-color: var(--dialog-border) !important;
        background: var(--dialog-bg) !important;
    }

    :global(.dark-dialog [data-slot="button"].multi-select-option:hover) {
        color: var(--dialog-text) !important;
        border-color: var(--dialog-selected-border) !important;
        background: var(--dialog-input-bg) !important;
    }

    :global(
        .dark-dialog
            [data-slot="button"].multi-select-option.option-selected
    ) {
        color: var(--dialog-selected-text) !important;
        border-color: var(--dialog-selected-border) !important;
        background: var(--dialog-selected-bg) !important;
    }

    :global(.dark-dialog [data-slot="button"].multi-select-option span) {
        color: var(--dialog-muted) !important;
    }

    :global(.dark-dialog [data-slot="button"].dialog-cancel) {
        color: var(--dialog-text) !important;
        border-color: var(--dialog-border) !important;
        background: var(--dialog-bg) !important;
    }

    :global(.dark-dialog [data-slot="button"].dialog-cancel:hover) {
        background: var(--dialog-input-bg) !important;
    }

    :global(.dark-dialog [data-slot="button"].bg-secondary) {
        color: var(--dialog-text) !important;
        border: 1px solid var(--dialog-border) !important;
        background: var(--dialog-input-bg) !important;
    }

    .form-fields {
        display: grid;

        gap: 8px;

        margin-top: 18px;
    }

    .form-fields label {
        color: var(--dialog-text);

        font-size: 12px;
        font-weight: 750;
    }

    .form-fields input {
        border-radius: var(--radius-sm);
    }

    .badge-fieldset {
        display: grid;

        gap: 8px;

        min-width: 0;

        margin: 5px 0 0;
        padding: 0;

        border: 0;
    }

    .badge-fieldset legend {
        padding: 0;

        color: var(--dialog-text);

        font-size: 12px;
        font-weight: 750;
    }

    .selection-badges {
        display: flex;

        flex-wrap: wrap;

        gap: 7px;
    }

    .selection-badge {
        min-height: 34px;

        padding: 7px 11px;

        border: 1px solid var(--dialog-border);
        border-radius: 999px;

        color: var(--dialog-muted);
        background: var(--dialog-bg);

        font-size: 11px;
        font-weight: 700;

        transition:
            color 0.18s ease,
            background 0.18s ease,
            border-color 0.18s ease,
            transform 0.18s ease;
    }

    .selection-badge:hover {
        border-color: var(--dialog-selected-border);
        color: var(--dialog-text);

        transform: translateY(-1px);
    }

    .selection-badge.selected {
        border-color: var(--dialog-selected-border);

        color: var(--dialog-selected-text);
        background: var(--dialog-selected-bg);

        box-shadow: 0 2px 0 var(--dialog-selected-border);
    }

    .multi-select-list {
        display: grid;

        gap: 7px;

        max-height: 180px;

        overflow-y: auto;

        padding: 2px;
    }

    .multi-select-option {
        display: flex;

        align-items: center;
        justify-content: space-between;

        min-height: 38px;

        border-radius: var(--radius-sm);

        color: var(--dialog-text);

        border-color: var(--dialog-border);
        background: var(--dialog-bg);

        font-size: 12px;
    }

    .multi-select-option span {
        color: var(--dialog-muted);
        font-size: 10px;
        font-weight: 750;
    }

    .multi-select-option.option-selected {
        color: var(--dialog-selected-text);

        border-color: var(--dialog-selected-border);
        background: var(--dialog-selected-bg);
    }

    .multi-select-option.option-selected span {
        color: var(--dialog-muted);
    }

    .dialog-status {
        margin: 4px 0;

        color: var(--dialog-muted);

        font-size: 12px;
    }

    .dialog-error {
        margin: 14px 0 0;

        color: #c45464;

        font-size: 12px;
    }

    .dark-mode .multi-select-option {
        color: var(--text);
        border-color: var(--border);
        background: var(--surface);
    }

    /* ============================================
       DESKTOP HEIGHT ADJUSTMENTS

       These are intentionally based on HEIGHT, not
       mobile width.

       This handles:
           1080p monitors
           900p monitors
           768p laptops/desktop displays
           smaller browser windows
       ============================================ */

    @media (max-height: 850px) {
        main {
            padding-top: 28px;
            padding-bottom: 18px;
        }

        .players-section {
            margin-top: 18px;
        }

        .results-section {
            margin-top: 12px;
        }

        .player-grid {
            margin-top: 10px;
        }

        .bubble-stage {
            margin-top: 8px;
        }

        .subtitle {
            margin-top: 7px;
        }

        .eyebrow {
            margin-bottom: 8px;
        }
    }

    @media (max-height: 720px) {
        main {
            padding-top: 18px;
            padding-bottom: 12px;
        }

        .players-section {
            margin-top: 12px;
        }

        .results-section {
            margin-top: 8px;
        }

        .player-grid {
            margin-top: 7px;
            gap: 6px;
        }

        .player-card,
        .add-player-card {
            height: 56px;
            padding: 6px 8px;
        }

        .player-info {
            gap: 1px;
            margin-left: 7px;
        }

        .player-info strong {
            font-size: 11px;
        }

        .player-info small {
            font-size: 9px;
        }

        :global(.player-avatar) {
            width: 26px;
            height: 26px;
        }

        .check-circle {
            width: 15px;
            height: 15px;
        }

        .bubble-stage {
            margin-top: 4px;
        }

        .helper-text {
            font-size: 10px;
            margin-top: 3px;
        }
    }

    @media (max-height: 600px) {
        /*
         * Very short desktop browser windows.
         *
         * At this point we deliberately compress the
         * decorative elements rather than allowing the
         * document to become taller than the viewport.
         */

        main {
            padding-top: 10px;
            padding-bottom: 8px;
        }

        .eyebrow {
            margin-bottom: 4px;
            font-size: 9px;
        }

        h1 {
            font-size: 27px;
        }

        .subtitle {
            margin-top: 4px;
            font-size: 11px;
        }

        .players-section {
            margin-top: 7px;
        }

        .section-heading {
            gap: 7px;
        }

        h2 {
            font-size: 13px;
        }

        .player-grid {
            margin-top: 5px;
            gap: 4px;
        }

        .player-card,
        .add-player-card {
            height: 45px;
            padding: 4px 6px;
        }

        :global(.player-avatar) {
            width: 22px;
            height: 22px;
        }

        .player-info {
            margin-left: 5px;
        }

        .player-info strong {
            font-size: 10px;
        }

        .player-info small {
            display: none;
        }

        .check-circle {
            width: 13px;
            height: 13px;
        }

        .results-section {
            margin-top: 5px;
        }

        .bubble-stage {
            margin-top: 2px;
        }

        .orbit-one {
            width: 135px;
            height: 135px;
        }

        .orbit-two {
            width: 220px;
            height: 105px;
        }

        .bubble-glow {
            width: 135px;
            height: 135px;
        }

        .bubble-core {
            width: 55px;
            height: 55px;
        }

        .game-orb {
            width: 48px;
            height: 48px;
        }

        .orb-name {
            top: calc(100% + 3px);
            width: 80px;
            font-size: 8px;
        }

        .helper-text {
            font-size: 9px;
        }
    }
</style>
