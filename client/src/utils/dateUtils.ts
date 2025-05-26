import {
  format,
  parseISO,
  differenceInCalendarDays,
  isWeekend,
} from "date-fns";

export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) {
    return "N/A";
  }
  
  try {
    if (date instanceof Date) {
      return format(date, "MMM dd, yyyy");
    }
    return format(parseISO(date), "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error, "Date value:", date);
    return "Invalid date";
  }
};

export const formatDateTime = (date: Date | string | null | undefined): string => {
  if (!date) {
    return "N/A";
  }
  
  try {
    if (date instanceof Date) {
      return format(date, "MMM dd, yyyy HH:mm");
    }
    return format(parseISO(date), "MMM dd, yyyy HH:mm");
  } catch (error) {
    console.error("Error formatting datetime:", error, "Date value:", date);
    return "Invalid date";
  }
};

export const calculateBusinessDays = (
  startDate: string,
  endDate: string,
  holidays: string[] = []
): number => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  let count = 0;
  const holidayDates = holidays.map((h) => parseISO(h));

  const currentDate = new Date(start);
  while (currentDate <= end) {
    const isHoliday = holidayDates.some(
      (holiday) =>
        holiday.getDate() === currentDate.getDate() &&
        holiday.getMonth() === currentDate.getMonth() &&
        holiday.getFullYear() === currentDate.getFullYear()
    );

    if (!isWeekend(currentDate) && !isHoliday) {
      count++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};

export const calculateLeaveDuration = (
  startDate: string,
  endDate: string
): number => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return differenceInCalendarDays(end, start) + 1;
};
