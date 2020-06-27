import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useSocket from '../../hooks/useSocket';
import config from '../../config';
import { useSelector } from 'react-redux';
import { StoreState } from '../../models/store';
import { TableSortLabel, TablePagination } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  topRow: {
    color: 'green'
  },
  bottomTwoRows: {
    color: '#CCC'
  },
  tableCell: {
    color: 'inherit'
  }
});

interface DataTableProps {}

const DataTable = (props: DataTableProps) => {
  useSocket(config.BASE_URL_WS + '/stream');
  const teamsObj = useSelector((state: StoreState) => state.teams);
  const [
    page,
    setPage
  ] = useState(0);
  const [
    rowsPerPage,
    setRowsPerPage
  ] = useState(5);
  const classes = useStyles();

  const teams = Object.keys(teamsObj)
    .map((teamId) => teamsObj[teamId])
    .sort((a, b) => b.points - a.points)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tableRowClass = (index: number, length: number) => {
    if (index === 0) {
      return classes.topRow;
    } else if (index === length - 1 || (length > 2 && index === length - 2)) {
      return classes.bottomTwoRows;
    } else {
      return;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>
              <TableSortLabel active={true} direction='asc'>
                Points
              </TableSortLabel>
            </TableCell>
            <TableCell align='right'>Games Played</TableCell>
            <TableCell align='right'>Wins</TableCell>
            <TableCell align='right'>Losses</TableCell>
            <TableCell align='right'>Goals Scored</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team: any, index: number) => (
            <TableRow key={team.name} className={tableRowClass(index, Object.keys(teamsObj).length)}>
              {Object.keys(team).map((key: any, cellIndex: number) => (
                <TableCell
                  key={cellIndex}
                  className={classes.tableCell}
                  component={cellIndex === 0 ? 'th' : undefined}
                  scope={cellIndex === 0 ? 'row' : undefined}
                  align={cellIndex !== 0 ? 'right' : undefined}
                >
                  {team[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10
        ]}
        component='div'
        count={Object.keys(teamsObj).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default DataTable;
