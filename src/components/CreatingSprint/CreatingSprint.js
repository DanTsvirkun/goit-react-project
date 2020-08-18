import React, { Component } from "react";
import css from "./CreatingSprint.module.css";
import DatePicker from "react-datepicker";
import uk from "date-fns/locale/uk";
import { registerLocale, setDefaultLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./overRidingStyles.css";

registerLocale("uk", uk);

class CreatingSprint extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <div className={css.sprint__window__overlay}>
        <div className={css.sprint__window}>
          <button className={css.close__sprint__window}> </button>
          <h2 className={css.sprint__window__header}> Створення спринта </h2>
          <div className={css.sprint__window__content}>
            <form className={css.sprint__form}>
              <div className={css.group}>
                <input
                  type="text"
                  required
                  className={`${css.input__field} ${css.input__name}`}
                />
                <span className={css.highlight}> </span>
                <span className={css.bar}> </span>
                <label className={css.sprint_label}> Назва спринта </label>
              </div>
              <div
                className={`${css.group} ${css.group__inline} ${css.group__start}`}
              >
                {/* <input type="text" required className={css.input__start} /> */}
                <DatePicker
                  popperClassName={css.some_custom_class}
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  locale="uk"
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Дата початку"
                  showMonthPicker
                />
                <span className={css.highlight}> </span>
                <span className={css.bar}> </span>
                <label className={css.sprint_label}> </label>
              </div>
              <div className={`${css.group} ${css.group__inline}`}>
                <input
                  type="text"
                  required
                  className={`${css.input__field} ${css.input__duration}`}
                />
                <span className={css.highlight}> </span>
                <span className={css.bar}> </span>
                <label className={css.sprint_label}> Тривалість </label>
              </div>
              <div className={css.button__wrapper}>
                <button className={css.button__ready}> </button>
                <button className={css.button__decline}> </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatingSprint;
