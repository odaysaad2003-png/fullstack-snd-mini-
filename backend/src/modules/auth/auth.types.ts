export type UserRole = 'user'| 'admin';
export type UserState = 'active'|'suspenden';
export interface AuthTokenPayload {
    sub: string;
    role: UserRole;
}

export interface AuthenticatedUser{
    id :string ;
    role:UserRole;
    status: UserState;
}