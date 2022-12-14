import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../utils/hooks";

import { ACCOUNTING_APP, BASE_URL, USERS_TRANSACTION_HISTORY, WITHDRAWS_LIST, WITHDRAW_DETAIL } from '../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { numDiscriminant } from '../../../utils/discriminant';

import { CircularProgress, Backdrop, Button, Snackbar, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import CopyToClipboard from '../../../utils/copy-to-clipboard';
import copy from '../../../assets/content_copy-24px.svg'




const useStyles = makeStyles({

  root: {

    // display: 'flex',

    margin: '0 auto',

  },

});

const ConfirmModal = (props) => {

  return <Dialog

    maxWidth="xs"

    //   onEntering={handleEntering}

    aria-labelledby="confirmation-dialog-title"

    open={props.modalOpen}

  >

    <DialogTitle id="confirmation-dialog-title">آیا از تغییر وضعیت برداشت مطمئن هستید؟</DialogTitle>

    <DialogContent >

    </DialogContent>

    <DialogActions>

      <Button autoFocus onClick={() => props.setModalOpen(false)} variant="outlined" color="secondary">

        خیر

      </Button>

      <Button onClick={() => {

        props.handleUserApprove(props.approve.action,props.approve.withdrawId)

        setTimeout(() => { props.setModalOpen(false) }, 2000)

      }} variant="contained" color="primary">

        بله

      </Button>

    </DialogActions>

  </Dialog>

}


function CustomPagination() {

  const { state, apiRef } = useGridSlotComponentProps();

  const classes = useStyles();



  return (

    <Pagination

      className={classes.root}

      shape="rounded"

      color="primary"

      // variant="contained"

      count={state.pagination.pageCount}

      page={state.pagination.page + 1}

      onChange={(event, value) => apiRef.current.setPage(value - 1)}

    />

  );

}




function RialAccountantDatagrid(props) {


  const [modalOpen, setModalOpen] = useState(false);

  const [userState, setUserState] = useState('');

  const [showToolTip, setShowToolTip] = useState(false);

  const history = useHistory()

  const renderToolTipSuccess = <Tooltip id="copied">Copied!</Tooltip>

  const renderNothing = <div />

  const columns = [

    {

      field: 'tracking_code',

      headerName: 'شناسه سفارش',

      flex: 1,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.tracking_code?.slice(0, 8)}`

    },

    {

      field: 'owner_id',

      headerName: 'نام کاربر',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.first_name} ${values.row?.user[0]?.credentials.last_name}`


    },

    {

      field: 'national_code',

      headerName: 'کدملی',

      flex: 0.75,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.user ? values.row?.user[0]?.credentials.national_code : null}`


    },

    {

      field: 'amount',

      headerName: 'مبلغ برداشت(تومان)',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => numDiscriminant(values.row?.amount)

    },
    {

      field: 'withdraw_fee',

      headerName: 'کارمزد برداشت',

      flex: 0.75,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

    },
    {

      field: 'user',

      headerName: 'شماره شبا واریز',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'baseline',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {
        let sheba
        values.value && values.value[0].cards?.map(item => {
          if (item.id === values.row?.bank_account_id) {
            return sheba = item.sheba_number
          }
        })
        let renderTooltip = (props) => (

          <Tooltip id="button-tooltip" {...props}>

            {sheba && sheba}

          </Tooltip>

        );

          console.log("sheba",sheba)

        return (

          <>

            <OverlayTrigger

              placement="top"

              delay={{ show: 250, hide: 400 }}

              overlay={renderTooltip}

            >

              <Button>

                {sheba?.slice(-5)}...

              </Button>

            </OverlayTrigger>

            <OverlayTrigger trigger="click" placement="top" overlay={showToolTip ? renderToolTipSuccess : renderNothing} rootClose>

              <span id="basic-addon3"

                onClick={() => {

                  CopyToClipboard(values.row?.dest_address)


                  setShowToolTip(true)

                  setTimeout(() => { setShowToolTip(false) }, 2000);

                }}

              >

                <img alt="" src={copy} class="w-50" />

              </span>

            </OverlayTrigger>

          </>

        )
      }
    },
    {

      field: 'created_at',

      headerName: 'زمان درخواست',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      valueFormatter: data => timeToStr(data.value, "HH:mm  -   jYYYY/jMM/jDD")

    },
    {

      field: 'updated_at',

      headerName: 'زمان تایید',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      valueFormatter: data => timeToStr(data.value, "HH:mm  -   jYYYY/jMM/jDD")

    },
    {

      field: 'approver_admin',

      headerName: 'تایید کننده',

      flex: 0.75,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

    },
    // {

    //   field: 'description',

    //   headerName: 'جزییات',

    //   flex: 1,

    //   sortable: false,

    //   headerClassName: 'grid-header',

    //   headerAlign: 'center',

    //   align: 'center',

    //   renderCell: (values) => values.row?.description ? <Button variant="outlined" size="small"

    //     smaller onClick={() => window.open(values.row?.description, '_blank')}>جزییات</Button> : "-"

    // },
    {

      field: 'action',

      headerName: 'تایید یا لغو برداشت',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {

        if (values?.row.status === "in_progress") {

          return (

            <>
              {/* <Button variant="contained" color="secondary" onClick={() => handleAction("success", values.row.id)} small className="ms-4">تایید برداشت</Button> */}

              <Button

                variant="contained"

                color="secondary"

                onClick={() => {

                  setUserState({action:"success",withdrawId:values.row.id})

                  setModalOpen(true)
                }}

                small

                className="ms-1">تایید برداشت</Button>

              <Button

                variant="contained"

                onClick={() => {

                  setUserState({action:"rejected",withdrawId:values.row.id})

                  setModalOpen(true)
                }}

                small

                className="bg-danger text-white">لغو</Button>

            </>

          )

        } else if (values?.row.status === "success") {

          return (

            <div className="d-flex justify-content-center w-100">

              <img src="/assets/drawer/check_circle-24px.svg" />

              تایید شده

            </div>

          )

        } else if (values?.row?.status === "rejected") {

          return (

            <div className="d-flex justify-content-center w-100">

              <img src="/assets/drawer/cancel-24px (1).svg" />

              لغو شده

            </div>

          )

        } else {

          return null

        }

      }

    },

    {

      field: 'status',

      headerName: 'وضعیت تسویه',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {

        if (values?.row.status === "in_progress" || values?.row.status === "pending") {

          return (

            <Button 

            variant="contained" 

            color="primary" 

            onClick={() => {

              setUserState({action:"success",withdrawId:values.row.id})

              setModalOpen(true)
            }}
            
            className="ms-2">تایید نهایی</Button>

          )

        } else if (values?.row.status === "success") {

          return (

            <div className="d-flex justify-content-center w-100">

              <img src="/assets/drawer/check_circle-24px.svg" />

              تسویه شده

            </div>

          )

        } else if (values?.row?.status === "rejected") {

          return (

            <div className="d-flex justify-content-center w-100">

              <img src="/assets/drawer/cancel-24px (1).svg" />

              لغو شده

            </div>

          )

        } else {

          return ""

        }

      }

    }

  ];



  const [params, setParams] = React.useState({ order: "-updated_at", crypto_type: 'irr', size: 10, page: 0 })

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, {});

  const [{ data: withdrawData, isLoading: withdrawLoading }, updateWithdraw] = useFetchApi(undefined, {});



  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      console.log("updateeeeee", update);

      return item.user = update

    })

  }

  const handleAction = (action, withdrawId) => {

    console.log("attention ====>",action, withdrawId);

    if (["success", "rejected", "in_progress"].includes(action)) {


      updateWithdraw("PUT", ACCOUNTING_APP, WITHDRAW_DETAIL(withdrawId), { status: action })

      setTimeout(() => doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params })), 1500)

    }

  }


  React.useEffect(() => {

    doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params }))

  }, [params])



  React.useEffect(() => {

    updateData()

  }, [data])

  console.log("data", data)


  return (

    <div className="content">

      <ConfirmModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleUserApprove={handleAction} approve={userState} />

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تایید برداشت ریال</p>

        </div>

        <Filters params={params} setParams={setParams} />

      </div>

      <div className="d-flex px-3">

        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>

          <DataGrid

            style={{ border: 0 }}

            autoHeight

            rows={data?.results ?? []}

            loading={isLoading}

            columns={columns}

            getRowClassName={

              params => 'grid-content'

            }

            headerHeight={50}

            rowHeight={52}

            isRowSelectable={false}

            components={{

              Pagination: CustomPagination

            }}

            pageSize={10}

            rowCount={data?.results?.length}

            paginationMode="server"

            onPageChange={(param) => doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params, page: param }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default RialAccountantDatagrid

