import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TablePagination from '@material-ui/core/TablePagination/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableSortLabel from '@material-ui/core/TableSortLabel/index';
import Paper from '@material-ui/core/Paper/index';
import Input from '@material-ui/core/Input/index';
import IconButton from "@material-ui/core/IconButton/index";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { getData } from '../../../utils/api/read';
import { insertRow } from '../../../utils/api/create';
import { deleteRow } from '../../../utils/api/delete';
import { setStateAsync } from '../../../utils/util';

function DataTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell />
        {headCells.map(headCell => (
          <TableCell
            key={headCell.COLUMN_NAME}
            align='right'
            sortDirection={orderBy === headCell.COLUMN_NAME ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.COLUMN_NAME}
              direction={order}
              onClick={createSortHandler(headCell.COLUMN_NAME)}
            >
              {headCell.COLUMN_NAME}
              {orderBy === headCell.COLUMN_NAME ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

class DataTableInput extends React.Component{
  constructor(props) {
      super(props);
      this.state = {};
      for (let headCell in this.props.headCells) {
          if (headCell && headCell.hasOwnProperty('COLUMN_NAME'))
              this.setState({ [headCell.COLUMN_NAME]: '' });
      }
      this.render = this.render.bind(this);
      this.createInsertHandler = this.createInsertHandler.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleClear = this.handleClear.bind(this);
  }

  createInsertHandler() {
      this.props.onRequestInsert(this.state);
  };

  handleClear() {
      for (let key in this.state) { this.setState({ [key]: '' }); }
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let {classes, headCells, success} = this.props;

    return (
      <TableRow
          hover
          role="checkbox"
      >
        <TableCell>
            <IconButton edge="end" aria-label="clear" onClick={this.handleClear}>
                <ClearIcon/>
            </IconButton>
        </TableCell>
        <TableCell>
            <IconButton edge="end" aria-label="add" onClick={this.createInsertHandler}>
              {success ? (<CheckCircleOutlineIcon color="primary"/>) : (<AddIcon/>)}
            </IconButton>
        </TableCell>
        {headCells.map((headCell, index) => {
          return (
            <TableCell key={headCell.COLUMN_NAME}
                       align="right"
            >
              <Input
                  className={classes.input}
                  inputProps={{
                      'aria-label': 'description',
                  }}
                  value={this.state[headCell.COLUMN_NAME]}
                  name={headCell.COLUMN_NAME}
                  placeholder={headCell.COLUMN_NAME}
                  onChange={this.handleChange}
              />
            </TableCell>
          );
        })}
      </TableRow>
    );
  }
}

let update = false;

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: '',
      page: 0,
      rowsPerPage: 5,
      rowsLength: 0,
      rows: [],
      headCells: [],
      success: false
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.render = this.render.bind(this);
    this.getTableData = this.getTableData.bind(this);
    this.checkUpdate = this.checkUpdate.bind(this);
    this.handleRequestInsert = this.handleRequestInsert.bind(this);
  }

  getTableData() {
    let { database, table } = this.props;
    let { order, orderBy, page, rowsPerPage } = this.state;
    getData(database, table, rowsPerPage, page * rowsPerPage, orderBy, order)
      .then(res => {
        let rows = res.res;
        let rowsLength = res.count;
        let headCells = res.columns;
        this.setState({ headCells, rows, rowsLength });
      })
      .catch(err => {alert(err.msg);})
  }

  handleRequestInsert(values) {
    let { database, table } = this.props;
    insertRow(database, table, values)
      .then(res => {
        this.getTableData();
        this.setState({ success: true });
        setTimeout(() => {this.setState({ success: false });}, 1000);
      })
      .catch(err => {
        alert('insert error: ' + err.msg);
      });
  }

  handleRequestSort = async (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    await setStateAsync(this, {order: isDesc ? 'asc' : 'desc'});
    await setStateAsync(this, {orderBy: property});
    this.getTableData();
  };

  handleDelete = (row) => {
    let { database, table } = this.props;
    deleteRow(database, table, row)
      .then(() => {
        this.getTableData();
      })
      .catch(err => {
        alert(err.msg);
      });
  };

  handleEdit = (row) => {
    alert("feature uncompleted");
  };

  handleChangePage = async (event, newPage) => {
    await setStateAsync(this, {page: newPage});
    this.getTableData();
  };

  handleChangeRowsPerPage = async event => {
    await setStateAsync(this, {rowsPerPage: parseInt(event.target.value, 10)});
    await setStateAsync(this, {page: 0});
    this.getTableData();
  };

  async checkUpdate() {
    if (this.props.update !== undefined && this.props.update !== update) {
      update = this.props.update;
      await setStateAsync(this, {
        order: 'asc',
        orderBy: '',
        page: 0,
        rowsPerPage: 5,
        rowsLength: 0,
        rows: [],
        headCells: []
      });
      this.getTableData();
    }
  }

  render() {
    this.checkUpdate();
    let { classes } = this.props;
    let { headCells, rows, rowsPerPage, rowsLength, page, order, orderBy } = this.state;
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsLength - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
              size="small"
            >
              <caption>{this.props.table}</caption>
              <DataTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={rowsLength}
                headCells = {headCells}
                />
              <TableBody>
                {rows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        key={index}
                      >
                        <TableCell>
                          <IconButton edge="end" aria-label="edit"
                                      onClick={() => this.handleEdit(row)}>
                            <EditIcon/>
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton edge="end" aria-label="delete"
                                      onClick={() => this.handleDelete(row)}>
                            <DeleteIcon/>
                          </IconButton>
                        </TableCell>
                        {headCells.map((headCell, headCellIndex) => {
                          return (
                            <TableCell key={headCellIndex} align="right">{row[headCell.COLUMN_NAME] ? row[headCell.COLUMN_NAME] : 'NULL'}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6}/>
                  </TableRow>
                )}
                <DataTableInput
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestInsert={this.handleRequestInsert}
                  rowCount={rowsLength}
                  headCells={headCells}
                  success={this.state.success}
                />
              </TableBody>
            </Table>
          </div>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

// style
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    input: {
      margin: theme.spacing(1),
    }
});

export default withStyles(styles, { withTheme: true })(DataTable);
