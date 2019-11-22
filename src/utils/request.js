const request = (url, config) => {
  return fetch(url, config).then((res) => {
    return res.json();
  }).then((resJson) => {
    // console.log(resJson);
    return resJson;
  }).catch((err) => {
    console.error(err);
  });
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
  // console.log('get ' + url);
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
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    credentials: 'include'
  });
};
