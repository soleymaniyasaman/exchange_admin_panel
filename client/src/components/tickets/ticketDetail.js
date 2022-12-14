import React from 'react';
import { Link, useParams } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { Grid, CircularProgress, Button, Checkbox, FormControlLabel, Divider } from '@material-ui/core';
import {NotificationImportant} from '@material-ui/icons';
import { useFetchApi } from '../../utils/hooks';
import { IAM_APP, REPLY_TICKET, TICKET_DETAIL , USERS_LIST} from '../../utils/constants';
import { timeToStr, UrlQuery } from '../../utils/utils';


const MessageBox = (props) => {
    let border = props.isAdmin ? "20px 0 20px 20px" : "0 20px 20px 20px";
    let direction = props.isAdmin ? "row" : "row-reverse"
    return (
        <Grid container spacing={3} direction={direction} justify="space-between" className="px-3 pb-2">
            <Grid item md={5}>
                <div className="border border-light px-3 py-2 text-white" style={{borderRadius: border, backgroundColor: "#181C1F"}}>
                    <div className="d-flex justify-content-between">
                        <span>{props.writer?.items?props.writer?.items?.map(item => item.id === props.item?.user?.id ? `${item.credentials.first_name} ${item.credentials.last_name}` : null):props.writer}</span>
                        <span>{ timeToStr(props.item?.created_at, "HH:mm  -   jYYYY/jMM/jDD") }</span>
                    </div>
                    <p className="py-1 px-2">
                        {props.item?.body}
                    </p>
                </div>
            </Grid>
        </Grid>
    )
}


function TicketDetail(props) {

    const {id} = useParams();
    
    const [{ data: user, isLoading: userLoading },doFetch] = useFetchApi(undefined, [])
    const [{ data: ticket, isLoading: ticketLoading }, getTicket] = useFetchApi(undefined, {})
    const [{ data: ticketsReply, isLoading: ticketsReplyLoading }, getTicketsReply] = useFetchApi(undefined, [])
    const [{ data: newReply, isLoading: newReplyLoading, hasError }, createReply] = useFetchApi(undefined, {})

    React.useEffect( () => {
        if (id){
            doFetch("GET", IAM_APP, UrlQuery(USERS_LIST))
            getTicket("GET", IAM_APP, TICKET_DETAIL(id))
            getTicketsReply("GET", IAM_APP, REPLY_TICKET(id))
        }
    }, [])

    React.useEffect( () => {
        if (!newReplyLoading && Object.keys(newReply).length){
            getTicketsReply("GET", IAM_APP, REPLY_TICKET(id))
        }
    }, [newReplyLoading])

    const handleSubmit = (values) => {
        const payload = {
            "body": values?.body,
            "media_id": ticket?.media_id
          
        }
        if (values.body !== ''){
            createReply("POST", IAM_APP, REPLY_TICKET(id), payload)
        }
    }

    return (
        <div className="content mt-5 p-4">
            <div className="d-flex justify-content-between">
                <div className="d-flex w-25">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1">{user?.items?.map(item => item.id === ticket?.user?.id ? `${item.credentials.first_name} ${item.credentials.last_name}` : null)} / {ticket?.category?.title}</p>
                </div>
                <Link className="text-decoration-none" style={{color: "#10D078"}} to={'/tickets'} >بازگشت به لیست تیکت‌ها {`->`} </Link>
            </div>
            {console.log("ticket data",ticketsReply,ticket)}
            <div className="mt-4">
                { !ticketLoading && Boolean(Object.keys(ticket)) && <MessageBox item={ticket} writer={user} isAdmin={false}/>}
                {
                    !ticketsReplyLoading && Boolean(ticketsReply?.items?.length) &&
                    // ticketsReply.items.map( (item, index) => <MessageBox key={index} item={item} isAdmin={ item?.user?.id !== ticket?.user?.id } /> )
                        ticketsReply.items.map( (item, index) => <MessageBox key={index} writer={item.id} item={item} isAdmin={ true} /> )
                }
            </div>
            <Divider className="my-3" />
            <div className="mt-4">
                <Formik
                    initialValues={{ body: '' }}
                    enableReinitialize={true}
                    // validate={this.validate}
                    onSubmit={ values => handleSubmit(values) }
                >
                    <Form>
                        <div style={{flexGrow: 1}} >
                            <Grid container spacing={3} justify="space-between" className="p-3">
                                <Grid item md>
                                    <div className="d-flex flex-column w-100">
                                        <label className="text-end text-white fs-6 mb-2 ms-4" style={{minWidth: "90px"}} htmlFor="amount">متن پاسخ</label>
                                        <Field
                                            as="textarea"
                                            name="body"
                                            placeholder=""
                                            required
                                            className="form-control bg_input input_text"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="space-between" className="p-3">
                                <Grid item md>
                                    {/* <div className="d-flex w-100">
                                        <input
                                            accept="image/*"
                                            className="d-none"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="secondary" component="span">
                                                انتخاب فایل ضمیمه
                                            </Button>
                                        </label>
                                    </div>
                                    <div className="mt-2 text-white" style={{fontSize: "0.8rem"}} > <span><NotificationImportant size="small" className="text-danger" /></span> فرمت های مجاز فایل ضمیمه شامل jpg , png , zip, rar, pdf می باشند</div> */}
                                </Grid>
                            </Grid>
                            {/* { Boolean(hasError) && <p className="text-danger">{hasError}</p> } */}
                            <div className="my-4 ms-5 ps-2 d-flex justify-content-end">
                                <Button disabled={newReplyLoading} variant="contained" type="submit" color="primary" >
                                    ارسال پاسخ
                                    { newReplyLoading && <CircularProgress size={24} className="position-absolute" />}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default TicketDetail
