<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.jpg';
	import { Moon, Sun } from '@lucide/svelte';
	import { page } from '$app/state';
	import { onMount, setContext } from 'svelte';

	let { children } = $props();
	let isDark = $state(true);

	setContext('theme', {
		get isDark() {
			return isDark;
		},
		toggle() {
			isDark = !isDark;
		}
	});

	onMount(() => {
		const savedTheme = localStorage.getItem('what-2-play-theme');
		isDark = savedTheme
			? savedTheme === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	$effect(() => {
		if (typeof document === 'undefined') return;

		document.documentElement.classList.toggle('dark', isDark);
		document.body.classList.toggle('dark', isDark);
		localStorage.setItem('what-2-play-theme', isDark ? 'dark' : 'light');
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="site-layout" class:dark-mode={isDark}>
	<nav class="site-nav" aria-label="Primary navigation">
		<div class="site-nav-links">
			<a href="/" class:active={page.url.pathname === '/'}>Home</a>
			<a href="/library" class:active={page.url.pathname === '/library'}>Library</a>
		</div>
		<button
			class="theme-toggle"
			type="button"
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			onclick={() => {
				isDark = !isDark;
			}}
		>
			{#if isDark}<Sun size={16} />{:else}<Moon size={16} />{/if}
		</button>
	</nav>
	<div class="site-content">
		{@render children()}
	</div>
</div>
