import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Clock from './clock';
import { login } from '../../utils/api/read';

import "./login.scss";

class LoginForm extends Component {
  handleLogin () {
    let { username, password } = this.state;
    login(username, password)
      .then(auth => {
        // console.log(auth);
        this.props.handleToIndex();
      })
      .catch(err => {
        // alert(err.msg);
        this.setState({ error: true})
      });
  };

  handleChange (event) {
    // console.log("value", event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      error: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <Card className='card'>
        <form noValidate autoComplete="off" className='container'>
          <TextField
            id="username"
            name="username"
            label="Username"
            margin="normal"
            error={this.state.error}
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            margin="normal"
            type="password"
            error={this.state.error}
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="goButton">
            <Button variant="contained" className='goButton' onClick={this.handleLogin} color="primary">
              Go
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default class Login extends Component {
  handleToIndex () {
    this.props.history.push('/index');
  };

  render() {
    return (
      <div className='container'>
        <Clock/>
        <Typography variant="h4" gutterBottom>
          springMyAdmin
        </Typography>
        <LoginForm
          handleToIndex={() => this.handleToIndex()}
        />
      </div>
    )
  }
}