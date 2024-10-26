module.exports.getTodaysDate = () => {
  return new Date().toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

module.exports.getDateSevenDaysAgo = () => {
  const currentDate = new Date();

  return new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString();
};
