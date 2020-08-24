import moment from "moment";
import "moment/locale/uk";

const dateChanger = (data) => {
  const res = data.split(".");
  const [mounth, day] = res;
  res[0] = day;
  res[1] = mounth;
  const total = res.join(".");
  return moment(total).locale("uk").format("DD MMM");
};

export const convertFormToUppercase = (date) => {
  const result = dateChanger(date).split("");
  const firstLetterToUppercase = result[3].toUpperCase();
  result.splice(3, 1, firstLetterToUppercase);
  return result.join("");
};
