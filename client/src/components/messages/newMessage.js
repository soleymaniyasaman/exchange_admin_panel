import React from 'react';

import { Link , useHistory } from "react-router-dom";

import { Field, Formik, Form } from "formik";

import { Grid, CircularProgress, Button, Checkbox, FormControlLabel, Select , MenuItem, withStyles, OutlinedInput } from '@material-ui/core';

import InputBase from '@material-ui/core/InputBase';

import { USERS_LIST , IAM_APP ,USER_SEND_MESSAGES} from "../../utils/constants"

import { useFetchApi } from '../../utils/hooks';

import { UrlQuery } from '../../utils/utils';

import { useTheme } from '@material-ui/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function NewMessage(props) {



    let loginLoading = false

    const history = useHistory()

    const [checked, setChecked] = React.useState(false)

    const [selectUserName, setSelectUserName] = React.useState([])


    const BootstrapInput = withStyles((theme) => ({

        root: {

            //   'label + &': {

            //     marginTop: theme.spacing(3),

            //   },
            width: "inherit !important",


        },

        input: {

            borderRadius: 4,

            position: 'relative',

            backgroundColor: 'white',

            border: '1px solid #ced4da',

            fontSize: 'initial',

            padding: '5px 12px 5px 12px',

            color: 'black',

            transition: theme.transitions.create(['border-color', 'box-shadow']),

            direction: "rtl !important",
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

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    const handleChange = (event) => {
        // console.log("value ==>",event)
      const {
        target: { value },
      } = event;
      setPersonName(
        //   event.target.value
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    console.log("peron name is ==>",personName)
    
    const [params, setParams] = React.useState({})
    
    const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])

    const [{ data:submitMessage, isLoading:submitMessageIsLoading, hasError:submitMessageHasError }, doFetchSubmit] = useFetchApi(undefined, [])
    


    const handleSubmit= (values) => {

        console.log("name",values.toggle)

        loginLoading = true

        let usersId = []

        if (values.toggle) {
            
            data?.items?.map((item,index) => {
            
                usersId.push(item.id)
    
            })

        }

        let payload = {
            "message": {
              "title": values.title,
              "body": values.body,
              "target_type": values.toggle ? "all" : personName.length === 1 ? "person" : "multi_person"
            },
            "users": personName
          }
        

        doFetchSubmit("POST", IAM_APP , USER_SEND_MESSAGES, payload )
        
        setTimeout(() => {
            history.push("/messages")
            
        }, 1000);
        // .then(resp => history.push("/messages"))
    }
  

    // const handleSelectUsers = () => {


    // }
  
    React.useEffect(() => {
  
      doFetch("GET", IAM_APP , UrlQuery(USERS_LIST, {...params}) )
  
    }, [params])


    return (

        <div className="content mt-5 p-4">

            <div className="d-flex justify-content-between">

                <div className="d-flex w-25">

                    <img src="/assets/drawer/Polygon.svg" />

                    <p className="font_title_name me-1">ارسال پیام </p>

                </div>

                <Link className="text-decoration-none" style={{ color: "#10D078" }} to={'/messages'} >بازگشت به تاریخچه پیام‌ها {`->`} </Link>

            </div>

            <div className="mt-4">

                <Formik

                    initialValues={{ account_number: '', title: '' ,toggle: false}}

                    enableReinitialize={true}

                // validate={this.validate}

                onSubmit={values => handleSubmit(values)}

                >

                    <Form>

                        <div style={{ flexGrow: 1 }} >

                            <Grid container spacing={3} justify="space-between" className="p-3">

                                <Grid item md={5}>

                                    <div className="d-flex w-100" style={{ maxHeight: "34px" }}>

                                        <label className="text-end text-white ms-4" style={{ minWidth: "90px" }} htmlFor="account_number">کاربر</label>

                                        {/* <Field

                                            type="text"

                                            name="account_number"

                                            placeholder=""

                                            required

                                            className="form-control bg_input input_text"

                                        /> */}

                                        {/* <Select 
                                        name="account_number" 
                                        value={selectUserName} 
                                        input={<BootstrapInput />} 
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                            }
                                            console.log("selected ==>",selected)
                                            return selected.join(', ');
                                        }}
                                        displayEmpty 
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        onChange={e =>  setSelectUserName([e.target.value]) } select size="small">

                                            {data?.items?.map((item,index) => {

                                                return <MenuItem 
                                                key={item.id}
                                                value={item.id}>{item.credentials.first_name} {item.credentials.last_name}</MenuItem>

                                            })}

                                        </Select> */}

                                        <Select
                                            multiple
                                            // displayEmpty
                                            className="w-100 text-dark bg-light"
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            // renderValue={(selected) => {
                                            //     if (selected.length === 0) {
                                            //     return <em>Placeholder</em>;
                                            //     }
                                            //     console.log("selected ==>",selected)
                                            //     return selected.join(', ');
                                            // }}
                                            
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                            <MenuItem disabled value="">
                                                <em>Placeholder</em>
                                            </MenuItem>
                                            {data?.items?.map((name) => (
                                                <MenuItem
                                                key={name.id}
                                                value={name.id}
                                                style={getStyles(name, personName, theme)}
                                                >
                                                {name.credentials.first_name} {name.credentials.last_name}
                                                </MenuItem>
                                            ))}
                                            </Select>

                                    </div>

                                </Grid>

                            </Grid>

                            <Grid container >

                                <Grid item md={1}></Grid>

                                <Grid item md={5} className="">

                                    {/* <Checkbox label="انتخاب همه کاربران" value={checked} size="small" color="primary" onClick={ _ => setChecked( state => !state) } /> */}

                                    {/* <FormControlLabel

                                        control={<Checkbox checked={checked} color="primary" onChange={_ => {setChecked(state => !state)}} name="checkedA" />}

                                        label="انتخاب همه کاربران"

                                        className="text-white me-0"

                                    /> */}
                                            <label>   
                                                <Field type="checkbox" name="toggle" className="ms-2" />

                                                <label className="text-white me-0" htmlFor="toggle">انتخاب همه کاربران</label>
                                                {/* {`${props.values.toggle}`} */}
                                            </label>

                                </Grid>

                            </Grid>

                            <Grid container spacing={3} justify="space-between" className="p-3">

                                <Grid item md={5}>

                                    <div className="d-flex w-100" style={{ maxHeight: "34px" }}>

                                        <label className="text-end text-white fs-6 ms-4" style={{ minWidth: "90px" }} htmlFor="title">عنوان پیام</label>

                                        <Field

                                            type="text"

                                            name="title"

                                            placeholder=""

                                            required

                                            className="form-control bg_input input_text"

                                        />

                                    </div>

                                </Grid>

                            </Grid>

                            <Grid container spacing={3} justify="space-between" className="p-3">

                                <Grid item md>

                                    <div className="d-flex w-100">

                                        <label className="text-end text-white fs-6 ms-4" style={{ minWidth: "90px" }} htmlFor="amount">متن پیام</label>

                                        <Field

                                            as="textarea"

                                            name="body"

                                            placeholder="متن پیام را بنویسید"

                                            required

                                            className="form-control bg_input input_text"

                                        />

                                    </div>

                                </Grid>

                            </Grid>

                            {/* { Boolean(hasError) && <p className="text-danger">{hasError}</p> } */}

                            <div className="mt-4 pt-3 ms-5 ps-2 d-flex justify-content-end">

                                <Button disabled={loginLoading} variant="contained" type="submit" color="primary" >

                                    ارسال پیام

                                    {loginLoading && <CircularProgress size={24} className="position-absolute" />}

                                </Button>

                            </div>

                        </div>

                    </Form>

                </Formik>

            </div>

        </div>

    )

}



export default NewMessage

