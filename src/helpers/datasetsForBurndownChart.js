import moment from "moment";

export const formatDateChanger = (chartDays) => {
  const newDateFormat = formatDate(chartDays);
  const planningDay = moment(newDateFormat[0])
    .subtract(1, "day")
    .format("DD MMM");
  newDateFormat.unshift(planningDay);
  return newDateFormat;
};

const formatDate = (chartDays) =>
  chartDays
    .map((data) => {
      const res = data.split(".");
      const [mounth, day] = res;
      res[0] = day;
      res[1] = mounth;
      return res.join(".");
    })
    .map((el) => moment(el).format("DD MMM"));

export const getRedLineArr = (hoursPlanned, sprintDuration) => {
  const result = [hoursPlanned];
  const sprintHoursPerDay = hoursPlanned / sprintDuration;
  let remainingHours = hoursPlanned;

  for (let i = 0; i < sprintDuration; i += 1) {
    result.push((remainingHours - sprintHoursPerDay).toFixed(1));
    remainingHours -= sprintHoursPerDay;
  }
  return result;
};

export const getBlueLineArr = (hoursPlanned, sprintDuration, itemsArr) => {
  const arrOftotalHoursPerDay = getSumArrOfHoursPerSingleDay(
    sprintDuration,
    itemsArr
  );
  const result = [hoursPlanned];
  let remainingHours = hoursPlanned;

  for (let hoursPersingleDay of arrOftotalHoursPerDay) {
    result.push((remainingHours - hoursPersingleDay).toFixed(1));
    remainingHours -= hoursPersingleDay;
  }
  return result;
};

export const getSumArrOfHoursPerSingleDay = (sprintDuration, itemsArr) => {
  const result = [];
  for (let i = 0; i < sprintDuration; i += 1) {
    let total = 0;
    for (let item of itemsArr) {
      total += singleHoursWasted(item, i);
    }
    result.push(total);
  }
  return result;
};

const corrHoursArrChecker = (item) => {
  const itemHoursPlanned = item.hoursPlanned;
  const itemHoursWasted = item.hoursWasted;
  let correctArrHoursWastedPerDay = null;
  if (itemHoursPlanned >= itemHoursWasted) {
    correctArrHoursWastedPerDay = item.hoursWastedPerDay;
    console.log("correct :>> ", correctArrHoursWastedPerDay);
  } else {
    correctArrHoursWastedPerDay = item.hoursWastedPerDay.map((el) => ({
      ...el,
      singleHoursWasted:
        (itemHoursPlanned / itemHoursWasted) * el.singleHoursWasted,
    }));
    console.log("percent :>> ", correctArrHoursWastedPerDay);
  }
  return correctArrHoursWastedPerDay;
};

const singleHoursWasted = (item, i) =>
  Number(corrHoursArrChecker(item)[i].singleHoursWasted);
