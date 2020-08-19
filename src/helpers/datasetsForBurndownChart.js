import moment from "moment";

export const getRedLineArr = (hoursPlanned, sprintDuration) => {
  const result = [hoursPlanned];
  const sprinHoursPerDay = hoursPlanned / sprintDuration;
  let remainingHours = hoursPlanned;

  for (let i = 0; i < sprintDuration; i += 1) {
    result.push((remainingHours - sprinHoursPerDay).toFixed(1));
    remainingHours -= sprinHoursPerDay;
  }
  return result;
};

export const getSumArrOfSingleHoursPerDay = (sprintDuration, itemsArr) => {
  const result = [];

  for (let j = 0; j < sprintDuration; j += 1) {
    let total = 0;
    for (let i = 0; i < itemsArr.length; i += 1) {
      total += Math.abs(itemsArr[i].hoursWastedPerDay[j].singleHoursWasted);
      if (i + 1 === itemsArr.length) {
        result.push(total);
      }
    }
  }
  return result;
};

export const getBlueLineArr = (hoursPlanned, sprintDuration, itemsArr) => {
  const result = [hoursPlanned];
  let remainingHours = hoursPlanned;

  for (let i = 0; i < sprintDuration; i += 1) {
    const totalHoursPerSingleDay = getSumArrOfSingleHoursPerDay(
      sprintDuration,
      itemsArr
    )[i];
    result.push((remainingHours - totalHoursPerSingleDay).toFixed(1));
    remainingHours -= totalHoursPerSingleDay;
  }
  return result;
};

export const formatDateChanger = (chartDays) => {
  const formatDate = chartDays
    .map((data) => {
      const res = data.split(".");
      const [mounth, day] = res;
      res[0] = day;
      res[1] = mounth;
      return res.join(".");
    })
    .map((el) => moment(el).format("DD MMM"));

  const planningDay = moment(formatDate[0]).subtract(1, "day").format("DD MMM");
  formatDate.unshift(planningDay);
  return formatDate;
};
