export class API {
    public static readonly SERVER_URL = 'http://78.152.175.67:15017/'

    public static readonly API_PART = 'api/v1/'

    public static readonly UserIdentityEndPoints = {
        SIGN_IN: API.API_PART + 'identity/signin',
        REFRESH_TOKEN: API.API_PART + 'authentification/token/refresh',
        GET_ALL_USERS: API.API_PART + 'identity/users/all?',
        NEW_USER_PROFILE: API.API_PART + 'identity/profile/new',
        GET_ALL_ROLES: API.API_PART + 'identity/roles/all',

        //NEW_USER_PROFILE: API.API_PART + 'identity/profile/new',
        //GET_USER_PROFILE: API.API_PART + 'identity/profile/get',
        //GET_USER_PROFILES_BY_COMPANY_ID: API.API_PART + 'identity/profile/get/company?companyId=',
        //GET_USER_PROFILE_BY_USER_NET_ID: API.API_PART + 'identity/profile/get/user?userNetId=',
        //GET_ALL_ROLES: API.API_PART + 'identity/roles/all',
        //UPDATE_USER_PROFILE: API.API_PART + 'identity/profile/update',
        //CHANGE_PASSWORD: API.API_PART + 'identity/change/password',
        //REFRESH_TOKEN: API.API_PART + 'identity/refresh/token'
    }


    //public static readonly CompanyEndpoints: any = {
    //    GET_ALL_COMPANIES: API.API_PART + 'company/get/all',
    //    GET_COMPANY_BY_ID: API.API_PART + 'company/get/company?companyNetId=',
    //    GET_USER_IN_COMPANY: API.API_PART + 'company/get/in/user',
    //    NEW_COMPANY: API.API_PART + 'company/new',
    //    UPDATE_COMPANY: API.API_PART + 'company/update',
    //}

    //public static readonly ProjectEndpoints: any = {
    //    GET_ALL_PROJECTS: API.API_PART + 'project/get/all',
    //    GET_PROJECT_BY_ID: API.API_PART + 'project/get?netId=',
    //    GET_BUILDING_TYPES: API.API_PART + 'project/get/building/types',
    //    GET_CONTRACTOR_TYPES: API.API_PART + 'project/get/contractor/types',
    //    NEW_PROJECT: API.API_PART + 'project/new',
    //    GET_PROJECT_BY_COMPANY_ID: API.API_PART + 'project/get/company/id?netId=',
    //    GET_PROJECTS_BY_USER_NET_ID: API.API_PART + 'project/get/user/id?netId=',
    //    UPDATE_PROJECT: API.API_PART + 'project/update',
    //}

    //public static readonly TaskEndpoints: any = {
    //    GET_ALL_TASKS: API.API_PART + 'task/get/all',
    //    GET_TASK_SUB_TASKS: API.API_PART + 'task/get/subtasks',
    //    GET_ALL_TASKS_USER_ID_PROJECT_ID: API.API_PART + 'task/get/all',
    //    GET_ALL_GANTT_TASKS_USER_ID_PROJECT_ID: API.API_PART + 'task/get/all/gantt',
    //    GET_ALL_TASKS_GANTT_TEMPLATE: API.API_PART + 'task/get/all/gantt',
    //    GET_TASK_FILES_BY_TASK_ID: API.API_PART + 'task/get/files',
    //    GET_TASK_STATUSES: API.API_PART + 'task/get/statuses',
    //    GET_TASK_LINKED: API.API_PART + 'task/get/linked',
    //    GET_TASK_COMMENTS: API.API_PART + 'task/get/comments',
    //    UPDATE_COMMENT: API.API_PART + 'task/update/comment',
    //    GET_USERS_IN_TASKS: API.API_PART + 'task/get/users?projectNetId=',
    //    SEARCH_TASKS_BY_PROJECT_ID: API.API_PART + 'task/get/search',
    //    GET_TASK_BY_NET_ID: API.API_PART + 'task/get',
    //    GET_CHILDREN_TASK_BY_NET_ID: API.API_PART + 'task/get/children/gantt?netId=',
    //    GET_TASK_BY_ID: API.API_PART + 'task/get/id',
    //    NEW_TASK: API.API_PART + 'task/new',
    //    NEW_TASK_LINKER: API.API_PART + 'task/new/linker',
    //    NEW_TASK_COMMENT: API.API_PART + 'task/new/task/comment',
    //    GET_ALL_TASKS_BY_USER_NET_ID_PROJECT_NET_ID: API.API_PART + 'task/get/all/project/user?projectNetId=',
    //    GET_ALL_TASKS_BY_USER_NETID: API.API_PART + 'task/get/all/user?userNetId=',
    //    GET_APPROVED_TASKS: API.API_PART + 'task/get/all/approved?offset=',
    //    GET_UNAPPROVED_TASKS: API.API_PART + 'task/get/all/unapproved',
    //    UPDATE_TASK: API.API_PART + 'task/update',
    //    APPROVE_TASK_STATUS_CHANGES: API.API_PART + 'task/approve?requestNetId=',
    //    UNLINK_TASK: API.API_PART + 'task/unlink?linkerNetUId=',
    //    CHANGE_ORDER_NUMBER_TASK: API.API_PART + 'task/update/orders',
    //}
}

export default API;
