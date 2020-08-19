import moment from 'moment';

export const newState = (task, item) => {
  const newArray = [...task.hoursWastedPerDay];
  const newObj = {
    ...newArray[item.idx],
    singleHoursWasted: item.numValue,
  };
  newArray.splice(item.idx, 1, newObj);
  let total;
  if (!isNaN(item.numValue)) {
    total = newArray.reduce((acc, el) => acc + Number(el.singleHoursWasted), 0);
  }

  return {
    ...task,
    hoursWastedPerDay: newArray,
    hoursWasted: total,
  };
};

export const findCurrentDay = ([task]) => {
  const currentDate = moment().format('DD.MM.YYYY');
  const hoursWastedPerDay = task.hoursWastedPerDay;
  const res = hoursWastedPerDay.findIndex((el, idx) => {
    const isCorrectDay = el.currentDay === currentDate;

    if (isCorrectDay) {
      return el;
    }
    if (hoursWastedPerDay.length === idx + 1 && !isCorrectDay) {
      return hoursWastedPerDay[idx];
    }
  });
  return res;
};
