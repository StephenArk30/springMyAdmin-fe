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

import { dropTable } from "../../../utils/api/delete";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
});

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(table) {
    let { database } = this.props;
    dropTable(database, table)
      .then(() => {
        this.props.handleGetTables(this.props.database);
      })
      .catch(() => {});
  }

  render() {
    const { classes } = this.props;
    let { database, tables } = this.props;
    // console.log(this.props);
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          {database}
        </Typography>
        <div className={classes.demo}>
          <List>
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
                      <DeleteIcon onClick={() => this.handleDrop(table)}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
              }
            )}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TableList);