const API_BASE_URL = "http://localhost:8000";

export type User = {
    full_name: string;
    initials: string;
    game_count: number;
};

export type Game = {
    game_name: string;
    player_limit: number;
    genre: string;
    platform: string;
};

export type UserCreate = {
    full_name: string;
};

export type GameCreate = {
    game_name: string;
    player_limit: number;
    genre: string;
    platform: string;
};

export type OwnershipResponse = {
    message: string;
};

export async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(await getErrorMessage(response));
    return response.json() as Promise<T>;
}

export async function post<TResponse, TBody = unknown>(endpoint: string, body?: TBody): Promise<TResponse> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: body === undefined ? undefined : { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) throw new Error(await getErrorMessage(response));
    if (response.status === 204) return undefined as TResponse;
    return response.json() as Promise<TResponse>;
}

export const getUsers = () => get<User[]>("/users");
export const getUserGames = (fullName: string) =>
    get<Game[]>(`/users/${encodeURIComponent(fullName)}/games`);
export const createUser = (user: UserCreate) => post<User, UserCreate>("/users", user);
export const getGames = () => get<Game[]>("/games");
export const createGame = (game: GameCreate) => post<Game, GameCreate>("/games", game);
export const addOwnedGame = (fullName: string, gameName: string) =>
    post<OwnershipResponse>(`/users/${encodeURIComponent(fullName)}/games/${encodeURIComponent(gameName)}`);

async function getErrorMessage(response: Response): Promise<string> {
    try {
        const payload = (await response.json()) as { detail?: string };
        return payload.detail ?? `Request failed with status ${response.status}`;
    } catch {
        return `Request failed with status ${response.status}`;
    }
}
