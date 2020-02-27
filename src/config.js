const baseUrl = 'http://www.arkonrive.site:4811/api/';

const apiList = {
  loginURL: baseUrl + 'login',

  getDBURL: baseUrl + 'read/getDB',
  getTableURL: baseUrl + 'read/getTables',
  getDataURL: baseUrl + 'read/getData',

  createDBURL: baseUrl + 'create/createDB',
  createTableURL: baseUrl + 'create/createTable',
  insertRowURL: baseUrl + 'create/insertRow',

  dropDBURL: baseUrl + 'delete/dropDB',
  dropTableURL: baseUrl + 'delete/dropTable',
  deleteRowURL: baseUrl + 'delete/deleteRow',

  updateRowURL: baseUrl + 'update/updateRow'
};

module.exports = {
  baseUrl,
  apiList
};
