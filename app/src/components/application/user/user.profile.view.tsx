import React, { useEffect } from "react"
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../reducers/application.state";
import { UserProfile } from "../../../entities/UserProfile";
import { userManagementActions } from "../../../reducers/user.management.slice";
import { Button, Tabs } from "antd";
import { useParams } from "react-router";
import { List } from 'linq-typescript';
import * as Antd from "antd";
import { GetIdentityRole } from "../../../helpers/role.helper";
import { IdentityRoles } from "../../../entities/IdentityRoles";

export const UserProfileView: React.FC = () => {
    const dispatch = useDispatch();

    const { TabPane } = Tabs;

    const uriParams: { id } = useParams();
    const userProfileId: string = uriParams.id;

    const roles = useSelector<IApplicationState, any[]>(state => state.userManagement.userRoles)
    const selectedRole = useSelector<IApplicationState, string>(state => state.userManagement.selectedRole)
    const selectedUser = useSelector<IApplicationState, UserProfile>(state => state.userManagement.selectedUserProfile)
    const authenticationUser = useSelector<IApplicationState, any>((state) => state.authentication)
    console.log(authenticationUser);

    useEffect(() => {

        if (userProfileId) {
            dispatch(userManagementActions.apiGetUserProfileByNetId(userProfileId))
        } else if (!userProfileId) {

        }

        return () => {
            dispatch(userManagementActions.resetUserManagementStore());
        }
    }, [])

    useEffect(() => {
        if (roles.length > 0 && !selectedRole && !userProfileId) {
            // dispatch(userManagementActions.setRole(roles[0]))
        } else if (roles.length === 0) {
            dispatch(userManagementActions.apiGetRoles())
        }

    }, [roles])

    const getIdentityRoleModel = (identityRole: string) => {
        const v = new List<any>(roles)
            .firstOrDefault((x: any) => x.Value === Number.parseInt(identityRole));
        return v;
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .required('Required'),
    });

    const validationSchemaChangePassword = Yup.object().shape({
        userConfirmPassword: Yup.string()
            .required('Required'),
        userPassword: Yup.string()
            .required('Required'),
    });

    const initialValues = () => {
        debugger
        if (selectedUser.Id > 0 && userProfileId) {
            return {
                name: selectedUser.UserName,
                role: selectedUser.IdentityRole,
                email: selectedUser.Email,
                city: selectedUser.City ? selectedUser.City : '',
            }
        } else {
            return {
                name: '',
                role: selectedUser.IdentityRole,
                email: '',
                city: '',
                password: ''
            }
        }
    }

    return (
        <div className="component__UserNew__VIEW">
            <div className="view__CONTROLS">
                <div className="controls__WRAPPER">
                    <div className="controls__LEFT">
                        <h2 className="page__TITLE">{selectedUser.Id && userProfileId ? 'Edit User' : 'Create User'}</h2>
                    </div>
                </div>

            </div>

            <div className="view__CONTENT">
                <Tabs className="tabs__EditTask__COMPONENT">
                    <TabPane tab="Profile" key="1" className="showTab__ITEM">
                        <div className="mess_CONTROL">
                            <div className="user_profile__COMPONENT">
                                <Formik
                                    validationSchema={validationSchema}
                                    initialValues={initialValues()}
                                    enableReinitialize
                                    onSubmit={(values) => {
                                        let roleDescription = getIdentityRoleModel(values.role.toString());

                                        if (
                                            selectedUser.Id > 0 && userProfileId &&
                                            (GetIdentityRole(authenticationUser.role) === IdentityRoles.Administrator) ||
                                            GetIdentityRole(authenticationUser.role) === IdentityRoles.Operator
                                        ) {
                                            const data: any = {
                                                ...selectedUser,
                                                Email: values.email,
                                                UserName: values.name,
                                                DisplayName: values.name,
                                                IdentityRole: roleDescription.Value,
                                                RoleDescription: roleDescription.Description,
                                                City: values.city
                                            }
                                            debugger
                                            dispatch(userManagementActions.apiUpdateUser(data))
                                        } else if ((GetIdentityRole(authenticationUser.role) === IdentityRoles.Administrator)) {
                                            const data: any = {
                                                ...selectedUser,
                                                Email: values.email,
                                                UserName: values.name,
                                                DisplayName: values.name,
                                                IdentityRole: roleDescription.Value,
                                                RoleDescription: roleDescription.Description,
                                                City: values.city,
                                                Password: values.password
                                            }
                                            debugger
                                            dispatch(userManagementActions.apiNewUser(data))
                                        }
                                    }}>
                                    {(formik) => {
                                        return (
                                            <Form>
                                                <div className="input__CONTROL full_w">
                                                    <label className="rowGroup__TITLE">Name</label>
                                                    <Field
                                                        name="name"
                                                        type="text"
                                                        spellCheck="false"
                                                        className="ant-input"
                                                        autoComplete="off"
                                                    />
                                                    {formik.errors.name && formik.touched.name ? (<div>{formik.errors.name}</div>) : null}
                                                    <div className="required_field">*</div>
                                                </div>

                                                <div className="input__CONTROL full_w">
                                                    <label className="rowGroup__TITLE">Role</label>
                                                    <Field
                                                        className="ant-input"
                                                        as="select"
                                                        name="role"

                                                        onChange={(field) => {
                                                            let currentTargetValue = field.currentTarget.value;
                                                            formik.setFieldValue('role', currentTargetValue);
                                                            formik.setFieldTouched('role');


                                                            dispatch(userManagementActions.setRole(getIdentityRoleModel(currentTargetValue)))
                                                        }}>
                                                        {
                                                            roles.length > 0 && roles.map((role, v) =>
                                                                <option key={v} value={role.Value}>{role.Description}</option>
                                                            )
                                                        }
                                                    </Field>

                                                </div>

                                                <div className="input__CONTROL full_w">
                                                    <label className="rowGroup__TITLE">Email</label>
                                                    <Field
                                                        name="email"
                                                        type="text"
                                                        spellCheck="false"
                                                        className="ant-input"
                                                        autoComplete="off"
                                                    />
                                                    <div className="required_field">*</div>
                                                </div>

                                                <div className="input__CONTROL full_w">
                                                    <label className="rowGroup__TITLE">City</label>
                                                    <Field
                                                        name="city"
                                                        type="text"
                                                        spellCheck="false"
                                                        className="ant-input"
                                                        autoComplete="off"
                                                    />
                                                    <div className="required_field">*</div>
                                                </div>

                                                {

                                                    selectedUser.Id === 0 ?
                                                        <div className="input__CONTROL full_w">
                                                            <label className="rowGroup__TITLE">Password</label>
                                                            <Field
                                                                name="password"
                                                                type="password"
                                                                spellCheck="false"
                                                                className="ant-input"
                                                                autoComplete="off"
                                                            />
                                                            {formik.errors.password && formik.touched.password ? (<div>{formik.errors.password}</div>) : null}
                                                            <div className="required_field">*</div>
                                                        </div> : null
                                                }

                                                <Button type={'primary'} htmlType={"submit"} className="button__SUBMIT">
                                                    {selectedUser.Id > 0 ? "Update" : "Create"}
                                                </Button>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </TabPane>
                    {selectedUser.Id &&
                        <TabPane tab="Change password" key="2" className="showTab__ITEM">
                            <div className="user_profile__COMPONENT">
                                <Formik
                                    enableReinitialize={true}
                                    validationSchema={validationSchemaChangePassword}
                                    initialValues={{
                                        userPassword: '',
                                        userConfirmPassword: ''
                                    }}
                                    onSubmit={(values) => {
                                        const data: any = {
                                            newPassword: values.userConfirmPassword,
                                            userNetId: userProfileId
                                        }

                                        dispatch(userManagementActions.apiChangeUserPassword(data))

                                    }}>
                                    {(formik) => (
                                        <Form>
                                            <div className="input__CONTROL full_w">
                                                <label className="rowGroup__TITLE">Password</label>
                                                <Field
                                                    name="userPassword"
                                                    type="password"
                                                    spellCheck="false"
                                                    className="ant-input"
                                                    autoComplete="off"
                                                />
                                                {formik.errors.userPassword && formik.touched.userPassword ? (<div>{formik.errors.userPassword}</div>) : null}
                                                <div className="required_field">*</div>
                                            </div>

                                            <div className="input__CONTROL full_w">
                                                <label className="rowGroup__TITLE">Confirm password</label>
                                                <Field
                                                    name="userConfirmPassword"
                                                    type="password"
                                                    spellCheck="false"
                                                    className="ant-input"
                                                    autoComplete="off"
                                                />
                                                {formik.errors.userPassword && formik.touched.userPassword ? (<div>{formik.errors.userPassword}</div>) : null}
                                                <div className="required_field">*</div>
                                            </div>
                                            {selectedUser.Id &&
                                                <div className="row_container">
                                                    <div className="pull__RIGHT">
                                                        <Antd.Button type={'primary'} htmlType={"submit"}>
                                                            Change
                                                    </Antd.Button>
                                                    </div>
                                                </div>
                                            }
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </TabPane>
                    }
                </Tabs>
            </div>
        </div>
    )
} 