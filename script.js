var today = new Date();
var current_date = today.getDate();
var current_month = today.getMonth() + 1;
var current_year = today.getFullYear();

var year_message = document.getElementById("year-message");
var month_message = document.getElementById("month-message");
var date_message = document.getElementById("date-message");

var output_years = document.getElementById("output-years");
var output_months = document.getElementById("output-months");
var output_days = document.getElementById("output-days");

var labels = document.querySelectorAll("label");
var inputs=document.querySelectorAll("input");

const isLeapYear = (year) =>
  (year % 100 == 0 && year % 4 != 0) || year % 400 == 0 ? true : false;

const daysInMonth = [
  0,
  31,
  isLeapYear(current_year) ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

document
  .getElementById("calculate")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const birth_year = document.getElementById("years").value;
    const birth_month = document.getElementById("months").value;
    const birth_date = document.getElementById("date").value;

    setDefaultStyles();

    var a = validateYear(birth_year);
    var b = validateMonth(birth_year, birth_month);
    var c = validateDate(birth_year, birth_month, birth_date);

    if (a && b && c) {
      if (current_date < birth_date) {
        current_date = current_date + daysInMonth[birth_month - 1];
        current_month = current_month - 1;
      }
      if (current_month < birth_month) {
        current_month = current_month + 12;
        current_year = current_year - 1;
      }

      var calculatedyear = current_year - birth_year;
      var calculatedMonth = current_month - birth_month;
      var calculatedDate = current_date - birth_date;

      output_years.innerHTML = calculatedyear;
      output_months.innerHTML = calculatedMonth;
      output_days.innerHTML = calculatedDate;
    } else {
      for (const label of labels) label.classList.add("add");
      for (const input of inputs) input.classList.add("highlight");
    }
  });
function validateYear(birth_year) {
  if (birth_year.trim() === "") {
    year_message.innerHTML = "This field is required!";
    return false;
  }
  if (birth_year > current_year) {
    year_message.innerHTML = "year must be in past";
    return false;
  }
  return true;
}
function validateMonth(birth_year, birth_month) {
  if (birth_month.trim() === "") {
    month_message.innerHTML = "This field is required!";
    return false;
  }
  if (birth_month < 1 || birth_month > 12) {
    month_message.innerHTML = "Must be a valid month!";
    return false;
  }
  if (birth_year == current_year) {
    if (birth_month > current_month) {
      month_message.innerHTML = "month  must be in past!";
      return false;
    }
  }
  return true;
}
function validateDate(birth_year, birth_month, birth_date) {
  if (birth_date.trim() === "") {
    date_message.innerHTML = "This field is required!";
    return false;
  }
  if (birth_date < 1 || birth_date > 31) {
    date_message.innerHTML = "Must be a valid date!";
    return false;
  }
  if (birth_year == current_year) {
    if (birth_month == current_month) {
      if (birth_date > current_date) {
        date_message.innerHTML = "date must be in past!";
        return false;
      }
    }
  }
  return true;
}

function setDefaultStyles()
{
    year_message.innerHTML = "";
    month_message.innerHTML = "";
    date_message.innerHTML = "";

    output_years.innerHTML = "-- ";
    output_months.innerHTML = "-- ";
    output_days.innerHTML = "-- ";

    for (const label of labels) label.classList.remove('add');
    for (const input of inputs) input.classList.remove("highlight");
}
