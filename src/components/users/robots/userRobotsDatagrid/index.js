import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button, Grid } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../../utils/hooks";

import { IAM_APP, USERS_LIST } from '../../../../utils/constants';

import { UrlQuery } from '../../../../utils/utils';

import { useHistory } from 'react-router-dom';

import { Nav, Tab } from 'react-bootstrap';

import { Switch } from 'antd';

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

const handleSwitchChange = (e) => {

  // props.setParams(state => ({ ...state, origin_wallet: e }));

}


function UserRobotsTable(props) {

  const history = useHistory()


  const columns = [
    {

      field: 'name',

      headerName: 'نام ربات',

      flex: 2,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      valueFormatter: (params) => `${params.row?.credentials?.first_name ?? '-'} ${params.row?.credentials?.last_name ?? ''}`

    },

    {

      field: 'phone',

      headerName: 'شماره موبایل',

      flex: 2,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      valueFormatter: (params) => `${params.row?.mobile}`

    },

    {

      field: 'age2',

      headerName: 'وضعیت',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => <div className="d-flex justify-content-end w-100">

        <Switch className="mx-auto w-50" checkedChildren="فعال" unCheckedChildren="غیر فعال" defaultChecked />

      </div>

    },

    {

      field: '',

      headerName: '',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 3,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => <div className="d-flex justify-content-end w-100 ms-3">

        <Button color="primary" variant="contained" onClick={() => { history.push(`robots/detail/${params.row?.id}`) }} className="ms-2">تنظیمات</Button>

      </div>

      ,

    },

  ];



  const [params, setParams] = React.useState({ size: 10, page: 1 })

  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])



  React.useEffect(() => {

    doFetch("GET", IAM_APP, UrlQuery(USERS_LIST, params))

  }, [params])



  return (

    <div className="content">

      <div className=" d-flex align-items-center justify-content-between w-auto mx-auto ">

        <div className="d-flex">

          <img src="/assets/drawer/Polygon.svg" />

          <p className="font_title_name me-1 text-nowrap">ربات ها </p>

        </div>

        <Filters params={params} setParams={setParams} />

      </div>

      <div className="d-flex px-3">

        <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>

          <DataGrid

            style={{ border: 0 }}

            autoHeight

            rows={data?.items ?? []}

            loading={isLoading}

            columns={columns}

            getRowClassName={

              params => 'grid-content'

            }

            rowHeight={58}

            isRowSelectable={false}

            components={{

              Pagination: CustomPagination

            }}

            pageSize={10}

            rowCount={data?.total}

            paginationMode="server"

            onPageChange={(param) => doFetch("GET", IAM_APP, UrlQuery(USERS_LIST, { ...params, page: param + 1 }))}

            disableSelectionOnClick

            disableColumnMenu

          />

        </div>

      </div>

    </div>

  )

}



export default UserRobotsTable

