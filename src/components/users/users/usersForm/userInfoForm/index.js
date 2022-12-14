import React, { useContext, useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import "../adminPanel_products_Form.scss";
import './firstinformation.scss'
import { UserContext } from "../../../../../context/provider";
import { useHistory, useParams } from "react-router-dom";
import { useFetchApi } from "../../../../../utils/hooks";
import { IAM_APP, USERS_DETAIL, USER_SEND_MESSAGES } from "../../../../../utils/constants";
import { CircularProgress, Backdrop, Button, Snackbar, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Input } from 'antd';


const ConfirmModal = (props) => {

    return <Dialog
        maxWidth="xs"
        //   onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={props.modalOpen}
    >
        <DialogTitle id="confirmation-dialog-title">آیا از تغییر وضعیت کاربر مطمئن هستید؟</DialogTitle>
        <DialogContent >

        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={() => props.setModalOpen(false)} variant="outlined" color="secondary">
                خیر
            </Button>
            <Button onClick={() => {
                props.handleUserApprove(props.approve)
                setTimeout(() => { props.setModalOpen(false) }, 2000)
            }} variant="contained" color="primary">
                بله
            </Button>
        </DialogActions>
    </Dialog>
}
const AskingModal = (props) => {

    // const [text, setText] = useState();
    const contextData = useContext(UserContext);

    const { TextArea } = Input;

    // console.log("text",text)
    return <Dialog
        maxWidth="md"
        fullWidth={true}
        //   onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={props.modalOpen}
    >
        <DialogTitle id="confirmation-dialog-title" dir="rtl">دلیل شما برای رد کاربر چیست؟</DialogTitle>
        <DialogContent >
            <TextArea dir="rtl" row={10} onChange={((e) => contextData.setRejectMessage(e.target.value))}></TextArea>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={() => props.setModalOpen(false)} variant="outlined" color="secondary">
                خیر
            </Button>
            <Button onClick={() => {
                props.handleUserApprove(props.approve)
                setTimeout(() => { props.setModalOpen(false) }, 2000)
            }} variant="contained" color="primary">
                بله
            </Button>
        </DialogActions>
    </Dialog>
}


const UserInfoForm = ({ props }) => {

    const history = useHistory()

    const contextData = useContext(UserContext);

    const { id } = useParams();

    const [{ data: userDetail, isLoading, hasError }, doFetch] = useFetchApi(undefined, {});
    const [{ data: submitMessage, isLoading: submitMessageIsLoading, hasError: submitMessageHasError }, doFetchSubmit] = useFetchApi(undefined, [])

    const [snackOpen, setSnackOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [userState, setUserState] = useState('');

    const handleUserApprove = (approve) => {
        if (userDetail.credentials) {
            let payload = {
                is_active: true,
                approve_state: approve,
                credentials: {
                    first_name: userDetail?.credentials.first_name,
                    last_name: userDetail?.credentials.last_name,
                    birth_date: userDetail?.credentials.birth_date,
                    phone: userDetail?.credentials.phone,
                    address: userDetail?.credentials.address,
                    auth_picture_id: 1,
                    phone_approved: userDetail?.credentials.phone_approved,
                    email_approved: userDetail?.credentials.email_approved
                }
            }
            let payloadRejectMessage = {
                "message": {
                    "title": "احراز هویت شما رد شده است.",
                    "body": contextData.rejectMessage,
                    "target_type": "person"
                },
                "users": [id]
            }
            doFetch("PUT", IAM_APP, USERS_DETAIL(id), payload)
            if (approve === "rejected") {
                doFetchSubmit("POST", IAM_APP, USER_SEND_MESSAGES, payloadRejectMessage)
            }
            setTimeout(() => history.push('/users'), 2000)


        }
    }


    useEffect(() => {
        if (id) {
            doFetch("GET", IAM_APP, USERS_DETAIL(id))
        }
    }, [])

    useEffect(() => {
        if (Object.keys(userDetail).length) {
            props.setValues({
                email: userDetail?.credentials?.email,
                first_name: userDetail?.credentials?.first_name,
                last_name: userDetail?.credentials?.last_name,
                national_code: userDetail?.credentials?.national_code,
                birth_date: userDetail?.credentials?.birth_date,
                phone: userDetail?.credentials?.phone,
                mobile: userDetail?.mobile,
                address: userDetail?.credentials?.address
            })
        }

    }, [userDetail])

    useEffect(() => {
        if (hasError) {
            setSnackOpen(true)
        }
    }, [hasError])

    return (
        <>
            {userState !== "rejected" ? <ConfirmModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleUserApprove={handleUserApprove} approve={userState} /> : <AskingModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleUserApprove={handleUserApprove} approve={userState} />}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackOpen}
                onClose={() => setSnackOpen(false)}
                autoHideDuration={3000}
            // key={vertical + horizontal}
            >
                <Alert onClose={() => setSnackOpen(false)} severity="error" variant="filled">
                    خطایی رخ داده است
                </Alert>
            </Snackbar>
            <Backdrop className="backdrop-loading" open={isLoading} >
                <CircularProgress color="primary" />
            </Backdrop>
            <div className="bodyForm_s mx-auto">
                <div className=" d-flex align-items-center w-auto mx-auto me-5">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1">ایمیل </p>
                </div>
                <div className="row container-fluid col-12 mx-auto">
                    <div className="row mt-4 col-12 p-0">
                        <div className="col-6 d-flex ">
                            <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.userEmail.fieldDisplay}</p>
                            <div className="col-9">
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="ایمیل کاربر"
                                    className="form-control bg_input input_text"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 d-flex align-items-center mx-auto me-2">
                        <img src="/assets/drawer/Polygon.svg" />
                        <p className="font_title_name me-1">اطلاعات شخصی </p>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.firstName.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="first_name"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.lastName.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="last_name"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.identifyCode.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="national_code"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.birthDay.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="birth_date"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.phoneNum.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="phone"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex  mt-4">
                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.mobileNum.fieldDisplay}</p>
                        <div className="col-9">
                            <Field
                                type="text"
                                name="mobile"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="col d-flex mt-4">
                        <p className="col-1 font_title_name"> {contextData.fields?.userInfoFields.address.fieldDisplay}</p>
                        <div className="col-10 flex-nowrap" style={{ width: "87.5%" }}>
                            <Field
                                type="text"
                                name="address"
                                className="form-control bg_input input_text"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="mt-5 d-flex align-items-center mx-auto me-2">
                            <img src="/assets/drawer/Polygon.svg" />
                            <p className="font_title_name me-1">اطلاعات بانکی </p>
                        </div>
                    </div>
                    <div>
                        {
                            Boolean(userDetail?.cards?.length) &&
                            userDetail.cards.map((item, index) => (
                                <div className="row col-12 mt-4 mx-auto" key={index}>
                                    <div className="col-6 d-flex  mt-4">
                                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.cardNum.fieldDisplay}</p>
                                        <div className="col-9">
                                            <Field
                                                type="text"
                                                name="card_number"
                                                value={item.card_number}
                                                disabled
                                                className="form-control bg_input input_text"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex  mt-4">
                                        <p className="col-2 font_title_name">{contextData.fields?.userInfoFields.shabaNum.fieldDisplay}</p>
                                        <div className="col-9">
                                            <Field
                                                type="text"
                                                name="sheba_number"
                                                disabled
                                                value={item.sheba_number}
                                                className="form-control bg_input input_text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className=" mt-4">
                        <div className="mt-4">
                            <div className="mt-5 d-flex align-items-center mx-auto me-2">
                                <img src="/assets/drawer/Polygon.svg" />
                                <p className="font_title_name me-1">احراز هویت </p>
                            </div>
                        </div>
                        <div className="pe-5">
                            {
                                Boolean(userDetail?.media?.filter(item => item.media_type === "auth")?.length) && (
                                    <img className="img-fluid rounded-3" style={{ maxWidth: "528px" }} src={userDetail.media.filter(item => item.media_type === "auth")[0].exact_url} />
                                )
                            }
                        </div>

                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3 ps-5 py-5">
                    <Button className=""         //save button
                        id="save-button"
                        variant="contained"
                        color="secondary"
                        onClick={() => {

                        }}
                        disabled
                    >
                        ویرایش اطلاعات
                    </Button>
                    <Button className="me-2 bg-danger text-white"
                        variant="contained"
                        id="authentication-button2"
                        onClick={() => {
                            setUserState("rejected")
                            setModalOpen(true)
                        }}
                        disabled={userDetail?.approve_state === "rejected"}
                    >
                        رد کاربر
                    </Button>
                    <Button className="me-2"
                        variant="contained"
                        id="authentication-button"
                        color="primary"
                        onClick={() => {
                            setUserState("approved")
                            setModalOpen(true)
                        }}
                        disabled={userDetail?.approve_state === "approved"}
                    >
                        تایید کاربر
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserInfoForm;
