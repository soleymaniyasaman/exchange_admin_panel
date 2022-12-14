import React from 'react';

import "./style.css";

import { Field, Formik, Form } from "formik";

import axios from "axios";

import { Button, CircularProgress } from "@material-ui/core";

import { AUTH_REFRESH, AUTH_LOGIN } from "../../utils/constants";

// import { useFetchApi } from '../../utils/hooks';

import { RefreshToken, removeToken, setToken } from '../../utils/utils';

import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/provider';





function Login(props) {



    const contextData = React.useContext(UserContext);



    const history = useHistory();



    const [loginLoading, setLoginLoading] = React.useState(false);

    const [refreshLoading, setRefreshLoading] = React.useState(true);

    const [hasError, setHasError] = React.useState('')



    const setUserToken = (values) => {

        setToken(values)

        contextData.setIsLoggedIn(true)

        setTimeout(() => history.push('/users'), 1000)

    }



    const checkUserRefreshToken = (refreshToken) => {

        let payload = { token: refreshToken }

        axios.post(AUTH_REFRESH, payload)

            .then(res => res.data)

            .then(result => {

                if (result.status_code === 200) {

                    setUserToken(result.result)

                }

            })

            .catch(err => {

                console.log(err)

                setRefreshLoading(false)

                removeToken()

                contextData.setIsLoggedIn(false)

            })

    }



    React.useEffect(() => {

        let refreshToken = RefreshToken();

        if (refreshToken) {

            checkUserRefreshToken(refreshToken)

        } else {

            setRefreshLoading(false)

        }

    }, [])



    const handleSubmit = (values) => {

        setHasError('')

        let payload = {

            ...values,

            user_agent: window.navigator.userAgent,

            client_host: "local"

        }

        setLoginLoading(true)

        axios.post(AUTH_LOGIN, payload)

            .then(res => res.data)

            .then(result => {

                // if (result.status_code === 200) {

                setUserToken(result.result)

                setLoginLoading(false)

                // }

            })

            .catch(err => {

                setLoginLoading(false)

                if (err?.response?.data?.code === 404) {

                    setHasError('کاربری با این مشخصات پیدا نشد')

                } else {

                    setHasError('خطایی رخ داده است')

                }

                console.log(err)

            })

    }



    return (

        <>

            <div className="container-fluid">

                <div className="row justify-content-center mt-5 pt-5">

                    <div className="col-md-6 text-center text-success mt-5 ">

                        COMPANY LOGO

                    </div>

                </div>

                <div className="row justify-content-center mt-1 py-5">

                    <div className="col-md-6 text-center login-card p-0">

                        <div className="login-header text-bold text-right">

                            ورود به پنل ادمین

                        </div>

                        <div className="pt-3 pb-5 mx-auto">

                            {

                                refreshLoading ? (

                                    <div className="d-flex my-5 py-4 flex-column justify-content-between align-items-center" >

                                        <CircularProgress />

                                        <span className="mt-4 text-white">...در حال اعتبار سنجی</span>

                                    </div>

                                ) : (

                                    <Formik

                                        initialValues={{ input: '', password: '' }}

                                        enableReinitialize={true}

                                        // validate={this.validate}

                                        onSubmit={handleSubmit}

                                    >

                                        <Form>

                                            <div className="text-bold font-gray-color px-5">

                                                <div className="mt-3 d-flex flex-column">

                                                    <label className="text-end text-white" htmlFor="input">نام کاربری</label>

                                                    <Field

                                                        type="text"

                                                        name="input"

                                                        placeholder=""

                                                        required

                                                        className="form-control bg_input input_text"

                                                        style={{ borderRadius: "15px" }}

                                                    />

                                                </div>

                                                <div className="mt-3 mb-2 d-flex flex-column">

                                                    <label className="text-end text-white" htmlFor="password">رمزعبور</label>

                                                    <Field

                                                        type="password"

                                                        name="password"

                                                        required

                                                        placeholder=""

                                                        className="form-control bg_input input_text"

                                                        style={{ borderRadius: "15px" }}

                                                    />

                                                </div>

                                                {Boolean(hasError) && <p className="text-danger">{hasError}</p>}

                                                <div className="mt-4 pt-3">

                                                    <Button disabled={loginLoading} variant="contained" type="submit" fullWidth style={{ borderRadius: "15px" }} color="primary" >

                                                        ورود

                                                        {loginLoading && <CircularProgress size={24} className="position-absolute" />}

                                                    </Button>

                                                </div>

                                            </div>

                                        </Form>

                                    </Formik>

                                )

                            }

                        </div>

                    </div>

                </div>

            </div>

            <div className="w-100">

                <div className="back-ground-pic" ></div>

            </div>

        </>

    )

}



export default Login

