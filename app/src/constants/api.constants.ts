export class API {
    public static readonly SERVER_URL = 'http://78.152.175.67:15017/'
    //public static readonly SERVER_URL = ' http://localhost:5000/'

    public static readonly API_PART = 'api/v1/'

    public static readonly GAME_HUB = 'hub/games';

    public static readonly UserIdentityEndPoints = {
        SIGN_IN: API.API_PART + 'identity/signin',
        REFRESH_TOKEN: API.API_PART + 'authentification/token/refresh',
        GET_ALL_USERS: API.API_PART + 'identity/users/all?',
        NEW_USER_PROFILE: API.API_PART + 'identity/profile/new',
        GET_ALL_ROLES: API.API_PART + 'identity/roles/all',
        GET_USER_PROFILE_BY_USER_NET_ID: API.API_PART + 'identity/profile/get/user?userNetId=',
        UPDATE_USER_PROFILE: API.API_PART + 'identity/profile/update',
        CHANGE_PASSWORD: API.API_PART + 'identity/change/password',
    }
}

export default API;
