import React, { useState } from 'react'

import {
    
    TextField, MenuItem, Grid,
    
    IconButton, InputAdornment, Select, withStyles
    
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import InputBase from '@material-ui/core/InputBase';

import '../layout/style.css'

import { useFetchApi } from '../../../utils/hooks';

import { ACCOUNTING_APP, USERS_WALLET } from '../../../utils/constants';

import { Nav, Tab } from 'react-bootstrap';

import { UserContext } from '../../../context/provider';

import ConfigApi from '../../../utils/config-api';


function Filters(props) {

    const orderContextData = React.useContext(UserContext);

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
    return (
        <Grid className="mb-3 ps-2 mt-2 position-relative" justify="flex-end" container spacing={1}>

            <ConfigApi />

            <Grid item className="d-flex">

                <Tab.Container id="left-tabs-example" defaultActiveKey="rial">

                    <Nav variant="pills" className="top-50 end-0">

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="rial" onClick={e => { handleSwitchChange("irr") }}>تومان(IR)</Nav.Link>

                        </Nav.Item>

                        <Nav.Item>

                            <Nav.Link role="button" eventKey="coin" onClick={e => { handleSwitchChange("usdt") }}>تتر(USDT)</Nav.Link>

                        </Nav.Item>

                    </Nav>

                </Tab.Container>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع ارز</label>

                <Select name="dest_wallet" value={cryptoWallet} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setCryptoWallet(e.target.value) }} select size="small">

                    <MenuItem value="">همه ارزها</MenuItem>

                    {orderContextData.configData?.map(item => <MenuItem value={item.Value?.symbol?.toLowerCase()}>{item.Value?.title}</MenuItem>)}

                </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>سمت سفارش</label>

                <Select name="type" value={type} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setType(e.target.value) }} select size="small">

                    <MenuItem value="">همه سفارش‌ها</MenuItem>

                    <MenuItem value="buy">خرید</MenuItem>

                    <MenuItem value="sell">فروش</MenuItem>

                </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع سفارش</label>

                <Select name="trade_type" value={tradeType} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setTradeType(e.target.value) }} select size="small">

                    <MenuItem value="">همه سفارش‌ها</MenuItem>

                    <MenuItem value="market">سریع</MenuItem>

                    <MenuItem value="limit">محدود</MenuItem>

                </Select>

            </Grid>

            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}> دسته‌بندی بر اساس</label>

                <Select name="group" value={group} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setGroup(e.target.value) }} select size="small">

                    <MenuItem value="">همه</MenuItem>

                    <MenuItem value="bot">بات</MenuItem>

                    <MenuItem value="">کاربر</MenuItem>

                </Select> 

            </Grid>

            <Grid item className="" >

                <TextField

                    value={nationalCode}

                    type="search"

                    onChange={e => setNationalCode(e.target.value)}

                    name="search"

                    size="small"

                    placeholder=" جست و جو نام یا کد ملی"
                    
                    InputProps={{

                        endAdornment: (

                            <InputAdornment>

                                <IconButton onClick={() => props.setParams(state => ({ ...state, search: nationalCode }))}>

                                    <SearchIcon />

                                </IconButton>

                            </InputAdornment>

                        )

                    }}

                />

            </Grid>

        </Grid>

    )
}

export default Filters
