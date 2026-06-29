export type UserRole = 'user'| 'admin';
export type UserStatus = "active" | "suspended";
export interface AuthTokenPayload {
    sub: string;
    role: UserRole;
}

export interface AuthenticatedUser {
    id: string;
    role: UserRole;
    status: UserStatus;
}