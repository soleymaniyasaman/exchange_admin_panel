import React from 'react'
import { TextField, MenuItem, Grid, Select
  //  IconButton, InputAdornment 
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";


function Filters(props) {

    const [tradeType, setTradeType] = React.useState('');

    const handleSelectChange = (e) => {
        props.setParams( state => ({...state, [e.target.name]: e.target.value}) );
    }

    return (
        <Grid className="mb-3 ps-4" justify="flex-end" container spacing={1}>
            <Grid item xs={2}>
                <label className="text-white ms-2 mt-2">نوع سفارش</label>
                <Select name="match_type" value={tradeType} displayEmpty onChange={ e => {handleSelectChange(e); setTradeType(e.target.value)}} select size="small">
                    <MenuItem value="">همه سفارش‌ها</MenuItem>
                    <MenuItem value="market">سریع</MenuItem>
                    <MenuItem value="limit">محدود</MenuItem>
                </Select>    
            </Grid>
        </Grid>
    )
}

export default Filters
