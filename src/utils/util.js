export const setStateAsync = (that, state) => {
  return new Promise((resolve) => {
    that.setState(state, resolve)
  });
};

export const remove = function(array, val) {
  let index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1);
  }
};