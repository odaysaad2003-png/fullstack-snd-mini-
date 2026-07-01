export type SafeUser = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    status: string;
    createdAt: Date;
};

type UserPresenterInput = {
    id?: string;
    _id?: unknown;
    name: string;
    email: string;
    phone?: string | null;
    role: string;
    status: string;
    createdAt: Date;
};

function getUserId(user: UserPresenterInput): string {
    if (user.id) {
        return user.id;
    }

    if (user._id && typeof user._id === "object" && "toString" in user._id) {
        return user._id.toString();
    }

    return String(user._id);
}

export function toSafeUser(user: UserPresenterInput): SafeUser {
    const safeUser: SafeUser = {
        _id: getUserId(user),
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
    };

    if (user.phone !== undefined && user.phone !== null) {
        safeUser.phone = user.phone;
    }

    return safeUser;
}
