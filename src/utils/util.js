export const setStateAsync = (that, state) => {
  return new Promise((resolve) => {
    that.setState(state, resolve)
  });
};

export const getDays = () => {
  let monthStartDate = new Date();
  console.log(monthStartDate);
  let monthEndDate = new Date(2020, 0, 15);
  console.log(monthEndDate);

  return Math.ceil(Math.abs(monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24));
};