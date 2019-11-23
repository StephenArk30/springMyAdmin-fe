import React, {Component} from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import StorageIcon from '@material-ui/icons/Storage';
import AddIcon from '@material-ui/icons/AddCircle';
import TableIcon from '@material-ui/icons/TableChart';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { getDatabases } from '../../utils/api/read';
import history from '../../utils/history';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import {createDB} from "../../utils/api/create";

let update = false;

class LeftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: [],
      databases: [],
      openDialog: false,
      newDatabase: '',
      error: false
    };
    this.render = this.render.bind(this);
    this.createClickDB = this.createClickDB.bind(this);
    this.handleClickTable = this.handleClickTable.bind(this);
    this.onGetDatabases = this.onGetDatabases.bind(this);
    this.handleCreateDB = this.handleCreateDB.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkUpdate = this.checkUpdate.bind(this);

    this.onGetDatabases();
  }

  onGetDatabases() {
    getDatabases().then(databases => {
      let open = [];
      for (let db in databases) { open.push(false); }
      this.setState({ databases, open });
    })
      .catch(err => {
        alert(err.msg);
        try {
          history.goBack();
        } catch (e) {
          history.replace('/login');
        }
      });
  }

  createClickDB(event, dbIndex) {
    let { open, databases } = this.state;
    for (let i = 0; i < open.length; i++) {
      if (i === dbIndex) open[i] = !open[i];
      else open[i] = false;
    }
    this.setState({ open });
    this.props.handleClickDB(databases[dbIndex]);
  }

  handleClickTable(dbIndex, tableIndex) {
    let database = this.state.databases[dbIndex];
    if (this.state.open[dbIndex]) {
      this.props.changeMain('table', this.props.schema_tables[database][tableIndex]);
    }
  };

  handleCreateDB() {
    if (this.state.newDatabase.length === 0) {
      this.setState({ error: true });
      return;
    }
    createDB(this.state.newDatabase)
      .then(() => {
        this.onGetDatabases();
        this.handleCloseDialog();
        this.setState({ newDatabase: '' });
      })
      .catch(err => {
        alert(err);
      });
  }

  handleOpenDialog() {
    this.setState({ openDialog: true })
  }

  handleCloseDialog() {
    this.setState({ openDialog: false })
  }

  handleChange(event) {
    this.setState({
      error: false,
      newDatabase: event.target.value
    });
  }

  checkUpdate() {
    // console.log(update, this.props.update);
    if (update !== this.props.update) {
      this.onGetDatabases();
      update = this.props.update;
    }
  }

  render() {
    this.checkUpdate();
    let { databases, open } = this.state;
    let { schema_tables } = this.props;
    // console.log(databases, schema_tables);
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Databases
          </ListSubheader>
        }
      >
        <ListItem button onClick={this.handleOpenDialog}>
          <ListItemIcon>
            <AddIcon color='primary'/>
          </ListItemIcon>
          <ListItemText primary="New"/>
        </ListItem>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        >
          <DialogTitle id="form-dialog-title">Create Database</DialogTitle>
          <DialogContent>
            <DialogContentText>Input a name for the new database</DialogContentText>
            <Input
              placeholder="Database name"
              onChange={this.handleChange}
              error={this.state.error}
            />
          </DialogContent>
        <DialogActions>
            <IconButton onClick={this.handleCreateDB}>
              <CheckCircleOutlineIcon color='primary'/>
            </IconButton>
            <IconButton onClick={this.handleCloseDialog}>
              <CancelIcon color='secondary'/>
            </IconButton>
          </DialogActions>
        </Dialog>
        {(databases ? databases : []).map((database, dbIndex) => {
          return(
            <div key={dbIndex}>
              <ListItem
                button
                value={dbIndex}
                onClick={event => { this.createClickDB(event, dbIndex); }}
              >
                <ListItemIcon>
                  <StorageIcon/>
                </ListItemIcon>
                <ListItemText primary={database}/>
                {open.length > dbIndex && this.state.open[dbIndex] ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>

              {(schema_tables[database] ? schema_tables[database] : []).map((table, tableIndex) => {
                return (
                  <Collapse key={tableIndex} in={this.state.open[dbIndex]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        value={dbIndex}
                        onClick={event => { this.handleClickTable(dbIndex, tableIndex); }}
                      >
                        <ListItemIcon>
                          <TableIcon color='primary' />
                        </ListItemIcon>
                        <ListItemText primary={table}/>
                      </ListItem>
                    </List>
                  </Collapse>
                  );}
                )}
            </div>
          )
        })}
      </List>
    );
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: 50,
    left: 50,
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    overflowX: 'auto'
  },
});

export default withStyles(styles, { withTheme: true })(LeftList);