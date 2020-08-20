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
    for (let item of itemsArr) {
      const itemHoursPlanned = item.hoursPlanned;
      const itemHoursWasted = item.hoursWasted;
      let correctArrHoursWastedPerDay;

      if (itemHoursPlanned >= itemHoursWasted) {
        correctArrHoursWastedPerDay = item.hoursWastedPerDay;
      } else {
        correctArrHoursWastedPerDay = item.hoursWastedPerDay.map((el) => ({
          ...el,
          singleHoursWasted:
            (itemHoursPlanned / itemHoursWasted) * el.singleHoursWasted,
        }));
      }

      const singleHoursWasted = Number(
        correctArrHoursWastedPerDay[j].singleHoursWasted
      );
      total += singleHoursWasted;
    }
    result.push(total);
  }
  return result;
};

export const getBlueLineArr = (hoursPlanned, sprintDuration, itemsArr) => {
  const result = [hoursPlanned];
  let remainingHours = hoursPlanned;

  //   for (let i = 0; i < sprintDuration; i += 1) {
  //   const totalHoursPerSingleDay = getSumArrOfSingleHoursPerDay(
  //     sprintDuration,
  //     itemsArr
  //   )[i];
  const arrOftotalHoursPerDay = getSumArrOfSingleHoursPerDay(
    sprintDuration,
    itemsArr
  );

  for (let hoursPersingleDay of arrOftotalHoursPerDay) {
    result.push((remainingHours - hoursPersingleDay).toFixed(1));
    remainingHours -= hoursPersingleDay;
  }
  //   }
  console.log("result :>> ", result);
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
