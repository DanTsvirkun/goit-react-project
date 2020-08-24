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
  const one = dateChanger(date).split("");
  const firstLetterToUppercase = one[3].toUpperCase();
  one.splice(3, 1, firstLetterToUppercase);
  return one.join("");
};
