export function isValid(timestamp) {
  return !!new Date(timestamp).getTime();
}

export function friendlyTime(timestamp) {
  // convert milliseconds to whole minutes and remaining seconds
  const totalSeconds = (timestamp - Date.now()) / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds - minutes * 60);

  // time has passed so no countdown
  if (minutes < 0) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    minutes: minutes,
    seconds: seconds,
  };
}

export function futureTime(minutes) {
  // future time in milliseconds
  return Date.now() + minutes * 60 * 1000;
}