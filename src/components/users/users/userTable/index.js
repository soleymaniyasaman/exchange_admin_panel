import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root:{
    backgroundColor: '#181C1F',
    width: '1510px',
    position: 'absolute',
  },
  table: {
    minWidth: 650,
    borderCollapse: 'separate',
    borderSpacing: '0px 14px',
    backgroundColor:'#293034',
    border: 'none',
    direction: 'rtl'
  },
  tableRow: {
    backgroundColor: '#181C1F'
  },
  tableCell:{
    borderBottom: 'none',
    color: '#FFFFFF',
  },
  tableHeader:{
    color: '#B4B1B1',
    borderBottom: 'none',
    textAlign: 'center',

  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function UserTable() {
  const classes = useStyles();

  return (
    <div className="tableContainer">
    <TableContainer className={`${classes.root} me-3`} component={Paper} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell classes={{root: classes.tableHeader}}>Dessert (100g serving)</TableCell>
            <TableCell classes={{root: classes.tableHeader}}>Calories</TableCell>
            <TableCell classes={{root: classes.tableHeader}}>Fat&nbsp;(g)</TableCell>
            <TableCell classes={{root: classes.tableHeader}}>Carbs&nbsp;(g)</TableCell>
            <TableCell classes={{root: classes.tableHeader}}>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} classes={{root: classes.tableRow}}>
              <TableCell  component="th" scope="row" classes={{root: classes.tableCell}} align="center">
                {row.name}
              </TableCell>
              <TableCell classes={{root: classes.tableCell}} align="center">{row.calories}</TableCell>
              <TableCell classes={{root: classes.tableCell}} align="left">{row.fat}</TableCell>
              <TableCell classes={{root: classes.tableCell}} align="center">{row.carbs}</TableCell>
              <TableCell classes={{root: classes.tableCell}} align="left" size="small">
                <div className="rowEdit">
                  <p>
                  اطلاعات کاربر
                  </p>
                  </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
