import React, { useContext, useState } from 'react'

import {
    TextField, MenuItem, Grid,

    IconButton, InputAdornment, Select , withStyles

} from "@material-ui/core";

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from "@material-ui/icons/Search";

import '../../layout/style.css';
import { UserContext } from '../../../context/provider';
import ConfigApi from '../../../utils/config-api';




function Filters(props) {

    const [cryptoWallet, setCryptoWallet] = useState('');

    const [statusInfo, setstatusInfo] = useState('');

    const cryptoContext = useContext(UserContext);


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

            <ConfigApi />

            <Grid item className="d-flex">

            <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>وضعیت سفارش</label>

            <Select name="status__in" value={statusInfo} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setstatusInfo(e.target.value) }} select size="small">

                <MenuItem value="">همه وضعیت ها</MenuItem>

                <MenuItem value="in_progress">در حال بررسی</MenuItem>

                <MenuItem value="success">تایید شده</MenuItem>

                <MenuItem value="rejected">تایید نشده</MenuItem>

            </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع ارز</label>

                <Select name="crypto_type" value={cryptoWallet} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setCryptoWallet(e.target.value) }} select size="small">

                    <MenuItem value="">همه ارزها</MenuItem>

                    {cryptoContext.configData?.map(item => <MenuItem value={item.Value?.symbol?.toLowerCase()}>{item.Value?.title}</MenuItem>)}

                </Select>

            </Grid>

        </Grid>

    )

}



export default Filters

