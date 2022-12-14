import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { useFetchApi } from "../../../../utils/hooks";
import { ACCOUNTING_APP, USERS_TRANSACTION_HISTORY, USERS_WALLET } from '../../../../utils/constants';
import { UrlQuery } from '../../../../utils/utils';
import { useHistory, useParams } from 'react-router-dom';
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import CopyToClipboard from '../../../../utils/copy-to-clipboard';
import copy from '../../../../assets/content_copy-24px.svg'
import WalletChart from './walletChart';
import WalletApi from '../../../../utils/wallet';
import { numDiscriminant } from '../../../../utils/discriminant'
import { round } from '../../../../utils/math-round'
import { UserContext } from '../../../../context/provider';

const useStyles = makeStyles({
  root: {
    // display: 'flex',
    margin: '0 auto',
  },
});

const stat = {

  series: [472000, 220000, 250000],
  options: {
    labels: ["بیت کوین BTC", "تتر USDT", "اتریوم ETH"],
    chart: {
      id: "graphId"
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      fontSize: '16px',
      fontFamily: 'IranSans',
      fontWeight: 600,
      formatter: function (seriesName, opts) {
        return [opts.w.globals.series[opts.seriesIndex], seriesName]
      }
    }
  },
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

function UserWalletsDataGrid(props) {
  const [showToolTip, setShowToolTip] = useState(false);
  const [chartValue, setChartValue] = useState([]);
  const contextData = useContext(UserContext);

  const priceValue = []

  const history = useHistory()
  const renderToolTipSuccess = <Tooltip id="copied">Copied!</Tooltip>
  const renderNothing = <div />
  const runPrice = (item) => {

    let price = item.price && item.price[0] && item.price[0].current_price ? item.quantity * item.price[0].current_price * contextData.usdtIrr?.current_price : item.quantity

    priceValue.push(price)

    return price

  }
  const columns = [
    {
      field: 'tracking_code',
      headerName: 'نوع کیف پول',
      flex: 1,
      type: 'string',
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => (

        <div className="d-flex">

          <span>{values.row?.c_type}</span>

        </div>

      )
    },
    {
      field: 'quantity',
      headerName: 'مقدار',
      flex: 1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (param) => {
        let txt = "";
        switch (param.row?.c_type) {
          case "irr":
            txt = "ریال";
          case "usdt":
            txt = "تتر";
          case "eth":
            txt = "اتریوم";
          case "btc":
            txt = "بیتکوین";
          case "trx":
            txt = "ترون";
          case "eos":
            txt = "ایاس";
          case "ada":
            txt = "آدا";
          case "xlm":
            txt = "استلار";
          case "ltc":
            txt = "لایت کوین";
          case "bnb":
            txt = "بایننس کوین";
          case "doge":
            txt = "دوج";
          case "bch":
            txt = "بیتکوین کش";
          default:
            txt = ""
        }
        console.log("param", txt)

        return <span>{param.value} {txt}</span>
      }
    },
    {
      field: 'commission2',
      headerName: 'ارزش تومانی',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (param) => param.row?.c_type === "irr" ? numDiscriminant(round(param.row?.quantity)) : param.row?.quantity === 0 ? 0 : numDiscriminant(round(runPrice(param.row)))

    },
    {
      field: 'addresses',
      headerName: 'آدرس کیف پول',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (param) => {
        return param.value && param.value[0]?.address
      },
      renderCell: (param) => {

        let renderTooltip = (props) => (

          <Tooltip id="button-tooltip" {...props}>

            {param.value && param.value[0]?.address}

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

                {param.value && param.value[0]?.address?.slice(-5)}...

              </Button>

            </OverlayTrigger>

            <OverlayTrigger trigger="click" placement="top" overlay={showToolTip ? renderToolTipSuccess : renderNothing} rootClose>

              <span id="basic-addon3"

                onClick={() => {

                  CopyToClipboard(param.value && param.value[0]?.address)


                  setShowToolTip(true)

                  setTimeout(() => { setShowToolTip(false) }, 2000);

                }}

              >

                <img alt="" src={copy} class="w-50" role="button" />

              </span>

            </OverlayTrigger>

          </>
        )
      }
    },
    {
      field: 'created_at',
      headerName: 'واریز',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
    },
  ];

  const { id } = useParams()

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

  const toggle = (e) => {
    ApexCharts.exec('graphId', 'toggleSeries', e.target.value);
  }

  console.log("id", data)
  React.useEffect(() => {
    if (id) {
      doFetch("GET", ACCOUNTING_APP, USERS_WALLET(id))
    }
  }, [data.length])

  React.useEffect(() => {

    if (data) {
      data.map(item => chartValue.push({ name: item.c_type, quantity: item.quantity, value: item.quantity }))
    }
  }, [data]);
  console.log("wallet", data)
  console.log("chart value", chartValue)

  return (
    <div className="content">
      <WalletApi walletData={data} />
      <div className="mt-5"></div>
      <div className=" d-flex align-items-center w-auto mx-auto mt-5 pt-5">
        <img src="/assets/drawer/Polygon.svg" />
        <p className="font_title_name me-1">کیف پول‌ها </p>
      </div>
      <div className="d-flex px-3">
        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
          <DataGrid
            style={{ border: 0 }}
            autoHeight
            classes={{
              root: "grid-header-wrapper-alt"
            }}
            rows={data ?? []}
            loading={isLoading}
            columns={columns}
            getRowClassName={
              params => 'grid-content-alt'
            }
            rowHeight={52}
            getRowId={(rows) => rows?.tracking_code}
            hideFooterPagination
            isRowSelectable={false}
            components={{
              Pagination: false
            }}
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>
      <div className=" d-flex align-items-center w-auto mx-auto mt-5 pt-5">
        <img src="/assets/drawer/Polygon.svg" />
        <p className="font_title_name me-1">سهم از دارایی کیف پول</p>
      </div>
      <div className="content-dark">
        <span className="text-white">
          ارزش تخمینی کل دارایی : 2522225555
        </span>
        <div className="w-100 d-flex container-fluid">
          <WalletChart chartValue={chartValue && chartValue} />
          {/* <Chart height="320" options={stat.options} series={stat.series} type="donut" /> */}
        </div>
      </div>
    </div>
  )
}

export default UserWalletsDataGrid
