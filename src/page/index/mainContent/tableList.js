import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemAvatar from '@material-ui/core/ListItemAvatar/index';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import IconButton from '@material-ui/core/IconButton/index';
import Typography from '@material-ui/core/Typography/index';
import TableIcon from '@material-ui/icons/TableChart';
import DeleteIcon from '@material-ui/icons/Delete';

import { dropDB, dropTable } from "../../../utils/api/delete";
import Paper from "@material-ui/core/Paper";
import TableForm from "./tableForm";

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.handleDropTable = this.handleDropTable.bind(this);
    this.handleDropDB = this.handleDropDB.bind(this);
    this.updateTable = this.updateTable.bind(this);
  }

  handleDropTable(table) {
    let { database } = this.props;
    dropTable(database, table)
      .then(() => {
        this.updateTable();
      })
      .catch(() => {});
  }

  handleDropDB () {
    dropDB(this.props.database)
      .then(() => {
        this.props.changeMain('welcome');
      })
      .catch(err => {
        alert(err.msg);
      });
  }

  updateTable () {
    this.props.handleGetTables(this.props.database);
  }

  render() {
    const { classes } = this.props;
    let { database, tables } = this.props;
    // console.log(this.props);
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            {database}
          </Typography>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={() => {this.handleDropDB()}}/>
          </IconButton>
        </div>
        <Paper>
          <List className={classes.list}>
            {(tables ? tables : []).map((table, tableIndex) => {
              return(
                <ListItem key={tableIndex}>
                  <ListItemAvatar>
                    <TableIcon/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={table}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => this.handleDropTable(table)}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
              }
            )}
          </List>
        </Paper>
        <TableForm
          database={database}
          update={this.updateTable}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    maxHeight: 360,
    overflow: 'auto'
  }
});

export default withStyles(styles, { withTheme: true })(TableList);