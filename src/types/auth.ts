export type AuthState = {
    idToken: string
};

export type AuthRequest = {
    email: string;
    password: string;
    returnSecureToken: boolean;
};

export type AuthResponse = {
    idToken: string;
    refreshToken: string;
    expiresIn: number;
};

export type RefreshResponse = {
    id_token: string;
    refresh_token: string;
    expires_in: number;
};

