import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { useFetchApi } from "../../../../utils/hooks";
import { ACCOUNTING_APP, ADMIN_BASE_URL, USERS_TRANSACTION_HISTORY, WITHDRAWS_LIST } from '../../../../utils/constants';
import { timeToStr, UrlQuery } from '../../../../utils/utils';
import { useHistory, useParams } from 'react-router-dom';
import Filters from './filters';
import { numDiscriminant } from '../../../../utils/discriminant';
import { round_hundred_thousand } from '../../../../utils/math-round';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import copy from '../../../../assets/content_copy-24px.svg'
import CopyToClipboard from '../../../../utils/copy-to-clipboard';


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

function UserWithdrawsDataGrid(props) {

  const [showToolTip, setShowToolTip] = useState(false);

  const history = useHistory()

  const renderToolTipSuccess = <Tooltip id="copied">Copied!</Tooltip>

  const renderNothing = <div />

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
      field: 'crypto',
      headerName: 'نوع ارز',
      flex: 0.5,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => params.row?.wallet?.c_type
    },
    {
      field: 'amount',
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
          {params.row?.wallet?.c_type}
        </div>
    },
    {
      field: 'dest_address',
      headerName: 'مقصد برداشت',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) => {

        let renderTooltip = (props) => (

          <Tooltip id="button-tooltip" {...props}>

            {values.value}

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

                {values.value?.slice(-5)}...

              </Button>

            </OverlayTrigger>

            <OverlayTrigger trigger="click" placement="top" overlay={showToolTip ? renderToolTipSuccess : renderNothing} rootClose>

              <span id="basic-addon3"

                onClick={() => {

                  CopyToClipboard(values.value)


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
      field: 'amount_with_fee',
      headerName: 'کارمزد',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (params) =>
        <div>
          {round_hundred_thousand(params?.row?.amount - params.value) + ' ' + params.row.wallet.c_type}
        </div>

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
          params?.row?.status === "in_progress" ? ('در حال بررسی')
            : params?.row?.status === "success" ? ('انجام شده')
              : params?.row?.status === "canceled" ? 'انجام نشده'
                : params?.row?.status === "failed" ? 'ناموفق'
                  : params?.row?.status === "rejected" ? 'لغو شده'
                    : null
        }
      </div>
    },
    {
      field: 'tracking_codes',
      headerName: 'کدرهگیری',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: .5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (params) => `${params.row?.tracking_code.slice(0, 8)}`
    },
  ];
  const [params, setParams] = React.useState({ page: 1, size: 10 })

  const { id } = useParams()

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])
  const [{ data: withdrawData, isLoading: withdrawLoading }, updateWithdraw] = useFetchApi(undefined, {});

  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      console.log("update", update);

      return item.user = update

    })

  }
  React.useEffect(() => {
    if (id) {
      doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params, owner_id: id }))
    }
  }, [])

  React.useEffect(() => {

    updateData()

  }, [data])



  return (
    <div className="content">
      <div className="mt-5"></div>
      <div className=" d-flex align-items-center w-auto mx-auto mt-5 pt-5">
        <div className="d-flex">
          <img src="/assets/drawer/Polygon.svg" />
          <div className="font_title_name me-1 d-block" style={{ minWidth: "150px" }}>درخواست برداشت </div>
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
            rows={data?.results ?? []}
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
            rowCount={data?.results?.length}
            paginationMode="server"
            onPageChange={(param) => doFetch("GET", ACCOUNTING_APP, UrlQuery(WITHDRAWS_LIST, { ...params, owner_id: id, page: param + 1 }))}
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  )
}

export default UserWithdrawsDataGrid
