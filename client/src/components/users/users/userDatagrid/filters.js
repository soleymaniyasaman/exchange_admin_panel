import React, { useState } from 'react'
import { TextField, MenuItem, Grid, IconButton, InputAdornment, InputBase, withStyles, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


function Filters(props) {

    const [mobile, setMobile] = useState('')

    const [type, setType] = useState('');

    const [group, setGroup] = useState('');


    const handleSelectChange = (e) => {
        props.setParams( state => ({...state, [e.target.name]: e.target.value}) );
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

    React.useEffect( () => {
        if (mobile === ''){
            props.setParams( state => state)
        }
    }, [mobile])

    return (
        <Grid className="mb-3 ps-2" justify="flex-end" container spacing={1}>
            <Grid item className="d-flex">
                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}> وضعیت کاربر</label>
                <Select name="approve_state__in" value={type} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setType(e.target.value) }} select size="small">
                    <MenuItem value="">همه</MenuItem>
                    <MenuItem value="approved">احرازهویت شده</MenuItem>
                    <MenuItem value="rejected">رد شده</MenuItem>
                    <MenuItem value="pending">درحال انتظار</MenuItem>
                    <MenuItem value="initialized">احرازهویت نشده</MenuItem>
                </Select> 
            </Grid>
            <Grid item className="d-flex">
                <label className="text-white ms-2 mt-2" style={{ fontSize: 'smaller' }}> دسته‌بندی بر اساس</label>
                <Select name="group" value={group} input={<BootstrapInput />} displayEmpty onChange={e => { handleSelectChange(e); setGroup(e.target.value) }} select size="small">
                    <MenuItem value="">همه</MenuItem>
                    <MenuItem value="bot">بات</MenuItem>
                    <MenuItem value=" ">کاربر</MenuItem>
                </Select> 
            </Grid>
            <Grid item ><TextField 
                            value={mobile} 
                            type="search" 
                            onChange={ e => setMobile(e.target.value)} 
                            name="search" 
                            size="small" 
                            placeholder="جست و جو"
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment>
                                    <IconButton onClick={ () => props.setParams( state => ({...state, search: mobile}))}>
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
