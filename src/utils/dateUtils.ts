export const getCurrentTimeAndDate = (timeZone: string) => {
  try {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      month: "short", // Abbreviated month name (e.g., "Sep")
      day: "numeric", // Numeric day (e.g., "5")
      hour: "numeric", // Hour
      minute: "numeric", // Minute
      hour12: true, // 12-hour format
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(currentDate);

    return formattedDate;
  } catch (error) {
    console.error(`Error: Invalid time zone - ${timeZone}`);
    return "Invalid time zone";
  }
};
