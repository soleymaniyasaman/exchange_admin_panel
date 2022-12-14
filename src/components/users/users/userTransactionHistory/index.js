import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { useFetchApi } from "../../../../utils/hooks";
import { ACCOUNTING_APP, ADMIN_BASE_URL, USERS_TRANSACTION_HISTORY } from '../../../../utils/constants';
import { timeToStr, UrlQuery } from '../../../../utils/utils';
import { useHistory, useParams } from 'react-router-dom';
import Filters from './filters';
import { numDiscriminant } from '../../../../utils/discriminant';

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

function UserTransactionHistoryDataGrid(props) {

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
      renderCell: (values) => `${values.row?.tracking_code.slice(0, 8)}`
    },
    {
      field: 'type',
      headerName: 'نوع تراکنش',
      flex: 1,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => {
        let className = ''
        let text = ''
        switch (values.row?.type) {
          case "sell":
            className = "text-danger"
            text = "فروش"
            break;
          case "buy":
            className = "text-success"
            text = "خرید"
            break;
          case "increase":
            className = "text-success"
            text = "واریز"
            break;
          case "decrease":
            className = "text-danger"
            text = "برداشت"
            break;
        }
        return <div className="d-flex">
          <span className={className}>{text}</span>
        </div>
      }
    },
    {
      field: 'crypto_type',
      headerName: 'نوع ارز',
      flex: 0.5,
      sortable: false,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (values) => values.row.wallet.c_type.toUpperCase()
    },
    {
      field: 'quantity_with_fee',
      headerName: 'مقدار',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 0.5,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: (values) =>
        <div>
          {numDiscriminant(values.value)}
          <span className="ms-1">{values.row.wallet.c_type.toUpperCase()}</span>
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
      renderCell: (values) =>
        <div>
          {values.value}
          <span className="ms-1">{values.row.wallet.c_type.toUpperCase()}</span>
        </div>
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      align: 'center',
      flex: 1,
      headerClassName: 'grid-header',
      headerAlign: 'center',
      renderCell: values => values.value ? values.value : '_'
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
      renderCell: (values) => {
        let text = values.row?.status === "success" ? "موفق" : "ناموفق"
        let pic = values.row?.status === "success" ? "/assets/drawer/check_circle-24px.svg" : "/assets/drawer/cancel-24px (1).svg"
        return <div className="d-flex justify-content-center w-100">
          <img src={pic} />
          {text}
        </div>
      }
    },
  ];

  const [params, setParams] = React.useState({ page: 0, size: 10 })
  const { id } = useParams()

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

  const updateData = () => {

    data?.results?.map((item, index) => {

      let update = data?.users_info?.filter((itm, idx) => idx === index)

      console.log("update", update);

      return item.user = update

    })

  }

  React.useEffect(() => {
    if (id) {
      doFetch("GET", ACCOUNTING_APP, UrlQuery(USERS_TRANSACTION_HISTORY, { ...params, owner_id: id }))
    }
  }, [params])

  React.useEffect(() => {

    updateData()

  }, [data])
  return (
    <div className="content">
      <div className="mt-5"></div>
      <div className=" d-flex align-items-center w-auto mx-auto mt-5 pt-5">
        <div className="d-flex">
          <img src="/assets/drawer/Polygon.svg" />
          <p className="font_title_name me-1">تراکنش‌ها </p>
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
            onPageChange={(param) => doFetch("GET", ACCOUNTING_APP, UrlQuery(USERS_TRANSACTION_HISTORY, { ...params, owner_id: id, page: param }))}
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  )
}

export default UserTransactionHistoryDataGrid
