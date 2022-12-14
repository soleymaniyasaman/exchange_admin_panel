import React, { useState } from 'react'

import {
    
    TextField, MenuItem, Grid,
    
    IconButton, InputAdornment, Select, withStyles
    
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import InputBase from '@material-ui/core/InputBase';

import '../layout/style.css';

import fa_IR from "antd/lib/locale/fa_IR";

import { ConfigProvider } from 'antd';

import { DatePicker as DatePickerJalali } from "antd-jalali";

import 'antd/dist/antd.css';

import { UserContext } from '../../../context/provider';
import ConfigApi from '../../../utils/config-api';


function Filters(props) {

    const contextData = React.useContext(UserContext);

    const [cryptoWallet, setCryptoWallet] = useState('');

    const [nationalCode, setNationalCode] = useState('')

    const [group, setGroup] = useState('');

    
    const dateFormat = 'YYYY-MM-DD';

        //date picker onchange func

    function onChange(date, dateString) {

        if (date) {

            props.setParams(state => ({ ...state,  date__gt: `${date[0].$y}-${date[0].$M + 1}-${date[0].$D}` , date__lt: `${date[1].$y}-${date[1].$M + 1}-${date[1].$D}`} ))
            
        } else if (date === null) {

            props.setParams(state => ({...state, date__gt:'',date__lt:'',}))
        }
        
    }
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
        <Grid className="mb-3 ps-2 mt-2 position-relative" justify="flex-end" container spacing={1}>

            <ConfigApi />

            {contextData.withdrawFilter === "coin" ?
            
            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>نوع ارز</label>

                <Select name="crypto_type" value={cryptoWallet} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setCryptoWallet(e.target.value) }} select size="small">

                    <MenuItem value="">همه ارزها</MenuItem>

                    {contextData.configData?.map(item => <MenuItem value={item.Value?.symbol?.toLowerCase()}>{item.Value?.title}</MenuItem>)}

                </Select>

            </Grid>
            :
            null
            }

<Grid item className="d-flex">
                
                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}> دسته‌بندی بر اساس</label>
                
                <Select name="group" value={group} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setGroup(e.target.value) }} select size="small">
                    
                    <MenuItem value="">همه</MenuItem>
                    
                    <MenuItem value="bot">بات</MenuItem>
                    
                    <MenuItem value="">کاربر</MenuItem>
                    
                </Select> 
                
            </Grid>

            <Grid xs={3} item className="" >

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
            <Grid item className="d-flex">

                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}>تاریخ</label>
{/* 
                <Select name="trade_type" value={tradeType} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setTradeType(e.target.value) }} select size="small">

                    <MenuItem value="">همه سفارش‌ها</MenuItem>

                    <MenuItem value="market">سریع</MenuItem>

                    <MenuItem value="limit">محدود</MenuItem>

                </Select> */}
                
                <ConfigProvider locale={fa_IR} direction="rtl">

                    <DatePickerJalali.RangePicker  onChange={onChange} className="form-control h-75 my-auto rounded-1" format={dateFormat} dropdownClassName="datePickerDropDown" popupStyle={{ backgroundColor: "red" }} />

                </ConfigProvider>

            </Grid>

        </Grid>

    )
}

export default Filters
