import * as request from "../request";
import {apiList} from "../../config";

export const dropDB = (database) => {
  return new Promise(((resolve, reject) => {
    request.get(apiList.dropDBURL, {database})
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

export const dropTable = (database, table) => {
  return new Promise(((resolve, reject) => {
    request.get(apiList.dropTableURL, {database, table})
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

export const deleteRow = (database, table, where) => {
  return new Promise(((resolve, reject) => {
    request.post(apiList.deleteRowURL, {database, table, where})
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
