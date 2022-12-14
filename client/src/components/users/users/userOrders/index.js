import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../../utils/hooks";

import { ADMIN_BASE_URL, BASE_URL, TRADING_APP, USERS_ORDERS } from '../../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { numDiscriminant } from '../../../../utils/discriminant';
import { round_ten_thousand } from '../../../../utils/math-round';


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

function UserOrdersDataGrid(props) {

  const history = useHistory()

  const columns = [

    {

      field: 'tracking_code',

      headerName: 'شناسه',

      flex: 1,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => `${params.row?.tracking_code.slice(0, 8)}`

    },

    {

      field: 'type',

      headerName: 'سمت سفارش',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => (

        <div className="d-flex">

          {params.row?.trade_type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span>}

        </div>

      )

    },

    {

      field: 'trade_type',

      headerName: 'نوع سفارش',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => (

        <div className="d-flex">

          {params.row?.trade_type === "limit" ? "محدود" : "سریع"}

        </div>

      )

    },

    {

      field: 'dest_wallet',

      headerName: 'نوع ارز',

      flex: 0.5,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

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

      renderCell: (params) => numDiscriminant(params.value)

    },

    {

      field: 'average_unit_price',

      headerName: ' میانگین قیمت سفارش',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => numDiscriminant(params.value)


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

      renderCell: (params) => numDiscriminant(params.value)


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

      renderCell: (params) => numDiscriminant((params?.row?.unit_price) * (params?.row?.quantity))

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

      renderCell: (params) => <div className="d-flex justify-content-center w-100">
        {

          params?.value === "in_progress" ? (<Button variant="outlined" onClick={() => { }} className="ms-2 border-danger text-danger">لغو سفارش</Button>)

            : (

              params?.value === "success" ? 'انجام شده' :
                params?.value === "cancel_by_user" ? 'توسط کاربر لغو شده' :
                  params?.value === "failed" ? 'ناموفق' :
                    params?.value === "pending" ? 'درحال انتظار' : ''


            )

        }

      </div>

    }

  ];

  const [params, setParams] = React.useState({ order: "-updated_at", size: 10, page: 1 })

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

  const { id } = useParams()

  React.useEffect(() => {

    if (id) {

      console.log("result", params)

      doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, { ...params, owner_id: id }))

    }

  }, [params])

  return (

    <div className="content">

      <div className="mt-5"></div>

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto mt-5 pt-5">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1">سفارش‌ها </p>

        </div>

        <Filters params={params} setParams={setParams} />

      </div>

      <div className="d-flex px-3">

        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>

          <DataGrid

            style={{ border: 0 }}

            autoHeight

            classes={{

              root: "grid-header-wrapper-alt"

            }}

            rows={data?.items ?? []}

            loading={isLoading}

            columns={columns}

            getRowClassName={

              params => 'grid-content-alt'

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

            onPageChange={(param) => doFetch("GET", TRADING_APP, UrlQuery(USERS_ORDERS, { ...params, owner_id: id, page: param + 1 }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default UserOrdersDataGrid

