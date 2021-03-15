import { IdentityRoles } from "../entities/IdentityRoles";

export const GetIdentityRoleName = (value: IdentityRoles) => {
    switch (value) {
        case IdentityRoles.Administrator:
            return 'Administrator';
        case IdentityRoles.Operator:
            return 'Operator';
        case IdentityRoles.User:
            return 'User';
    }
}

export const GetIdentityRole = (role: string) => {
    
    if (role === ("Administrator" as string))
        return IdentityRoles.Administrator;
    if (role === ("Operator" as string))
        return IdentityRoles.Operator;
    if (role === ("User" as string))
        return IdentityRoles.User;
}

export const AllRolesExcept = (roles: IdentityRoles[]) => [
    IdentityRoles.Administrator,
    IdentityRoles.Operator,
    IdentityRoles.User,
].filter((item) => roles.indexOf(item) === -1);