import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';

// components
import LeftList from './leftList'
import DataTable from './mainContent/dataChart'
import TableList from './mainContent/tableList'

import {getTables} from "../../utils/api/read";

let currentTable = '';
let update = false;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainType: 'welcome',
      data: [],
      database: '',
      table: '',
      schema_tables: {}
    };
    this.handleGetTables = this.handleGetTables.bind(this);
  }

  changeMain = (type, name) => {
    // console.log(type, name);
    if (type === 'database') {
      this.setState({
        mainType: 'table',
        database: name,
      });
      currentTable = '';
    } else if (type === 'table') {
      this.setState({
        mainType: 'data',
        table: name
      });
    }
  };

  handleGetTables(database) {
    getTables(database).then(tables => {
      // console.log(tables);
      let { schema_tables } = this.state;
      schema_tables[database] = tables;
      // console.log(schema_tables);
      this.setState({ schema_tables });
      this.changeMain('database', database);
    });
  };

  render() {
    let { classes } = this.props;
    let mainContent = (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" component="h1">
            Welcome to springMyAdmin!
          </Typography>
        </CardContent>
      </Card>
    );
    // console.log(this.state);
    if (this.state.mainType === 'table') {
      mainContent = (<TableList
        database={this.state.database}
        tables={this.state.schema_tables[this.state.database]}
        handleGetTables={this.handleGetTables}
      />);
    } else if (this.state.mainType === 'data') {
      // console.log('return datatable');
      if (this.state.table !== undefined && this.state.table !== currentTable) {
        currentTable = this.state.table;
        update = !update;
      }
      mainContent = (
        <DataTable
          table={this.state.table}
          database={this.state.database}
          update={update}
        />
        );
    }

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              springMyAdmin
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar}/>
          <LeftList
            changeMain={this.changeMain}
            schema_tables={this.state.schema_tables}
            handleClickDB={this.handleGetTables}
          />
        </Drawer>

        <main className={classes.content}>
          {mainContent}
        </main>
      </div>
    );
  }
}

const drawerWidth = 300;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    padding: theme.spacing(3),
    margin: (60 - theme.spacing(3)) + 'px 0 0 0',
    width: '74%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  card: {
    padding: theme.spacing(3),
    margin: (60 - theme.spacing(3)) + 'px 0 0 0',
    width: 600,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
});

export default withStyles(styles, { withTheme: true })(Index);