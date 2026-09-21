<script>
    /**
     * CS2-style case opening carousel.
     *
     * Drop-in usage:
     *   <GameSelection items={games} onResult={(winner) => console.log(winner)} />
     *
     * `items` shape (matches your existing `games` array):
     *   { title: string, accent: string, image?: string, genre?: string, platform?: string }
     *
     * The rose ticker/glow color reads from --chosen-bg / --chosen-border if your
     * app already defines them (it does, in your app-shell tokens) and falls back
     * to a hardcoded rose if used standalone.
     */

    /** @typedef {{ title: string, platform: string, players: string, maxPlayers: number, minutes: number, genre: string, accent: string, image?: string }} GameItem */

    /** @type {{ items?: GameItem[], onResult?: (winner: GameItem) => void, isDark?: boolean }} */
    let {
        items = [],
        onResult = () => {},
        isDark = true,
    } = $props();

    // ---- Layout constants (px) — tune these to taste ----
    const ITEM_WIDTH = 150;
    const ITEM_GAP = 14;
    const SLOT = ITEM_WIDTH + ITEM_GAP;
    const REEL_LENGTH = 60; // total cards generated per spin
    const WINNER_INDEX = 52; // where the real winner is planted (leaves runway before + after)

    let isSpinning = $state(false);
    let hasSpun = $state(false);
    let winner = $state(/** @type {any} */ (null));
    let offset = $state(0);
    let spinDuration = $state(6);
    let containerWidth = $state(0);
    let reel = $state(buildIdleReel());
    let previousItemsKey = "";

    $effect(() => {
        const itemsKey = JSON.stringify(
            items.map((item) => ({
                title: item.title,
                platform: item.platform,
                genre: item.genre,
                accent: item.accent,
                image: item.image,
            })),
        );
        if (itemsKey === previousItemsKey) return;

        previousItemsKey = itemsKey;
        isSpinning = false;
        hasSpun = false;
        winner = null;
        offset = 0;
        reel = buildIdleReel();
    });

    function buildIdleReel() {
        if (!items.length) return [];
        const list = [];
        for (let i = 0; i < 24; i++) {
            const item = items[i % items.length];
            list.push({ ...item, key: `idle-${i}`, isWinner: false });
        }
        return list;
    }

    /** @param {GameItem} winningItem */
    function buildSpinReel(winningItem) {
        const list = [];
        for (let i = 0; i < REEL_LENGTH; i++) {
            if (i === WINNER_INDEX) {
                list.push({ ...winningItem, key: `win-${i}`, isWinner: true });
            } else {
                const random = items[Math.floor(Math.random() * items.length)];
                list.push({ ...random, key: `${random.title}-${i}`, isWinner: false });
            }
        }
        return list;
    }

    function spin() {
        if (isSpinning || items.length === 0) return;

        const winningItem = items[Math.floor(Math.random() * items.length)];

        // Reset instantly with no transition before the new reel paints.
        isSpinning = false;
        hasSpun = false;
        winner = null;
        offset = 0;
        reel = buildSpinReel(winningItem);

        // Double rAF: let the browser paint the reset position first,
        // then enable the transition and set the real target on the next frame.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const jitter = (Math.random() - 0.5) * (ITEM_WIDTH * 0.7);
                const targetCenter = WINNER_INDEX * SLOT + ITEM_WIDTH / 2;
                spinDuration = 5.5 + Math.random() * 1.5; // 5.5s – 7s
                isSpinning = true;
                offset = targetCenter - containerWidth / 2 + jitter;
            });
        });
    }

    /** @param {TransitionEvent} event */
    function handleTransitionEnd(event) {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
        if (!isSpinning) return;
        isSpinning = false;
        hasSpun = true;
        winner = reel[WINNER_INDEX];
        onResult(winner);
    }
</script>

