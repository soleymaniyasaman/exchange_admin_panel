import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../utils/hooks";

import { ADMIN_BASE_URL, IAM_APP, TRADING_APP, USERS_LIST, USERS_TRADES } from '../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { round, round_hundred_thousand } from '../../../utils/math-round'

import { numDiscriminant } from '../../../utils/discriminant'



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



function TradesHistoryDatagrid(props) {



  const history = useHistory()



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

      renderCell: (params) => `${params.row?.tracking_code.slice(0, 8)}`

    },

    {

      field: 'market',

      headerName: 'بازار',

      flex: 0.5,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => `${params.row?.buy_order.dest_wallet}-${params.row?.buy_order.origin_wallet}`

    },

    {

      field: 'type',

      headerName: 'سمت',

      flex: 0.5,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => (

        <div className="d-flex">

          {console.log("params", params)}

          {params.row?.type === "sell" ? <span className="text-danger">فروش</span> : <span className="text-success">خرید</span>}

        </div>

      )

    },

    {

      field: 'dest_wallet',

      headerName: 'نوع سفارش',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => `${params.row?.match_type === "limit" ? "محدود" : "سریع"}`

    },

    {

      field: 'user_name',

      headerName: 'نام کاربر',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.first_name} ${values.row?.user[0]?.credentials.last_name}`



    },

    {

      field: 'user_nationalcode',

      headerName: 'کد ملی',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.national_code}`



    },

    {

      field: 'amount',

      headerName: 'قیمت سفارش',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => `${numDiscriminant(round(params.row?.amount))} ${params.row?.buy_order.origin_wallet === "irr" ? "تومان" : "تتر"}`



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

      renderCell: (params) => `${numDiscriminant(params.row?.quantity)}`



    },

    {

      field: 'total',

      headerName: 'مبلغ کل(تومان)',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => `${(params?.row?.amount) * (params?.row?.quantity) == "0" ? "0" : numDiscriminant(round((params?.row?.amount) * (params?.row?.quantity)))}`

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

        let commission = params.row?.type === "buy" ? params.row?.buy_order.commission_percentage : params.row?.sell_order.commission_percentage

        let destWalletName = params.row?.type === "buy" ? params.row?.buy_order.dest_wallet : params.row?.sell_order.dest_wallet

        let originWallet = params.row?.buy_order.origin_wallet === "btc" ? " بیتکوین" : params.row?.buy_order.origin_wallet === "usdt" ? "تتر" : params.row?.buy_order.origin_wallet === "irr" ? "تومان" : params.row?.buy_order.origin_wallet === "eth" ? "اتریوم" : params.row?.buy_order.origin_wallet === "trx" ? "ترون" : params.row?.buy_order.origin_wallet === "eos" ? "ایاس" : params.row?.buy_order.origin_wallet === "ada" ? "آدا" : params.row?.buy_order.origin_wallet === "xlm" ? "استلار" : params.row?.buy_order.origin_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.origin_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.origin_wallet === "doge" ? "دوج" : params.row?.buy_order.origin_wallet === "bch" ? "بیتکوین کش" : null

        return `${(commission * params.row?.quantity ) == "0" || (commission * (params?.row?.amount) * (params?.row?.quantity)) == "0" ? "0" : params.row?.type === "buy"? numDiscriminant(round_hundred_thousand(commission * params.row?.quantity)) : numDiscriminant(round_hundred_thousand(commission * (params?.row?.amount) * (params?.row?.quantity)))} ${ params.row?.type === "buy"? destWalletName : originWallet}`

      }

    },

    {

      field: 'income',

      headerName: 'دریافتی',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => {

        let commission = params.row?.type === "buy" ? params.row?.buy_order.commission_percentage : params.row?.sell_order.commission_percentage

        let destWalletName = params.row?.type === "buy" ? params.row?.buy_order.dest_wallet : params.row?.sell_order.dest_wallet

        let originWallet = params.row?.buy_order.origin_wallet === "btc" ? " بیتکوین" : params.row?.buy_order.origin_wallet === "usdt" ? "تتر" : params.row?.buy_order.origin_wallet === "irr" ? "تومان" : params.row?.buy_order.origin_wallet === "eth" ? "اتریوم" : params.row?.buy_order.origin_wallet === "trx" ? "ترون" : params.row?.buy_order.origin_wallet === "eos" ? "ایاس" : params.row?.buy_order.origin_wallet === "ada" ? "آدا" : params.row?.buy_order.origin_wallet === "xlm" ? "استلار" : params.row?.buy_order.origin_wallet === "ltc" ? "لایت کوین" : params.row?.buy_order.origin_wallet === "bnb" ? "بایننس کوین" : params.row?.buy_order.origin_wallet === "doge" ? "دوج" : params.row?.buy_order.origin_wallet === "bch" ? "بیتکوین کش" : null

        return params.row?.type === "buy" ? `${numDiscriminant(round_hundred_thousand(params.row?.quantity - (commission * params.row?.quantity)))} ${destWalletName}` : `${numDiscriminant(round(((params?.row?.amount) * (params?.row?.quantity)) - commission))} ${originWallet}`

        // {type === "buy" ? `${numDiscriminant(round_hundred_thousand(item.quantity - (commission * item.quantity)))} ${destWalletName}` : `${numDiscriminant(round_hundred_thousand(item.amount - (commission * item.amount)))} ${originWallet}`}

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



  const [params, setParams] = React.useState({ order: "-updated_at", size: 10, page: 0 })

  const [{ data, isLoading , hasError }, doFetch] = useFetchApi(undefined, [])


  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      return item.user = update

    })

  }

  React.useEffect(() => {

    doFetch("GET", TRADING_APP, UrlQuery(USERS_TRADES, { ...params }))

  }, [params])


  React.useEffect(() => {

    updateData()

  }, [data])


  return (

    <div className="content">

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تاریخچه معاملات </p>

        </div>

      </div>

        <Filters params={params} setParams={setParams} />

      <div className="d-flex px-0">

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

            rowCount={data?.total}

            paginationMode="server"

            onPageChange={(param) =>  doFetch("GET", TRADING_APP, UrlQuery(USERS_TRADES, { ...params, page: param }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default TradesHistoryDatagrid

