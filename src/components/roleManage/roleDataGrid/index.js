import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { Pagination } from '@material-ui/lab';
import { Edit, Delete } from '@material-ui/icons';
import { useFetchApi } from "../../../utils/hooks";
import { USERS_TRANSACTION_HISTORY } from '../../../utils/constants';
import { UrlQuery } from '../../../utils/utils';
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
        id: 1,
        tracking_code: "412515",
        owner_id: "fjasfkljas",
        national_code: "55457575",
        origin_wallet: "btc",
        quantity: "2.3",
        dest_wallet: "",
        action: "approve",
        status: "in_progress",
    },
    {
        id: 2,
        tracking_code: "412515",
        owner_id: "fjasfkljas",
        national_code: "55457575",
        origin_wallet: "btc",
        quantity: "2.3",
        dest_wallet: "",
        action: "approve",
        status: "in_progress",
    },
    {
        id: 3,
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

function RoleDataGrid(props) {

    const history = useHistory()

    const columns = [
        {
            field: 'id',
            headerName: '??????????',
            flex: 1,
            type: 'string',
            sortable: false,
            headerClassName: 'grid-header',
            headerAlign: 'center',
            align: 'center',
            // renderCell: (values) => `${values.row?.tracking_code.slice(0, 8)}`
        },
        {
            field: 'owner_id',
            headerName: '?????? ??????',
            // description: 'This column has a value getter and is not sortable.',
            sortable: false,
            align: 'center',
            flex: 1,
            headerClassName: 'grid-header',
            headerAlign: 'center',
        },
        {
            field: 'created_at',
            headerName: '????????????',
            // description: 'This column has a value getter and is not sortable.',
            sortable: false,
            align: 'right',
            flex: 3,
            headerClassName: 'grid-header',
            headerAlign: 'right',
            renderCell: (values) => (
                <IconButton variant="outlined" size="small" color="secondary" onClick={() => { history.push(`/rolemanage/detail/${values?.row?.id}`) }} small className="ms-4 bg-white"><Edit /></IconButton>
            )
        },
        {
            field: 'status',
            headerName: '??????',
            // description: 'This column has a value getter and is not sortable.',
            sortable: false,
            align: 'center',
            flex: 1,
            headerClassName: 'grid-header',
            headerAlign: 'center',
            renderCell: (values) => <IconButton variant="outlined" size="small" onClick={() => { }} className="ms-2 text-danger bg-white"><Delete /></IconButton>
        }
    ];

    const [params, setParams] = React.useState({ order: "-updated_at", size: 10, page: 0 })

    const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

    React.useEffect(() => {
        // doFetch("GET", UrlQuery(USERS_TRANSACTION_HISTORY, {...params}) )
    }, [params])

    return (
        <div className="content">
            <div className=" d-flex align-items-center justify-content-between w-auto mx-auto pt-2">
                <div className="d-flex">
                    <img src="/assets/drawer/Polygon.svg" />
                    <p className="font_title_name me-1" style={{ minWidth: "150px" }}>???????????? ????????????????</p>
                </div>
                {/* <Filters params={params} setParams={setParams} /> */}
                <Grid className="mb-3 ps-2" justify="flex-end" container spacing={1}>
                    <Button color="secondary" variant="contained" onClick={() => { history.push('/rolemanage/add') }} className="ms-2">???????????? ?????? ????????</Button>
                    <Button color="secondary" variant="contained" onClick={() => { }} className="ms-2 bg-transparent" style={{ border: "1px solid #558EFA", color: "#558EFA" }}>???????????? ???????????? ????</Button>
                </Grid>
            </div>
            <div className="d-flex px-3">
                <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
                    <DataGrid
                        style={{ border: 0 }}
                        autoHeight
                        // rows={data?.items ?? []}
                        rows={rows}
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
                        onPageChange={(param) => doFetch("GET", UrlQuery(USERS_TRANSACTION_HISTORY, { ...params, page: param }))}
                        disableSelectionOnClick
                        disableColumnMenu
                    />
                </div>
            </div>
        </div>
    )
}

export default RoleDataGrid
