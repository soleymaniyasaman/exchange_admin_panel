import React from 'react';
import { Link } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { Grid, CircularProgress, Button } from '@material-ui/core';
import DepositDataGrid from './dataGrid';


function UserDeposits() {

    let loginLoading = false

    return (
        <div className="content mt-5 p-4">
            <div className="d-flex justify-content-between">
                <div className="d-flex w-25">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1">شارژ کیف پول </p>
                </div>
                <Link className="text-decoration-none" style={{color: "#10D078"}} to={'/users'} >بازگشت به کیف پول {`->`} </Link>
            </div>
            <div className="mt-4">
                <Formik
                    initialValues={{ account_number: '', tracking_code: '' }}
                    enableReinitialize={true}
                    // validate={this.validate}
                    // onSubmit={handleSubmit}
                >
                    <Form>
                        <div style={{flexGrow: 1}} >
                            <Grid container spacing={3} justify="space-between" className="p-3">
                                <Grid item md={5}>
                                    <div className="d-flex w-100" style={{maxHeight: "34px"}}>
                                        <label className="text-end text-white ms-4" style={{minWidth: "90px"}} htmlFor="account_number">شماره حساب</label>
                                        <Field
                                            type="text"
                                            name="account_number"
                                            placeholder=""
                                            required
                                            className="form-control bg_input input_text"
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={5} className="ms-5">
                                    <div className="d-flex w-100" style={{maxHeight: "34px"}}> 
                                        <label className="text-end text-white fs-6 ms-4" style={{minWidth: "90px"}}  htmlFor="tracking_code">کدپیگیری</label>
                                        <Field
                                            label="dasfdas"
                                            type="text"
                                            name="tracking_code"
                                            placeholder=""
                                            required
                                            className="form-control bg_input input_text"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="space-between" className="p-3">
                                <Grid item md={5}>
                                    <div className="d-flex w-100" style={{maxHeight: "34px"}}>
                                        <label className="text-end text-white fs-6 ms-4" style={{minWidth: "90px"}} htmlFor="amount">مبلغ (تومان)</label>
                                        <Field
                                            type="text"
                                            name="amount"
                                            placeholder=""
                                            required
                                            className="form-control bg_input input_text"
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                            {/* { Boolean(hasError) && <p className="text-danger">{hasError}</p> } */}
                            <div className="mt-4 pt-3 ms-5 ps-2 d-flex justify-content-end">
                                <Button disabled={loginLoading} variant="contained" type="submit" color="primary" >
                                    شارژ کیف پول
                                    { loginLoading && <CircularProgress size={24} className="position-absolute" />}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <div className="d-flex w-25">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1"> سابقه شارژ کیف پول</p>
                </div>
            </div>
            <DepositDataGrid />
        </div>
    )
}

export default UserDeposits
