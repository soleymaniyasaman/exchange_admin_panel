import React from 'react'
import { TextField, MenuItem, Grid, Select
  //  IconButton, InputAdornment 
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";


function Filters(props) {

    const [type, setType] = React.useState('')
    const handleSelectChange = (e) => {
        props.setParams( state => ({...state, [e.target.name]: e.target.value}) );
    }

    return (
        <Grid className="mb-3 ps-4" justify="flex-end" container spacing={1}>
            <Grid item xs={1}>
                <Select name="type" value={type} displayEmpty onChange={ e => {handleSelectChange(e); setType(e.target.value)}} select size="small">
                    <MenuItem value="">همه تراکنش‌ها</MenuItem>
                    <MenuItem value="increase">واریز</MenuItem>
                    <MenuItem value="decrease">برداشت</MenuItem>
                    <MenuItem value="buy">خرید</MenuItem>
                    <MenuItem value="sell">فروش</MenuItem>
                </Select>    
            </Grid>
        </Grid>
    )
}

export default Filters
