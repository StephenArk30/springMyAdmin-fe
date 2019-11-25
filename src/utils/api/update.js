import * as request from "../request";
import {apiList} from "../../config";

export const updateRow = (database, table, column_values, where) => {
  return new Promise(((resolve, reject) => {
    request.post(apiList.updateRowURL, {database, table, column_values, where})
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
