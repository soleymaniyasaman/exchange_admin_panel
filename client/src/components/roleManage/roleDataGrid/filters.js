import React, { useState } from 'react'
import { TextField, MenuItem, Grid, 
   IconButton, InputAdornment, Select, withStyles, InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


function Filters(props) {

    const [tradeType, setTradeType] = useState('');
    const [originWallet, setOriginWallet] = useState('');
    const [nationalCode, setNationalCode] = React.useState('')

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
    const handleSelectChange = (e) => {
        props.setParams( state => ({...state, [e.target.name]: e.target.value}) );
    }

    return (
        <Grid className="mb-3 ps-4" justify="flex-end" container spacing={1}>
            <Grid item xs={2}>
                <label className="text-white ms-2 mt-2">نوع ارز</label>
                <Select name="origin_wallet" value={originWallet} displayEmpty onChange={ e => {handleSelectChange(e); setOriginWallet(e.target.value)}} select size="small">
                    <MenuItem value="">همه ارزها</MenuItem>
                    <MenuItem value="irr">ریال</MenuItem>
                    <MenuItem value="btc">بیت کوین</MenuItem>
                </Select>    
            </Grid>
            <Grid item xs={2}>
                <label className="text-white ms-2 mt-2">نوع سفارش</label>
                <Select name="match_type" value={tradeType} displayEmpty onChange={ e => {handleSelectChange(e); setTradeType(e.target.value)}} select size="small">
                    <MenuItem value="">همه سفارش‌ها</MenuItem>
                    <MenuItem value="market">سریع</MenuItem>
                    <MenuItem value="limit">محدود</MenuItem>
                </Select>    
            </Grid>
            <Grid item className="mt-2" >
                <TextField 
                    value={nationalCode} 
                    type="search" 
                    onChange={ e => setNationalCode(e.target.value)} 
                    name="national_code" 
                    size="small" 
                    placeholder="جست و جو"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                            <IconButton onClick={ () => props.setParams( state => ({...state, national_code: nationalCode}))}>
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
