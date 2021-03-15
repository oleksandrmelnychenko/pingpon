import React, { useEffect } from "react"
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../../../reducers/application.state";
import { UserProfile } from "../../../entities/UserProfile";
import { userManagementActions } from "../../../reducers/user.management.slice";
import { Button } from "antd";
import { useParams } from "react-router";
import { List } from 'linq-typescript';

export const UserProfileView: React.FC = () => {
    const dispatch = useDispatch();

    const uriParams: { id } = useParams();
    const userProfileId: string = uriParams.id;

    const roles = useSelector<IApplicationState, any[]>(state => state.userManagement.userRoles)
    const selectedRole = useSelector<IApplicationState, string>(state => state.userManagement.selectedRole)
    const selectedUser = useSelector<IApplicationState, UserProfile>(state => state.userManagement.selectedUserProfile)

    useEffect(() => {

        if (userProfileId) {
            // dispatch(userManagementActions.apiGetUserProfileByNetId(userProfileId))
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
    });

    return (
        <div style={{ padding: 20 }}>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    name: selectedUser.UserName,
                    role: selectedUser.IdentityRole,
                    email: selectedUser.Email,
                    password: ''
                }}
                enableReinitialize
                onSubmit={(values) => {
                    const data: any = {
                        Password: values.password,
                        Email: values.email,
                        Name: values.name,
                        Role: values.role,
                    }

                    dispatch(userManagementActions.apiUpdateUser(data))
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
                                <label className="rowGroup__TITLE">email</label>
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
                                <label className="rowGroup__TITLE">password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    spellCheck="false"
                                    className="ant-input"
                                    autoComplete="off"
                                />
                                <div className="required_field">*</div>
                            </div>

                            <Button type={'primary'} htmlType={"submit"} className="button__SUBMIT">
                                Edit
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
} 