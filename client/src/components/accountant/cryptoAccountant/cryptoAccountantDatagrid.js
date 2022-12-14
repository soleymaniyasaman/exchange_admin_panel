import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { DataGrid, useGridSlotComponentProps } from '@mui/x-data-grid';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../utils/hooks";

import { USERS_TRANSACTION_HISTORY } from '../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { ACCOUNTING_APP, BASE_URL, WITHDRAWS_LIST, WITHDRAW_DETAIL } from '../../../utils/constants';

import CopyToClipboard from '../../../utils/copy-to-clipboard';

import copy from '../../../assets/content_copy-24px.svg'

import ConfigApi from '../../../utils/config-api';

import { CircularProgress, Backdrop, Button, Snackbar, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

import { numDiscriminant } from '../../../utils/discriminant';


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
        props.handleUserApprove(props.approve)
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



function CryptoAccountantDatagrid(props) {

  const history = useHistory()

  const [showToolTip, setShowToolTip] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [userState, setUserState] = useState('');

  const renderToolTipSuccess = <Tooltip id="copied">Copied!</Tooltip>

  const renderNothing = <div />



  const columns = [

    {

      field: 'tracking_code',

      headerName: 'شناسه',

      flex: .5,

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

      // renderCell: (values) => (

      //   <div className="d-flex">

      //        {values.row?.trade_type === "limit" ? "محدود" : "سریع"}

      //   </div>

      // )

    },

    {

      field: 'national_code',

      headerName: 'کدملی',

      flex: 0.75,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.national_code}`

      // renderCell: (values) => (

      //   <div className="d-flex">

      //        {values.row?.trade_type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span>}

      //   </div>

      // )

    },

    {

      field: 'origin_wallet',

      headerName: 'بازار',

      flex: .5,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.wallet?.c_type}`

      // renderCell: (values) => (

      //   <div className="d-flex">

      //        <span>{values.row?.origin_wallet} - {values.row?.dest_wallet}</span>

      //   </div>

      // )

    },

    {

      field: 'quantity',

      headerName: 'مقدار برداشت',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: .5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => `${numDiscriminant(values.row?.amount)}`

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

      field: 'commission_percentage',

      headerName: 'کیف پول مقصد',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {

        let renderTooltip = (props) => (

          <Tooltip id="button-tooltip" {...props}>

            {values.row?.dest_address}

          </Tooltip>

        );


        return (
          <>

            <OverlayTrigger

              placement="top"

              delay={{ show: 250, hide: 400 }}

              overlay={renderTooltip}

            >

              <Button>

                {values.row?.dest_address?.slice(-5)}...

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

                <img alt="" src={copy} class="w-50" role="button"/>

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

    {

      field: 'description',

      headerName: 'جزییات',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => values.row?.status === "success" ? <Button variant="outlined"  size="small"

      smaller onClick={() => window.open(values.row?.description, '_blank')}>جزییات</Button> : "-"


    },

    {

      field: 'approve',

      headerName: 'تایید یا لغو برداشت',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 2,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => (

        <>
          {values.row?.status === "success" ?
            <>تایید شده</>
            :

            values.row?.status === "rejected" ?

              <>لغو شده</>

              :

              <>

                {/* <Button variant="contained" color="secondary" onClick={() => handleAction("success", values.row.id)} small className="ms-4">تایید برداشت</Button> */}

                <Button

                  variant="contained"

                  color="secondary"

                  onClick={() => {

                    setUserState(["success", values.row.id])

                    setModalOpen(true)

                  }}
                  size="small"

                  smaller

                  className="ms-1">تایید برداشت</Button>



                <Button

                  variant="contained"

                  onClick={() => {

                    setUserState(["rejected", values.row.id])

                    setModalOpen(true)

                  }}
                  size="small"

                  smaller

                  className="bg-danger text-white">لغو</Button>

              </>

          }


        </>

      )

    },

  ];


  // const [params, setParams] = React.useState({order: "-updated_at", size: 10, page: 0})

  // const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])



  //   React.useEffect( () => {

  //       // doFetch("GET", UrlQuery(USERS_TRANSACTION_HISTORY, {...params}) )

  //   }, [params])

  const [params, setParams] = React.useState({ order: "-updated_at", size: 10, page: 0 })

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, {});

  // const [{ data:config, isLoading:configLoading }, doConfig] = useFetchApi(undefined, {});

  const [{ data: withdrawData, isLoading: withdrawLoading }, updateWithdraw] = useFetchApi(undefined, {});

  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      console.log("update", update);

      return item.user = update

    })

  }

  const handleAction = (approve) => {

    if (["success", "rejected", "in_progress"].includes(approve[0])) {

      // console.log(action, withdrawId);

      updateWithdraw("PUT", ACCOUNTING_APP, WITHDRAW_DETAIL(approve[1]), { status: approve[0] })

      setTimeout(() => doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params })), 1500)

    }

  }


  // console.log("update withdraw",withdrawData)


  React.useEffect(() => {

    doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params }))

  }, [params])


  React.useEffect(() => {

    updateData()

  }, [data])


  return (

    <div className="content">

      <ConfirmModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleUserApprove={handleAction} approve={userState} />

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تایید برداشت ارز</p>

        </div>

        <Filters params={params} setParams={setParams} />

      </div>

      <div className="d-flex px-3">

        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>

          <DataGrid

            style={{ border: 0 }}

            autoHeight

            rows={data?.results ?? []}

            // rows={rows}

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

            onPageChange={(param) => doFetch("GET", UrlQuery(WITHDRAWS_LIST, { ...params, page: param + 1}))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default CryptoAccountantDatagrid

