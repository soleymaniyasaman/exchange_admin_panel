import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../utils/hooks";

import { ACCOUNTING_APP, ADMIN_BASE_URL, USERS_TRANSACTION_HISTORY, USERS_PAYMENT } from '../../../utils/constants';

import { timeToStr, UrlQuery } from '../../../utils/utils';

import { useHistory, useParams } from 'react-router-dom';

import Filters from './filters';

import { numDiscriminant } from '../../../utils/discriminant';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import CopyToClipboard from '../../../utils/copy-to-clipboard';

import copy from '../../../assets/content_copy-24px.svg'





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



function RialDepositsHistoryDatagrid(props) {

  const [showToolTip, setShowToolTip] = React.useState(false);

  const history = useHistory()

  const renderToolTipSuccess = <Tooltip id="copied">Copied!</Tooltip>

  const renderNothing = <div />

  const columns = [

    {

      field: 'tracking_code',

      headerName: 'شناسه سفارش',

      flex: 0.5,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => `${values.row?.tracking_code.slice(-9)}...`

    },

    // {

    //   field: 'crypto_type',

    //   headerName: 'نوع ارز',

    //   flex: 0.5,

    //   sortable: false,

    //   headerClassName: 'grid-header',

    //   headerAlign: 'center',

    //   align: 'center',

    //   renderCell: (values) => 'تومان'


    // },

    {

      field: 'type',

      headerName: 'نوع واریز',

      flex: 0.5,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (values) => ' واریز تومانی '


    },

    {

      field: 'user_name',

      headerName: 'نام کاربر',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 0.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.first_name} ${values.row?.user[0]?.credentials.last_name}`

    },
    {

      field: 'national_code',

      headerName: 'کد ملی',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 0.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => `${values.row?.user[0]?.credentials.national_code}`

    },

    {

      field: 'quantity_with_fee',

      headerName: 'مقدار واریز',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 0.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => `${numDiscriminant(values.row?.amount)}`



    },

    {

      field: 'user',

      headerName: 'شماره شبا مبدا',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {
        let sheba
        
        console.log("values",values)
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

    // {

    //   field: 'status',

    //   headerName: 'دریافتی',

    //   // description: 'This column has a value getter and is not sortable.',

    //   sortable: false,

    //   align: 'center',

    //   flex: 1,

    //   headerClassName: 'grid-header',

    //   headerAlign: 'center',

    // },

    
    {
      
      field: 'created_at',
      
      headerName: 'تاریخ',
      
      // description: 'This column has a value getter and is not sortable.',
      
      sortable: false,
      
      align: 'center',
      
      flex: 0.5,
      
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

      flex: 0.5,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (values) => {

        let text = values.row?.status === "success" ? "موفق" : values.row?.status === "in_progress" ? "درحال بررسی" : "ناموفق"

        let pic = values.row?.status === "success" ? "/assets/drawer/check_circle-24px.svg" : values.row?.status === "in_progress" ? '' : "/assets/drawer/cancel-24px (1).svg"

        return <div className="d-flex justify-content-center w-100">

          {text}

          <img src={pic} />

        </div>

      }

    },
  ];



  const [params, setParams] = React.useState({ order: "-updated_at", size: 10, page: 0 })

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      // console.log("update", update);

      return item.user = update

    })

  }

  React.useEffect(() => {

    doFetch("GET", ACCOUNTING_APP, UrlQuery(USERS_PAYMENT, params))

  }, [params])


  React.useEffect(() => {

    updateData()

  }, [data])

console.log("data",data)

  return (

    <div className="content">

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1" style={{ minWidth: "150px" }}>تاریخچه واریزها </p>

        </div>


      </div>
        <Filters params={params} setParams={setParams} />

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

            onPageChange={(param) => doFetch("GET", ACCOUNTING_APP, UrlQuery(USERS_PAYMENT, { ...params, page: param }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default RialDepositsHistoryDatagrid

