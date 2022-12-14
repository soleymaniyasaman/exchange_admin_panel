import React , {useState} from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../utils/hooks";

import { USERS_LIST ,USER_MESSAGES ,IAM_APP ,MESSAGE_DETAIL} from '../../utils/constants';

import { timeToStr, UrlQuery } from '../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import { Mail } from "@material-ui/icons";

import Filters from './filters';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';





const useStyles = makeStyles({

  root: {

    // display: 'flex',

    margin: '0 auto',

  },

});



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




function MessagesDatagrid(props) {
  
  // const [rowId, setRowId] = useState();
  
  const [{ data:messageDetail, isLoading:messageIsLoading }, callMessage] = useFetchApi(undefined, [])

  
  
  const history = useHistory()
  
  
  const MessageModal = (props) => {
  
  
  
    return <Dialog
  
      maxWidth="md"
  
      fullWidth
  
      //   onEntering={handleEntering}
  
      aria-labelledby="confirmation-dialog-title"
  
      open={props.modalOpen}
  
    >
  
      <DialogTitle className="">
  
        <div className="d-flex justify-content-end">
  
          <p className="font_title_name me-1" >مشاهده پیام</p>
  
          <img src="/assets/drawer/Polygon.svg" />
  
        </div>
  
      </DialogTitle>
  
      <DialogContent >
  
        <div className="border border-light rounded p-3">
  
          <div className="d-flex justify-content-between px-3 text-muted">
  
            <span>{timeToStr(messageDetail?.created_at, " jYYYY/jMM/jDD  -   HH:mm")}</span>
  
            <span>{messageDetail?.title}</span>
  
          </div>
  
          <p className="text-end p-3">
              
            {messageDetail?.body}
            
          </p>
  
        </div>
  
      </DialogContent>
  
      <DialogActions className="justify-content-start px-4 py-2">
  
        <div>
  
          <Button autoFocus onClick={() => props.setModalOpen(false)} variant="contained" color="primary">
  
            بستن
  
          </Button>
  
        </div>
  
      </DialogActions>
  
    </Dialog>
  
  }

  const handleAction = (id) => {

    callMessage("GET", IAM_APP, MESSAGE_DETAIL(id))

  }

  const columns = [

    {

      field: 'id',

      headerName: 'شماره',

      flex: 1,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.id}`

    },

    {

      field: 'owner_id',

      headerName: 'عنوان پیام',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.title}`


    },

    {

      field: 'receiver_user',

      headerName: 'دریافت کننده',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => {
        let renderTooltip = (props) => (

          <Tooltip id="button-tooltip" {...props}>

{values ? values.value.map(item => {
            let userItem = user?.items?.filter(itm => itm.id === item.id)
            console.log("userItem",userItem) 
            return `${userItem && userItem[0]?.credentials?.first_name} ${userItem && userItem[0]?.credentials?.last_name} `
          }) : "_"}

          </Tooltip>

        );
        return(<div className="d-flex">
          <OverlayTrigger

            placement="top"

            delay={{ show: 250, hide: 400 }}

            overlay={renderTooltip}

            >
        {/* referralData.map((item) => {
            let userIncomeData = null
            let userIncomeLink = null
            if (userIncome) {
                userIncomeData = userIncome.filter(itm => itm.referral_code_id == item.id)
                setRefuseTurn(!refuseTurn)
            }
            return (item.referralIncome = userIncomeData,item.referralLink = `https://mojex.amnmoj.ir${configUrl}${item.code}`)
        }) */}
                      <Button>

          {values ? values.value.map(item => {
            let userItem = user?.items?.filter(itm => itm.id === item.id)
            console.log("userItem",userItem) 
            return `${userItem && userItem[0]?.credentials?.first_name} ${userItem && userItem[0]?.credentials?.last_name} `
          }) : "_"}
          </Button>
        </OverlayTrigger>
        </div>)

        }

    },

    {

      field: 'sender',

      headerName: 'ارسال کننده',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => (

        <div className="d-flex">

             {values.credentials?.first_name?values.credentials?.first_name:'_'}
             {values.credentials?.last_name?values.credentials?.last_name:'_'}

        </div>

      )

    },

    {

      field: 'date',

      headerName: 'تاریخ',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${timeToStr(values.row?.created_at, "HH:mm  -   jYYYY/jMM/jDD")}`


    },

    {

      field: 'status',

      headerName: 'عملیات',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 0.75,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => <Button variant="contained" color="primary" 

      onClick={() => {

        setModalOpen(true)

        handleAction(values.row.id)}} 

        className="ms-2">مشاهده پیام</Button>

    }

  ];



  const [modalOpen, setModalOpen] = React.useState(false);

  const [params, setParams] = React.useState({size: 10, page: 1 })

  const [{ data:data, isLoading:isLoading, hasError:hasError }, doFetch] = useFetchApi(undefined, [])

  const [{ data: user, isLoading: userLoading },doFetchUsers] = useFetchApi(undefined, {})



  React.useEffect(() => {

    doFetchUsers("GET", IAM_APP, UrlQuery(USERS_LIST))

    doFetch("GET", IAM_APP , UrlQuery(USER_MESSAGES, {...params}) )

  }, [params])

console.log("message",data)

  return (

    <div className="content">

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تاریخچه پیام‌ها</p>

        </div>

        <Filters params={params} setParams={setParams} />

        <Button

          variant="contained"

          className="ms-4"

          style={{ minWidth: "160px" }}

          onClick={() => history.push("/messages/new")}

          color="secondary"

          startIcon={<Mail className="ms-2" />}

        > ارسال پیام جدید</Button>

      </div>

      <MessageModal modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <div className="d-flex px-3">

        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>

          <DataGrid

            style={{ border: 0 }}

            autoHeight

            // rows={data?.items ?? []}

            rows={data?.items ?? []}

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

            rowCount={data?.total}

            paginationMode="server"

            onPageChange={(param) => doFetch("GET", IAM_APP , UrlQuery(USER_MESSAGES, {...params, page: param + 1}) )}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default MessagesDatagrid

