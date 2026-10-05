import { QueryClient } from '@tanstack/svelte-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			gcTime: 5 * 60_000,
			refetchOnWindowFocus: false
		}
	}
});

export const queryKeys = {
	users: ['users'],
	games: ['games'],
	userGames: (fullName) => ['users', fullName, 'games']
};
