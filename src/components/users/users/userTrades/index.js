import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../../utils/hooks";

import { ADMIN_BASE_URL, TRADING_APP, USERS_TRADES } from '../../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { numDiscriminant } from '../../../../utils/discriminant';

import { round_hundred_thousand } from '../../../../utils/math-round'

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

function UserTradesDataGrid(props) {

  const history = useHistory()

  const { id } = useParams()


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

          {params.row?.buy_order?.owner_id == id ? params.row?.buy_order?.type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span> : params.row?.sell_order?.type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span>}

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

      renderCell: (params) => (

        <div className="d-flex">

          {params.row?.buy_order?.owner_id == id ? <span className="">{params.row?.buy_order.dest_wallet}-{params.row?.buy_order.origin_wallet}</span> : <span className="">{params.row?.sell_order.dest_wallet}-{params.row?.sell_order.origin_wallet}</span>}

        </div>

      )

    },

    {

      field: 'unit_price',

      headerName: 'قیمت معامله',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) =>
        <div>
          {numDiscriminant(params.row?.buy_order.owner_id == id ? params.row?.buy_order.unit_price ? params.row?.buy_order.unit_price : params.row?.buy_order.average_unit_price : params.row?.sell_order.owner_id == id ? params.row?.sell_order.unit_price ? params.row?.sell_order.unit_price : params.row?.sell_order.average_unit_price : null)}
          {params.row?.buy_order?.owner_id == id ? params.row?.buy_order?.type === "sell" ? <span className="ms-1">{params.row?.buy_order?.dest_wallet}</span> : <span className="ms-1">{params.row?.buy_order?.origin_wallet}</span> : params.row?.sell_order?.type === "sell" ? <span className="ms-1">{params.row?.sell_order?.dest_wallet}</span> : <span className="ms-1">{params.row?.sell_order?.origin_wallet}</span>}
        </div>

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

      renderCell: (params) =>
        <div>
          {numDiscriminant(params.value)}
          {params.row?.buy_order?.owner_id == id ? params.row?.buy_order?.type === "sell" ? <span className="ms-1">{params.row?.buy_order?.origin_wallet}</span> : <span className="ms-1">{params.row?.buy_order?.dest_wallet}</span> : params.row?.sell_order?.type === "sell" ? <span className="ms-1">{params.row?.sell_order?.origin_wallet}</span> : <span className="ms-1">{params.row?.sell_order?.dest_wallet}</span>}
        </div>


    },

    {

      field: 'amount',

      headerName: 'مبلغ کل',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) =>
        <div>
          {/* {numDiscriminant((params?.row?.amount) * (params?.row?.quantity))} */}
          {numDiscriminant(params.value)}
          {params.row?.buy_order?.owner_id == id ? params.row?.buy_order?.type === "sell" ? <span className="ms-1">{params.row?.buy_order?.dest_wallet}</span> : <span className="ms-1">{params.row?.buy_order?.origin_wallet}</span> : params.row?.sell_order?.type === "sell" ? <span className="ms-1">{params.row?.sell_order?.dest_wallet}</span> : <span className="ms-1">{params.row?.sell_order?.origin_wallet}</span>}

        </div>

    },

    {

      field: 'commission',

      headerName: 'کارمزد',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 0.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => {
        let commission = params.row?.buy_order.owner_id == id ? params.row?.buy_order.commission_percentage : params.row?.sell_order.owner_id == id ? params.row?.sell_order.commission_percentage : null
        let originWallet = params.row?.buy_order.origin_wallet === "btc" ? " بیتکوین" : params.row?.buy_order.origin_wallet === "usdt" ? "تتر" : params.row?.buy_order.origin_wallet === "irr" ? "تومان" : params.row?.buy_order.origin_wallet === "eth" ? "اتریوم" : params.row?.buy_order.origin_wallet === "trx" ? "ترون" : params.row?.buy_order.origin_wallet === "eos" ? "ایاس" : params.row?.buy_order.origin_wallet === "ada" ? "آدا" : params.row?.buy_order.origin_wallet === "xlm" ? "استلار" : params.row?.buy_order.origin_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.origin_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.origin_wallet === "doge" ? "دوج" : params.row?.buy_order.origin_wallet === "bch" ? "بیتکوین کش" : null
        let destWallet = params.row?.buy_order.dest_wallet === "btc" ? "بیتکوین" : params.row?.buy_order.dest_wallet === "irr" ? "تومان" : params.row?.buy_order.dest_wallet === "usdt" ? "تتر" : params.row?.buy_order.dest_wallet === "eth" ? "اتریوم" : params.row?.buy_order.dest_wallet === "trx" ? "ترون" : params.row?.buy_order.dest_wallet === "eos" ? "ایاس" : params.row?.buy_order.dest_wallet === "ada" ? "آدا" : params.row?.buy_order.dest_wallet === "xlm" ? "استلار" : params.row?.buy_order.dest_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.dest_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.dest_wallet === "doge" ? "دوج" : params.row?.buy_order.dest_wallet === "bch" ? "بیتکوین کش" : null

        return (

          <div className="d-flex">
            {params.row?.buy_order?.owner_id == id ? commission * params.row?.quantity === 0 ? 0 : `${numDiscriminant(round_hundred_thousand(commission * params.row?.quantity))} ${destWallet}` : commission * params.row?.amount === 0 ? 0 : `${numDiscriminant(round_hundred_thousand(commission * params.row?.amount))}${originWallet}`}
          </div>

        )
      }
    },

    {

      field: 'status',

      headerName: 'دریافتی',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => {
        let commission = params.row?.buy_order.owner_id == id ? params.row?.buy_order.commission_percentage : params.row?.sell_order.owner_id == id ? params.row?.sell_order.commission_percentage : null
        let originWallet = params.row?.buy_order.origin_wallet === "btc" ? " بیتکوین" : params.row?.buy_order.origin_wallet === "usdt" ? "تتر" : params.row?.buy_order.origin_wallet === "irr" ? "تومان" : params.row?.buy_order.origin_wallet === "eth" ? "اتریوم" : params.row?.buy_order.origin_wallet === "trx" ? "ترون" : params.row?.buy_order.origin_wallet === "eos" ? "ایاس" : params.row?.buy_order.origin_wallet === "ada" ? "آدا" : params.row?.buy_order.origin_wallet === "xlm" ? "استلار" : params.row?.buy_order.origin_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.origin_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.origin_wallet === "doge" ? "دوج" : params.row?.buy_order.origin_wallet === "bch" ? "بیتکوین کش" : null
        let destWallet = params.row?.buy_order.dest_wallet === "btc" ? "بیتکوین" : params.row?.buy_order.dest_wallet === "irr" ? "تومان" : params.row?.buy_order.dest_wallet === "usdt" ? "تتر" : params.row?.buy_order.dest_wallet === "eth" ? "اتریوم" : params.row?.buy_order.dest_wallet === "trx" ? "ترون" : params.row?.buy_order.dest_wallet === "eos" ? "ایاس" : params.row?.buy_order.dest_wallet === "ada" ? "آدا" : params.row?.buy_order.dest_wallet === "xlm" ? "استلار" : params.row?.buy_order.dest_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.dest_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.dest_wallet === "doge" ? "دوج" : params.row?.buy_order.dest_wallet === "bch" ? "بیتکوین کش" : null

        return (<div className="d-flex justify-content-center w-100">

          {params.row?.buy_order?.owner_id == id ? `${numDiscriminant(round_hundred_thousand(params.row?.quantity - (commission * params.row?.quantity)))} ${destWallet}` : `${numDiscriminant(round_hundred_thousand(params.row?.amount - (commission * params.row?.amount)))} ${originWallet}`}


          {

            params?.row?.status === "in_progress" ? ('')

              : ('')

          }

        </div>)
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

  ];

  const [params, setParams] = React.useState({ status__in: "success", size: 10, page: 1 })


  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

  React.useEffect(() => {

    if (id) {

      doFetch("GET", TRADING_APP, UrlQuery(USERS_TRADES, { ...params, owner_id: id }))

    }

  }, [params])
  console.log("data created at", data)

  return (

    <div className="content">

      <div className="mt-5"></div>

      <div className=" d-flex align-items-center w-auto mx-auto mt-5 pt-5">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1">معاملات </p>

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

            rowHeight={52}

            isRowSelectable={false}

            components={{

              Pagination: CustomPagination

            }}

            pageSize={10}

            rowCount={data?.total}

            paginationMode="server"

            onPageChange={(param) => doFetch("GET", TRADING_APP, UrlQuery(USERS_TRADES, { ...params, owner_id: id, page: param + 1 }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default UserTradesDataGrid

