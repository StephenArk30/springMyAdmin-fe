import React from "react";
import Card from "@material-ui/core/Card";
import {Typography, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Input from "@material-ui/core/Input";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import {createTable} from "../../../utils/api/create";

class TableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableName: '',
      tableNameError: false,
      rows: [
        {
          name: '',
          type: 'int',
          length: '',
          default: '',
          nullable: false,
          index: '',
          auto_increment: false,
          comment: ''
        }
      ]
    };
    this.handleAddTable = this.handleAddTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
  }

  handleAddTable () {
    let { tableName } = this.state;
    if (tableName === '') {
      this.setState({ tableNameError: true });
      return;
    }
    let { rows } = this.state;
    let { database } = this.props;
    createTable(database, tableName, rows)
      .then(() => {
        this.props.update();
        this.setState({
          tableName: '',
          tableNameError: false,
          rows: [
            {
              name: '',
              type: 'int',
              length: '',
              default: '',
              nullable: false,
              index: '',
              auto_increment: false,
              comment: ''
            }
          ]
        });
      })
      .catch((err) => {
        alert(err.msg);
      });
  }

  handleChange (event, index) {
    // console.log(event.target.value);
    let { rows } = this.state;
    if (event.target.name === 'tableName') {
      this.setState({ tableName: event.target.value });
      if (event.target.value !== '')  this.setState({ tableNameError: false });
    } else if (event.target.name === 'nullable' || event.target.name === 'auto_increment') {
      rows[index][event.target.name] = event.target.checked;
    } else if (event.target.name === 'length' && event.target.value !== '' && isNaN(parseInt(event.target.value))) {
      rows[index][event.target.name] = '';
    } else rows[index][event.target.name] = event.target.value;
    this.setState({ rows });
  };

  handleAddRow () {
    let { rows } = this.state;
    rows.push({
      name: '',
      type: 'int',
      length: '',
      default: '',
      nullable: false,
      index: '',
      auto_increment: false,
      comment: ''
    });
    this.setState({ rows });
  }

  handleRemoveRow (index) {
    let { rows } = this.state;
    // console.log(rows);
    rows.splice(index, 1);
    this.setState({ rows });
  }

  render() {
    let { classes } = this.props;
    let { rows } = this.state;
    return(
      <div className={classes.root}>
        <Typography variant="h6">Add a new table</Typography>
        <Card>
          <CardContent className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Default</TableCell>
                  <TableCell>Nullable</TableCell>
                  <TableCell>Index</TableCell>
                  <TableCell>Auto_Increment</TableCell>
                  <TableCell>Comment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell component="th" scope="row">
                      <IconButton
                        onClick={() => this.handleRemoveRow(rowIndex)}
                        disabled={(rowIndex === 0 && rows.length === 1)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Input
                        value={row.name}
                        placeholder="Name"
                        name="name"
                        onChange={event => this.handleChange(event, rowIndex)}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.type}
                        onChange={event => this.handleChange(event, rowIndex)}
                        displayEmpty
                        name="type"
                      >
                        <MenuItem value='int'>INT</MenuItem>
                        <MenuItem value='varchar'>VARCHAR</MenuItem>
                        <MenuItem value='text'>TEXT</MenuItem>
                        <MenuItem value='date'>DATE</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.length}
                        placeholder="Length"
                        name='length'
                        onChange={event => this.handleChange(event, rowIndex)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.default}
                        placeholder="Default"
                        name="default"
                        onChange={event => this.handleChange(event, rowIndex)}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="default"
                        checked={row.nullable}
                        onChange={event => this.handleChange(event, rowIndex)}
                        name="nullable"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.index}
                        onChange={event => this.handleChange(event, rowIndex)}
                        displayEmpty
                        name="index"
                      >
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value='primary key'>Primary</MenuItem>
                        <MenuItem value='unique'>Unique</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        color="default"
                        checked={row.auto_increment}
                        onChange={event => this.handleChange(event, rowIndex)}
                        name="auto_increment"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={row.comment}
                        placeholder="Comment"
                        name="comment"
                        onChange={event => this.handleChange(event, rowIndex)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={this.handleAddRow}>
              <AddCircleIcon/>
            </IconButton>
            <Input placeholder="Table name"
                   className={classes.right}
                   name="tableName"
                   error = {this.state.tableNameError}
                   onChange={this.handleChange}
            />
            <IconButton
            >
              <CheckCircleOutlineIcon onClick={event => this.handleAddTable(event)} />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: 20
  },
  right: {
    marginLeft: 'auto'
  },
  table: {
    overflow: 'auto',
    maxHeight: 300
  }
});

export default withStyles(styles, { withTheme: true })(TableForm);