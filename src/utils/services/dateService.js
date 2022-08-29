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
/**
 *
 * @param {datetime} date
 * @returns hours and minutes as string
 */
export function getDateHour(date) {
  const messageCreated = new Date(date);
  const minutes = messageCreated.getMinutes().toLocaleString();
  const time =
    messageCreated.getHours() +
    ":" +
    (minutes.length === 1 ? "0" + minutes : minutes);

  return time;
}
