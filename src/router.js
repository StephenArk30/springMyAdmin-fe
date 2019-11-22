//引入react jsx写法的必须
import React from 'react';
//引入需要用到的页面组件
import Index from './page/index/index';
import Login from './page/login/login';
//引入一些模块
import {BrowserRouter as Router, Route} from "react-router-dom";

function router(){
  return (
    <Router>
      <Route exact path="/" component={ Login } />
      <Route path="/index" component={ Index } />
    </Router>);
}

export default router;