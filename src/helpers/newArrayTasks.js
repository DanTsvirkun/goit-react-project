import moment from "moment";

export const newState = (task, item) => {
  const newArray = [...task.hoursWastedPerDay];
  const numValue = Number(item.numValue);
  const newObj = {
    ...newArray[item.idx],
    singleHoursWasted: numValue,
  };
  newArray.splice(item.idx, 1, newObj);
  let total;
  total = newArray.reduce((acc, el) => acc + Number(el.singleHoursWasted), 0);
  // if (!isNaN(item.numValue) && Number(item.numValue) >= 0) {

  return {
    ...task,
    hoursWastedPerDay: newArray,
    hoursWasted: total,
  };
};

export const findCurrentDay = ([task]) => {
  if (!task) {
    return 0;
  }
  const currentDate = moment().format("DD.MM.YYYY");
  const hoursWastedPerDay = task.hoursWastedPerDay;
  const res = hoursWastedPerDay.findIndex((el, idx) => {
    const isCorrectDay = el.currentDay === currentDate;

    if (isCorrectDay) {
      return el;
    }
    if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
      const firstElArray = idx + 1 - hoursWastedPerDay.length;

      return;
    }
  });

  if (res < 0) {
    return 0;
  }

  return res;
};
