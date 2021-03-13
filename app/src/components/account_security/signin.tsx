import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { FormicReference, IAuthentication } from "./security.interfaces";
import { authenticationActions } from "../../reducers/authentication.slice";
import * as Yup from 'yup'
import { IApplicationState } from "../../reducers/application.state";
import { Button } from "antd";

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();

    const fetching = useSelector<IApplicationState, any>((state) => state.authentication.fetching)

    useEffect(() => {
        document.onkeydown = (event) => {
            if ((event as any).keyCode === 13) {
                event.preventDefault()
                formikReference.formik.submitForm()
            }
        }

        return () => {
            document.onkeydown = null
        }
    })

    const [formikReference] = useState<FormicReference>(
        new FormicReference(() => { })
    )

    const errorMessage = useSelector<IApplicationState, string>(
        (state) => state.authentication.message
    )

    const isErrorMessage = useSelector<IApplicationState, boolean>(
        (state) => state.authentication.isErrorMessage
    )

    const [isActiveForm, setIsActiveForm] = useState(false)

    useEffect(() => {
        if (errorMessage) {
            setIsActiveForm(false)
        }
    }, [errorMessage])

    const SignInSchema = Yup.object().shape({
        email: Yup.string()
            .email(() => 'Email incorrect')
            .required(() => 'Email Required'),
        password: Yup.string()
            .min(8, () => 'Password must contain at least 8 characters')
            .required(() => 'Password Required'),
    })

    const handleClearErrorMessages = () =>
        errorMessage && dispatch(authenticationActions.clearMessage())

    return (
        <div className="component__SignIn_VIEW">
            <div className="view__WRAPPER">
                <h1 className="">
                    Ping Pong
                </h1>

                <Formik
                    initialValues={{
                        email: 'admin@gmail.com',
                        password: 'AdminPassword'
                    }}
                    innerRef={(formik: any) => {
                        formikReference.formik = formik
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={(values) => {

                        handleClearErrorMessages()
                        const data: IAuthentication = {
                            Email: values.email,
                            Password: values.password
                        }
                        dispatch(authenticationActions.api_requestToken(data))
                    }}
                >
                    {(formik) => (
                        <Form className="view__CONTENT">
                            <h2>Log in to your account</h2>

                            <div className="input__CONTROL full_w" style={{ marginBottom: 20 }}>
                                <label className="input__TITLE">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    spellCheck="false"
                                    className="ant-input ant-input-lg"
                                    autoComplete="off"
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <span className="form_valMessage">
                                        {formik.errors.email}
                                    </span>
                                ) : null}

                            </div>

                            <div className="input__CONTROL full_w" style={{ marginBottom: 20 }}>
                                <label className="input__TITLE">Password</label>

                                <Field
                                    name="password"
                                    type="password"
                                    spellCheck="false"
                                    className="ant-input ant-input-lg"
                                    autoComplete="new-password"

                                />
                                {formik.errors.password && formik.touched.password ? (
                                    <span className="form_valMessage">
                                        {formik.errors.password}
                                    </span>
                                ) : null}
                            </div>


                            <div className="button__CONTAINER">
                                <Button loading={fetching} size={"large"} type="primary" htmlType="submit" className="signin__button">
                                    Sign In
                                </Button>

                                {errorMessage && (
                                    <div className={`form_SubmitMessage ${isErrorMessage ? '' : 'success'}`}>
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignIn;