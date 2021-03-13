import { IdentityRoles } from "../entities/IdentityRoles";

export const GetIdentityRoleName = (value: IdentityRoles) => {
    switch (value) {
        case IdentityRoles.Admin:
            return 'Admin';
        case IdentityRoles.Operator:
            return 'Operator';
        case IdentityRoles.User:
            return 'User';
    }
}

export const GetIdentityRole = (role: string) => {
    
    if (role === ("Admin" as string))
        return IdentityRoles.Admin;
    if (role === ("Operator" as string))
        return IdentityRoles.Operator;
    if (role === ("User" as string))
        return IdentityRoles.User;
}

export const AllRolesExcept = (roles: IdentityRoles[]) => [
    IdentityRoles.Admin,
    IdentityRoles.Operator,
    IdentityRoles.User,
].filter((item) => roles.indexOf(item) === -1);