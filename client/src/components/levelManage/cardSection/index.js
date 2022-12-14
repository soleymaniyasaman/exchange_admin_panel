import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { ReactComponent as CUP1 } from "../../../assets/CUP1.svg";
import { ReactComponent as CUP2 } from "../../../assets/CUP2.svg";
import { ReactComponent as CUP3 } from "../../../assets/CUP3.svg";
import { ReactComponent as CUP4 } from "../../../assets/CUP4.svg";


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    //   flexWrap: 'wrap',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      maxWidth: '1600px',
      '& > *': {
        maxWidth: '306px',
        height: '160px',
        margin: '20px 0 20px 0',
        // paddingLeft: "20px",
        backgroundColor: '#293034',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: "10px",
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& > div:nth-child(2n)': {
          margin: "0 20px"
      }
    },
  }));
const CardSection = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Paper className=" container-fluid ">
            <div className="ps-4">
                <CUP1 />
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}}>تعداد کل کاربران</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>560000000</p>
                </div>
            </div>
        </Paper>
        <Paper className=" container-fluid ">
            <div className="ps-4">
                <CUP2 />
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}}>تعداد کل کاربران</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>560000000</p>
                </div>
            </div>
        </Paper>        
        <Paper className=" container-fluid ">
            <div className="ps-4">
                <CUP3 />
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}}>تعداد کل کاربران</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>560000000</p>
                </div>
            </div>
        </Paper>        
        <Paper className=" container-fluid ">
            <div className="ps-4">
                <CUP4 />
            </div>
            <div className="text-center">
                <p style={{color:'#B4B1B1'}}>تعداد کل کاربران</p>
                <div style={{color:'#FFFFFF'}}>
                    <p>560000000</p>
                </div>
            </div>
        </Paper>             
        </div>
    );
}

export default CardSection;
