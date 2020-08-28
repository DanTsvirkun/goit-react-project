import moment from "moment";
import "moment/locale/uk";

export const formatDateChanger = (chartDays) => {
  const newFormatDayMounth = formatDate(chartDays);
  newFormatDayMounth.unshift("Планування");
  return newFormatDayMounth;
};

const formatDate = (chartDays) =>
  chartDays.map((data) => convertFormToUppercase(data));

export const convertFormToUppercase = (date) => {
  const newFormatDayMounth = moment(returnDayFormat(date))
    .locale("uk")
    .format("DD MMM");
  const result = newFormatDayMounth.split("");
  const firstLetterToUppercase = result[3].toUpperCase();
  result.splice(3, 1, firstLetterToUppercase);
  return result.join("");
};

const returnDayFormat = (data) => {
  const res = data.split(".");
  const [mounth, day] = res;
  res[0] = day;
  res[1] = mounth;
  return res.join(".");
};

export const getRedLineArr = (hoursPlanned, sprintDuration) => {
  const result = [hoursPlanned];
  const sprintHoursPerDay = hoursPlanned / sprintDuration;
  let remainingHours = hoursPlanned;

  for (let i = 0; i < sprintDuration; i += 1) {
    result.push((remainingHours - sprintHoursPerDay).toFixed(2));
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
    result.push((remainingHours - hoursPersingleDay).toFixed(2));
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
  } else {
    correctArrHoursWastedPerDay = item.hoursWastedPerDay.map((el) => ({
      ...el,
      singleHoursWasted:
        (itemHoursPlanned / itemHoursWasted) * el.singleHoursWasted,
    }));
  }
  return correctArrHoursWastedPerDay;
};

const singleHoursWasted = (item, i) =>
  Number(corrHoursArrChecker(item)[i].singleHoursWasted);
