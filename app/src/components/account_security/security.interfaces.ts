export interface IAuthentication {
    Email: string;
    Password: string;
}

export class FormicReference {
    constructor(isDirtyFunc?: (isDirty: boolean) => void) {
        this.formik = null;
        this.isDirtyFunc = isDirtyFunc;
    }

    formik: any;
    isDirtyFunc?: (isDirty: boolean) => void;
}