import { format, parseISO } from "date-fns";

export const getCurrentTimeAndDate = (timeZone: string) => {
  try {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      weekday: "short", // Abbreviated weekday (e.g., "Wed")
      month: "short", // Abbreviated month name (e.g., "Oct")
      day: "numeric", // Numeric day (e.g., "9")
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

// "2024-10-19" -> "Sat, Oct 19"
export const formatDate = (dateStr: string) => {
  // Parse the date string into a Date object
  const date = parseISO(dateStr);

  // Format the date to "Sat, Oct 19"
  return format(date, "EEE, MMM dd");
};
