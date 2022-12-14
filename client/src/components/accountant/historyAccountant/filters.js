import React, { useState } from 'react'

import {
    TextField, MenuItem, Grid,

    IconButton, InputAdornment, Select , withStyles

} from "@material-ui/core";

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from "@material-ui/icons/Search";

import '../../layout/style.css';




function Filters(props) {

    const [originWallet, setOriginWallet] = useState('');

    const [statusInfo, setstatusInfo] = useState('');



    const handleSelectChange = (e) => {

        props.setParams(state => ({ ...state, [e.target.name]: e.target.value }));

    }


    const BootstrapInput = withStyles((theme) => ({

        root: {

            //   'label + &': {

            //     marginTop: theme.spacing(3),

            //   },

        },

        input: {

            borderRadius: 4,

            position: 'relative',

            backgroundColor: 'white',

            border: '1px solid #ced4da',

            fontSize: 'smaller',

            padding: '5px 12px 5px 12px',

            color: 'black',

            transition: theme.transitions.create(['border-color', 'box-shadow']),

            // Use the system font instead of the default Roboto font.

            fontFamily: [

                "IranSans",

            ].join(','),

            '&:focus': {

                borderRadius: 4,

                borderColor: '#80bdff',

                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',

                backgroundColor: 'white'

            },

        },

    }))(InputBase);


    return (

        <Grid className="mb-3 ps-2 position-relative" justify="flex-end" container spacing={1}>

            <Grid item className="d-flex">

            <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>وضعیت سفارش</label>

            <Select name="status" value={statusInfo} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setstatusInfo(e.target.value) }} select size="small">

                <MenuItem value="">همه وضعیت ها</MenuItem>

                <MenuItem value="in_progress">در حال بررسی</MenuItem>

                <MenuItem value="success">تایید شده</MenuItem>

                <MenuItem value="failed">لغو شده</MenuItem>

            </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع عملیات</label>

                <Select name="order_type" value={originWallet} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setOriginWallet(e.target.value) }} select size="small">

                    <MenuItem value="">همه عملیات‌ها</MenuItem>

                    <MenuItem value="withdraw">برداشت</MenuItem>

                    <MenuItem value="deposit">واریز رمز ارز</MenuItem>

                    <MenuItem value="payment_gateway">واریز تومانی</MenuItem>

                    <MenuItem value="trade">معاملات</MenuItem>

                </Select>

            </Grid>

        </Grid>

    )

}



export default Filters

