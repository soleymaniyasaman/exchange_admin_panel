import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Button } from '@material-ui/core';

import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';

import { Pagination } from '@material-ui/lab';

import { useFetchApi } from "../../../../utils/hooks";

import { IAM_APP, USERS_LIST } from '../../../../utils/constants';

import { UrlQuery } from '../../../../utils/utils';

import { useHistory } from 'react-router-dom';

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



function UsersDataGrid(props) {

  const history = useHistory()


  const columns = [

    {

      field: 'name',

      headerName: 'نام کاربر',

      flex: 1,

      type: 'string',

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      valueFormatter: (params) => `${params.row?.credentials?.first_name ?? '-'} ${params.row?.credentials?.last_name ?? ''}`

    },

    {

      field: 'phone',

      headerName: 'شماره تلفن',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      valueFormatter: (params) => `${params.row?.mobile}`

    },

    {

      field: 'nationalNo',

      headerName: 'کدملی',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      valueFormatter: (params) => `${params.row?.credentials?.national_code ?? '-'}`

    },

    {

      field: 'age2',

      headerName: 'احرازهویت',

      flex: 1,

      sortable: false,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      align: 'center',

      renderCell: (params) => {

        let text = 'در انتظار احراز هویت'

        let pic = ''

        switch (params?.row?.approve_state) {

          case "approved":

            text = 'احراز هویت شده'

            pic = '/assets/drawer/check_circle-24px.svg'

            break;

          case "rejected":

            text = 'رد شده'

            pic = '/assets/drawer/cancel-24px (1).svg'

            break;

          default:

            break;

        }

        return (

          <div className="d-flex">

            <div className="ms-2" key={params.row?.id}>

              {text}

            </div>

            <img src={pic} />

          </div>

        )

      }

    },

    {

      field: '',

      headerName: '',

      // description: 'This column has a value getter and is not sortable.',

      sortable: false,

      align: 'center',

      flex: 1,

      headerClassName: 'grid-header',

      headerAlign: 'center',

      renderCell: (params) => <div className="d-flex justify-content-end w-100">

        <Button color="primary" variant="contained" onClick={() => { history.push(`users/detail/${params.row?.id}`) }} className="ms-2">اطلاعات کاربر</Button>

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

          <p className="font_title_name me-1">کاربران </p>

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



export default UsersDataGrid

