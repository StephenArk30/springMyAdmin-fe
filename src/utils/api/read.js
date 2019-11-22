import * as request from "../request";
import { apiList } from '../../config';

export const login = (username, password) => {
  return new Promise(((resolve, reject) => {
    request.post(apiList.loginURL, {username, password})
      .then((res) => {
        // console.log(res);
        if (res && res.hasOwnProperty("res")) {
          resolve(res.res);
        } else if (res && res.hasOwnProperty("err")) {
          reject({ msg: "wrong username or password" });
        } else { reject({ msg: 'invalid response' }) }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.hasOwnProperty("err")) {
          reject({ msg: err.err });
        } else { reject({ msg: 'invalid response' }) }
      });
  }));
};

export const getDatabases = () => {
  return new Promise(((resolve, reject) => {
    request.get(apiList.getDBURL)
      .then((res) => {
        // console.log(res);
        if (res && res.hasOwnProperty("res")) {
          resolve(res.res);
        } else if (res && res.hasOwnProperty("err")) {
          reject({ msg: res.err });
        } else { reject({ msg: 'invalid response' }) }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.hasOwnProperty("err")) {
          reject({ msg: err.err });
        } else { reject({ msg: 'invalid response' }) }
      });
  }));
};

export const getTables = (database) => {
  return new Promise(((resolve, reject) => {
      request.get(apiList.getTableURL, {database})
      .then((res) => {
        // console.log(res);
        if (res && res.hasOwnProperty("res")) {
          resolve(res.res);
        } else if (res && res.hasOwnProperty("err")) {
          reject({ msg: res.err });
        } else { reject({ msg: 'invalid response' }) }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.hasOwnProperty("err")) {
          reject({ msg: err.err });
        } else { reject({ msg: 'invalid response' }) }
      });
  }));
};

export const getData = (database, table, limit, offset, orderBy, order) => {
  return new Promise(((resolve, reject) => {
      request.get(apiList.getDataURL, {database, table, limit, offset, orderBy, order})
      .then((res) => {
        // console.log(res);
        if (res && res.hasOwnProperty("res") && res.hasOwnProperty("count")) {
          resolve(res);
        } else if (res && res.hasOwnProperty("err")) {
          reject({ msg: res.err });
        } else { reject({ msg: 'invalid response' }) }
      })
      .catch((err) => {
        // console.log(err);
        if (err && err.hasOwnProperty("err")) {
          reject({ msg: err.err });
        } else { reject({ msg: 'invalid response' }) }
      });
  }));
};