<div class="cs-widget" class:dark-mode={isDark}>
    <div class="cs-header">
        <h2>Tonight's pick</h2>
        <p>{hasSpun ? "Landed on:" : "Open the case to find your game."}</p>
    </div>

    <div class="cs-viewport" bind:clientWidth={containerWidth}>
        <div class="cs-ticker"></div>

        <div
            class="cs-track"
            style={`transform: translateX(-${offset}px); transition: ${
                isSpinning ? `transform ${spinDuration}s cubic-bezier(0.16, 1, 0.3, 1)` : "none"
            };`}
            ontransitionend={handleTransitionEnd}
        >
            {#each reel as entry (entry.key)}
                <div
                    class="cs-card {entry.accent}"
                    class:landed={hasSpun && entry.isWinner}
                    style={`--w: ${ITEM_WIDTH}px`}
                >
                    {#if entry.image}
                        <img class="cs-icon" src={entry.image} alt={entry.title} />
                    {:else}
                        <span class="cs-icon">{entry.title.slice(0, 2).toUpperCase()}</span>
                    {/if}
                    <span class="cs-name">{entry.title}</span>
                </div>
            {/each}
        </div>

        <div class="cs-edge cs-edge-left"></div>
        <div class="cs-edge cs-edge-right"></div>
    </div>

    {#if hasSpun && winner}
        <div class="cs-result">
            <strong>{winner.title}</strong>
            <span>{winner.genre} · {winner.platform}</span>
        </div>
    {/if}

    <button type="button" class="cs-button" disabled={isSpinning} onclick={spin}>
        {isSpinning ? "Finding..." : hasSpun ? "Find a game" : "Find a game"}
    </button>
</div>

<style>
    .cs-widget {
        --gs-rose: var(--chosen-bg, #b55d78);
        --gs-rose-bright: var(--chosen-border, #e398ab);
        --gs-header: #302721;
        --gs-muted: #81756d;
        --gs-viewport-start: #fffdf7;
        --gs-viewport-end: #f4e7cb;
        --gs-viewport-border: rgba(48, 39, 33, 0.12);
        --gs-viewport-shadow: rgba(91, 70, 55, 0.2);
        --gs-card-border: rgba(48, 39, 33, 0.12);
        --gs-card-bg: rgba(255, 255, 255, 0.45);
        --gs-card-landed-bg: rgba(255, 255, 255, 0.7);
        --gs-name: #4c4038;
        --gs-icon-shadow: rgba(30, 40, 20, 0.18);
        --gs-edge: #fffdf7;
        --gs-button-text: #fff;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: min(100%, 720px);
        margin: 0 auto;
    }
    .cs-widget.dark-mode {
        --gs-header: #f3edef;
        --gs-muted: #aa9ba0;
        --gs-viewport-start: #151013;
        --gs-viewport-end: #1c1418;
        --gs-viewport-border: rgba(255, 255, 255, 0.06);
        --gs-viewport-shadow: rgba(0, 0, 0, 0.35);
        --gs-card-border: rgba(255, 255, 255, 0.08);
        --gs-card-bg: rgba(255, 255, 255, 0.04);
        --gs-card-landed-bg: rgba(255, 255, 255, 0.07);
        --gs-name: #e7dfe2;
        --gs-icon-shadow: rgba(0, 0, 0, 0.4);
        --gs-edge: #151013;
    }

    .cs-header {
        text-align: center;
    }
    .cs-header h2 {
        margin: 0;
        color: var(--gs-header);
        font-size: 16px;
        letter-spacing: -0.02em;
    }
    .cs-header p {
        margin: 6px 0 0;
        color: var(--gs-muted);
        font-size: 12px;
    }

    .cs-viewport {
        position: relative;
        width: 100%;
        height: 148px;
        overflow: hidden;
        border-radius: 0.6rem;
        background: linear-gradient(180deg, var(--gs-viewport-start), var(--gs-viewport-end));
        box-shadow:
            inset 0 0 0 1px var(--gs-viewport-border),
            0 20px 40px var(--gs-viewport-shadow);
    }

    .cs-ticker {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 5;
        width: 3px;
        height: 100%;
        transform: translateX(-50%);
        background: var(--gs-rose-bright);
        box-shadow: 0 0 14px 2px var(--gs-rose-bright);
    }

    .cs-track {
        display: flex;
        align-items: center;
        gap: 14px;
        height: 100%;
        padding: 0 4px;
        will-change: transform;
    }

    .cs-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex: 0 0 var(--w);
        width: var(--w);
        height: 120px;
        border: 2px solid var(--gs-card-border);
        border-radius: 0.5rem;
        background: var(--gs-card-bg);
        transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
    }
    .cs-card.landed {
        border-color: var(--gs-rose-bright);
        background: var(--gs-card-landed-bg);
        box-shadow: 0 0 24px 2px color-mix(in srgb, var(--gs-rose-bright) 55%, transparent);
        transform: scale(1.04);
    }

    .cs-icon {
        width: 50px;
        height: 50px;
        object-fit: contain;
        font-size: 34px;
        filter: drop-shadow(0 4px 3px var(--gs-icon-shadow));
    }
    .cs-name {
        max-width: 90%;
        color: var(--gs-name);
        font-size: 10px;
        font-weight: 700;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    /* Per-genre accent tints, matching your existing game-card accents */
    .amber { background: rgba(214, 168, 82, 0.16); }
    .tomato { background: rgba(223, 128, 98, 0.16); }
    .moss { background: rgba(113, 135, 103, 0.16); }
    .sky { background: rgba(127, 173, 176, 0.16); }
    .navy { background: rgba(67, 93, 114, 0.16); }
    .rose { background: rgba(188, 119, 132, 0.16); }

    .cs-edge {
        position: absolute;
        top: 0;
        z-index: 4;
        width: 64px;
        height: 100%;
        pointer-events: none;
    }
    .cs-edge-left {
        left: 0;
        background: linear-gradient(90deg, var(--gs-edge), transparent);
    }
    .cs-edge-right {
        right: 0;
        background: linear-gradient(270deg, var(--gs-edge), transparent);
    }

    .cs-result {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        animation: cs-fade-in 0.3s ease both;
    }
    .cs-result strong {
        color: var(--gs-header);
        font-size: 18px;
        letter-spacing: -0.02em;
    }
    .cs-result span {
        color: var(--gs-muted);
        font-size: 12px;
    }

    .cs-button {
        padding: 12px 28px;
        border: 0;
        border-radius: 0.25rem;
        color: #fff;
        background: var(--gs-rose);
        box-shadow: 0 4px 0 color-mix(in srgb, var(--gs-rose) 60%, black);
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
    }
    .cs-button:hover:not(:disabled) {
        background: var(--gs-rose-bright);
    }
    .cs-button:disabled {
        cursor: default;
        opacity: 0.75;
    }

    @keyframes cs-fade-in {
        from {
            opacity: 0;
            transform: translateY(4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>