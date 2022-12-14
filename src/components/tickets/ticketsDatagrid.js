import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import {Pagination} from '@material-ui/lab';
import {useFetchApi} from "../../utils/hooks";
import { IAM_APP, TICKETS_LIST, USERS_ORDERS } from '../../utils/constants';
import { timeToStr, UrlQuery } from '../../utils/utils';
import { useHistory, useParams } from 'react-router-dom';
import Filters from './filters';


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

const rows = [
  {
    id :1,
    tracking_code: "412515",
    owner_id: "پیام سری ۲",
    national_code: "55457575",
    origin_wallet: "btc",
    quantity: "2.3",
    dest_wallet: "تست تستیانی",
    action: "approve",
    status: "in_progress",
  },
  {
    id :2,
    tracking_code: "412515",
    owner_id: "پیام سری",
    national_code: "55457575",
    origin_wallet: "تست تستیانی",
    date: "2.3",
    dest_wallet: "علی تستی",
    action: "approve",
    status: "in_progress",
  },
  {
    id :3,
    tracking_code: "412515",
    owner_id: "fjasfkljas",
    national_code: "55457575",
    origin_wallet: "btc",
    quantity: "2.3",
    dest_wallet: "",
    action: "approve",
    status: "in_progress",
  },
]


function TicketsDatagrid(props) {

  const history = useHistory()

  const columns = [
    {
      field: 'id',
      headerName: 'شماره',
      flex:1,
      type: 'string',
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      // renderCell: (values) => `${values.row?.tracking_code.slice(0, 8)}`
    },
    {
      field: 'title',
      headerName: 'موضوع',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      // renderCell: (values) => (
      //   <div className="d-flex">
      //        <span>{values.row?.origin_wallet} - {values.row?.dest_wallet}</span>
      //   </div>
      // )
    },
    {
      field: 'user',
      headerName: 'فرستنده',
      flex: 1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
            <span className="">{values?.value?.credentials?.first_name} {values?.value?.credentials?.last_name}</span>
        </div>
      )
    },
    {
      field: 'priority',
      headerName: 'اولویت',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
             {values.row?.priority === "high" ? "بالا" : (values.row?.priority === "medium" ? "متوسط" : "پایین") }
        </div>
      )
    },
    {
      field: 'state',
      headerName: 'وضعیت',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (
        <div className="d-flex">
             {values.row?.state === "open" ? "باز" : ( values.row?.state === "close" ? "بسته" : "در انتظار" )}
        </div>
      )
    },
    {
      field: 'created_at',
      headerName: 'تاریخ',
      flex:1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      valueFormatter: data => timeToStr(data.value, "HH:mm  -   jYYYY/jMM/jDD")
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
      renderCell: (values) => (
        <Button variant="contained" color="primary" onClick={ () => history.push(`/tickets/detail/${values?.row?.id}`) } className="ms-2">مشاهده تیکت</Button>
      )
    }
  ];

  const [params, setParams] = React.useState({ size: 10, page: 1})
  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

    React.useEffect( () => {
        doFetch("GET", IAM_APP, UrlQuery(TICKETS_LIST, {...params}) )
    }, [params])

    return (
        <div className="content">
            <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">
              <div className="d-flex">
                <img src="/assets/drawer/Polygon.svg" />
                <p className="font_title_name me-1" style={{minWidth: "150px"}}>لیست تیکت‌ها</p>
              </div>
              <Filters params={params} setParams={setParams} />
            </div>
            <div className="d-flex px-3">
                <div style={{ flexGrow: 1, width: "100%", height: "100%"}}>
                <DataGrid
                    style={{border: 0}}
                    autoHeight
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
                    onPageChange={ (param) => doFetch("GET", IAM_APP, UrlQuery(TICKETS_LIST, {...params, page: param + 1}) )}
                    disableSelectionOnClick
                    disableColumnMenu
                />
                </div>
            </div>
        </div>
    )
}

export default TicketsDatagrid
