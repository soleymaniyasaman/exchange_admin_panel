import React , {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import {Pagination} from '@material-ui/lab';
import {useFetchApi} from "../../utils/hooks";
import { CANCEL_ORDERS, TRADING_APP, USERS_ORDERS } from '../../utils/constants';
import { timeToStr, UrlQuery } from '../../utils/utils';
import { useHistory, useParams } from 'react-router-dom';
import Filters from './filters';
import { numDiscriminant } from '../../utils/discriminant';
import { round_ten_thousand } from '../../utils/math-round';


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
  
  const ConfirmModal = (props) => {
  console.log("prop",props)
    return <Dialog
      maxWidth="xs"
      //   onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={props.modalOpen}
    >
      <DialogTitle id="confirmation-dialog-title">آیا از لغو سفارش مطمئن هستید؟</DialogTitle>
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
  function OrdersDatagrid(props) {
    
    const [modalOpen, setModalOpen] = useState(false);
    
    const [userState, setUserState] = useState('');
    
    const history = useHistory()
    

  const columns = [
    {
      field: 'tracking_code',
      headerName: 'شناسه',
      flex:1,
      type: 'string',
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => `${values.row?.tracking_code.slice(0, 8)}`
    },
    {
      field: 'origin_wallet',
      headerName: 'بازار',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
             <span>{values.row?.origin_wallet} - {values.row?.dest_wallet}</span>
        </div>
      )
    },
    {
      field: 'type',
      headerName: 'سمت',
      flex: 0.75,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
             {values.row?.type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span>}
        </div>
      )
    },
    {
      field: 'trade_type',
      headerName: 'نوع سفارش',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
             {values.row?.trade_type === "limit" ? "محدود" : "سریع"}
        </div>
      )
    },
    {
      field: 'owner_id',
      headerName: 'نام کاربر',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => `${values.row?.user[0]?.credentials.first_name} ${values.row?.user[0]?.credentials.last_name}`
    },
    {
      field: 'unit_price',
      headerName: 'قیمت سفارش',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => numDiscriminant(values.row?.unit_price)
    },
    {
      field: 'quantity',
      headerName: 'مقدار',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => numDiscriminant(values.row?.quantity)
    },
    {
      field: 'commission_percentage',
      headerName: 'کارمزد فعلی',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
    },
    {
      field: 'total',
      headerName: 'مبلغ کل',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => numDiscriminant(parseInt(values?.row?.unit_price) * parseInt(values?.row?.quantity))
    },
    {
      field: 'progress',
      headerName: 'پرشده',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => {
        let fill = values.value / values.row.quantity
        return <>
        {(round_ten_thousand(fill === Infinity ? 1 : fill) * 100)}%
        </>
      }
    },
    {
      field: 'created_at',
      headerName: 'تاریخ',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      valueFormatter: data => timeToStr(data.value, "HH:mm  -   jYYYY/jMM/jDD")
    },
    {
      field: 'status',
      headerName: 'وضعیت',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => <div className="d-flex justify-content-end w-100">
        {

        values?.value === "in_progress" ? (<Button variant="outlined" onClick={() => {setUserState(values?.row?.id);setModalOpen(true)}} className="ms-2 border-danger text-danger">لغو سفارش</Button>)

          : (

            values?.value === "success" ? 'انجام شده' : 
            values?.value === "cancel_by_user" ? 'توسط کاربر لغو شده' : 
            values?.value === "failed" ? 'ناموفق' : 
            values?.value === "pending" ? 'درحال انتظار':'' 
            

          )

        }
      </div>
    }
  ];

  const [params, setParams] = React.useState({order: "-updated_at", status__in: "in_progress", size: 10, page: 0});
  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, []);
  const [{ data: cancelData ,isLoading: cancelLoading }, cancelOrder] = useFetchApi(undefined, {});

  const handleAction = (approve) => {

    console.log("id",approve)
    
    cancelOrder("DELETE", TRADING_APP, CANCEL_ORDERS(approve))
    setTimeout( () => doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, {...params}) ), 1500)

  }
  const handleCancel = id => {
    if (id){
      // cancelOrder("DELETE", TRADING_APP, CANCEL_ORDERS(id))
      // setTimeout( () => doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, {...params}) ), 1500)
      return 
    }
  }
  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      return item.user = update

    })

  }

    React.useEffect( () => {
        doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, {...params}) )
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
                <p className="font_title_name me-1" style={{minWidth: "150px"}}>سفارش‌های باز </p>
              </div>
            </div>
              <Filters params={params} setParams={setParams} />
            <div className="d-flex px-3">
                <div style={{ flexGrow: 1, width: "100%", height: "100%"}}>
                <DataGrid
                    style={{border: 0}}
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
                    rowCount={data?.total}
                    paginationMode="server"
                    onPageChange={ (param) => doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, {...params, page: param}) )}
                    disableSelectionOnClick
                    disableColumnMenu
                />
                </div>
            </div>
        </div>
    )
}

export default OrdersDatagrid
