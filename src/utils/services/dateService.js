export function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

const timeFormat = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
  hourCycle: "h24",
});
/**
 *
 * @param {datetime} date
 * @returns hours and minutes as string
 */
export function getDateHour(date) {
  const messageCreated = new Date(date);
  return timeFormat.format(messageCreated);
}
/**
 * Gets some date and returns "Today" if date is Today, "Yesterday" if date is Yesterday,
 * If it's this year the return is for example (Day of week, month, date), and if it's another
 * year we add the year also
 * @param {new Date()} date
 * @returns {formated message date}
 */

export const getMessagesDate = (date) => {
  const dateConfig = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (today.toDateString() === date.toDateString()) {
    return "Today";
  } else if (yesterday.toDateString() === date.toDateString()) {
    return "Yesterday";
  } else if (today.getFullYear() - date.getFullYear() !== 0) {
    dateConfig["year"] = "numeric";
  }
  return date.toLocaleDateString("en-us", dateConfig);
};
