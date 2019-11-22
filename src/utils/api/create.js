import * as request from "../request";
import {apiList} from "../../config";

export const createDB = (database) => {
  return new Promise(((resolve, reject) => {
    request.get(apiList.createDBURL, {database})
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

export const createTable = (database, table, data) => {
  return new Promise(((resolve, reject) => {
    request.post(apiList.createTableURL, {database, table, data})
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

export const insertRow = (database, table, data) => {
  return new Promise(((resolve, reject) => {
    request.post(apiList.insertRowURL, {database, table, data})
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
