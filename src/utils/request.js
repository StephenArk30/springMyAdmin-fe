const request = (url, config) => {
  config['mode'] = 'cors';
  return fetch(url, config)
    .then((res) => { return res.json(); })
    .then((resJson) => { return resJson; })
    .catch((err) => { console.error(err); });
};

// GET请求
export const get = (url, param) => {
  if (typeof param === 'object') {
    let first = true;
    for (let key in param) {
      if (param.hasOwnProperty(key) && param[key]) {
        if (first) { url += "?"; first = false; }
        else url += "&";
        url += (key + "=" + param[key]);
      }
    }
  }
  return request(url, {
    method: 'GET',
    credentials: 'include'
  });
};

// POST请求
export const post = (url, data) => {
  // console.log('post ' + url);
  return request(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    credentials: 'include'
  });
};
