import React, { useState } from 'react'

import {

    MenuItem, Grid, Select, withStyles, TextField, InputAdornment, IconButton

} from "@material-ui/core";

import InputBase from '@material-ui/core/InputBase';

import '../layout/style.scss'

import { UserContext } from '../../../context/provider';

import ConfigApi from '../../../utils/config-api';

import SearchIcon from "@material-ui/icons/Search";
import { Radio } from 'antd';


function FiltersArea(props) {

    const tradeContextData = React.useContext(UserContext);

    const [type, setType] = useState('');

    const [tradeType, setTradeType] = useState('');

    const [cryptoWallet, setCryptoWallet] = useState('');

    const [nationalCode, setNationalCode] = useState('')

    const [group, setGroup] = useState('');


    const handleSelectChange = (e) => {

        props.setParams(state => ({ ...state, [e.target.name]: e.target.value }));

    }

    const handleSwitchChange = (e) => {

        props.setParams(state => ({ ...state, origin_wallet: e }));

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

    //   const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

    //   React.useEffect( () => {
    //       doFetch("GET", ACCOUNTING_APP, USERS_WALLET(7) )

    //   }, [])
    //   console.log("wallet",data)
    function onChange(e) {
        console.log(`radio checked:${e.target.value}`);
    }
    return (
        <Grid className="mb-3 ps-2 mt-2 position-relative flex-nowrap" justify="flex-end" container spacing={1}>

            <ConfigApi />

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع ارز</label>

                <Select name="dest_wallet" value={cryptoWallet} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setCryptoWallet(e.target.value) }} select size="small">

                    <MenuItem value="">همه ارزها</MenuItem>

                    {tradeContextData.configData?.map(item => <MenuItem value={item.Value?.symbol?.toLowerCase()}>{item.Value?.title}</MenuItem>)}

                </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع بازار</label>

                <Select name="type" value={type} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setType(e.target.value) }} select size="small">

                    <MenuItem value="">همه سفارش‌ها</MenuItem>

                    <MenuItem value="buy">خرید</MenuItem>

                    <MenuItem value="sell">فروش</MenuItem>

                </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>زمان</label>

                <Radio.Group onChange={onChange} buttonStyle="solid" defaultValue="e">

                    <Radio.Button value="a">انتخاب بازه</Radio.Button>

                    <Radio.Button value="b">ماهانه</Radio.Button>

                    <Radio.Button value="c">هفتگی</Radio.Button>

                    <Radio.Button value="d">روزانه</Radio.Button>

                    <Radio.Button value="e">پیش فرض</Radio.Button>

                </Radio.Group>

            </Grid>

        </Grid>

    )
}

export default FiltersArea
