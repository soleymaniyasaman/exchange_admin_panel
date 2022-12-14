import React from 'react'
import { TextField, MenuItem, Grid, 
  //  IconButton, InputAdornment 
} from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";


function Filters(props) {

    const handleSelectChange = (e) => {
        props.setParams( state => ({...state, [e.target.name]: e.target.value}) );
    }

    return (
        <Grid className="mb-3 ps-4" justify="flex-end" container spacing={1}>
            <Grid item xs={1}>
                <TextField name="ave" value={1} defaultValue="1" onChange={handleSelectChange} select size="small">
                    <MenuItem value="1">همه ارزها</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                </TextField>    
            </Grid>
        </Grid>
    )
}

export default Filters
