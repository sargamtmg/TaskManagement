export const truncatedText = (text, lengthExpected) => {
  let len = lengthExpected ? lengthExpected : 30;
  if (!text) return null;
  if (text.length <= len) return text;
  return text.substr(0, len) + "...";
};

export const formatDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day number
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Append 'th', 'st', 'nd', or 'rd' to the day
  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  // Construct the final formatted date string
  return `${day}${daySuffix} ${month} ${year}`;
};

export const formatTime = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  hours = hours % 12;
  minutes = minutes <= 9 ? `0${minutes}` : `${minutes}`;

  // Construct the final formatted date string
  return `${hours}:${minutes}${ampm} ${day} ${month}, ${year}`;
};

export const fixDecimal = (num) => {
  num = Number(num);
  // Check if the number has more than one decimal place
  const numStr = num.toString();
  const decimalIndex = numStr.indexOf(".");

  // If the number has more than one decimal place, round it to two decimal places
  if (decimalIndex !== -1 && numStr.substring(decimalIndex + 1).length > 1) {
    return num.toFixed(2);
  } else {
    // Otherwise, return the number as it is
    return num;
  }
};
