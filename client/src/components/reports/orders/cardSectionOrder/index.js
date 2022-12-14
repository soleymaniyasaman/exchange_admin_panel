import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { IAM_APP, USERS_LIST_COUNT } from '../../../../utils/constants';
import { numDiscriminant } from '../../../../utils/discriminant';
import { useFetchApi } from '../../../../utils/hooks';
import { UrlQuery } from '../../../../utils/utils';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    //   flexWrap: 'wrap',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
      maxWidth: '1050px',
      width: '1046',
      '& > *': {
        maxWidth: '235px',
        height: '125px',
        margin: '20px 0 20px 0',
        // paddingLeft: "20px",
        backgroundColor: '#293034',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: "10px",
        flexWrap: 'nowrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& > div:nth-child(2n)': {
          margin: "0 10px"
      },
      '& img': {
          width : "45px"
      }
    },
  }));
  
const CardSection = () => {

    const classes = useStyles();

    const [params, setParams] = React.useState({  size: 10, page: 1 })

    const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, [])
  
  
  
    React.useEffect(() => {
  
      doFetch("GET", IAM_APP, UrlQuery(USERS_LIST_COUNT, params))
  
    }, [params])

    console.log("users",data)

    return (
        <div className={classes.root}>
        <Paper className=" container-fluid flex-nowrap">
            <div className="ps-1">
                <img src="/assets/drawer/users.svg"/>
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}} className="text-nowrap">تعداد کل سفارش ها</p>
                <div style={{color:'#FFFFFF'}}>
                    {/* <p>{numDiscriminant(data.users_count)}</p> */}
                    <p>{data.map(item => item.user_count).reduce((prev, curr) => prev + curr, 0)}</p>
                </div>
            </div>
        </Paper>
        <Paper className=" container-fluid flex-nowrap">
            <div className="ps-1">
                <img src="/assets/drawer/users.svg" className=""/>
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}} className="text-nowrap">تعداد کل سفارش های موفق</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>{data?.map(item => item.approve_state === "approved" ? item.user_count : null)}</p>
                </div>
            </div>
        </Paper>        
        <Paper className=" container-fluid flex-nowrap">
            <div className="ps-1">
                <img src="/assets/drawer/users.svg" />
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}} className="text-nowrap">تعداد سفارش های باز</p>
                <div style={{color:'#FFFFFF'}}>
                <p>{data?.map(item => item.approve_state === "rejected" ? item.user_count : null)}</p>
                </div>
            </div>
        </Paper>        
        <Paper className=" container-fluid flex-nowrap">
            <div className="ps-1">
                <img src="/assets/drawer/users.svg" className=""/>
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}} className="text-nowrap">تعداد سفارش های امروز</p>
                <div style={{color:'#FFFFFF'}}>
                <p>{data?.map(item => item.approve_state === "in_progress" ? item.user_count : '-')}</p>
                </div>
            </div>
        </Paper>        
        <Paper className=" container-fluid ">
            <div className="ps-1">
                <img src="/assets/drawer/users.svg"/>
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}}>تعداد سفارش‌های موفق امروز</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>560000000</p>
                </div>
            </div>
        </Paper>      
        </div>
    );
}

export default CardSection;
