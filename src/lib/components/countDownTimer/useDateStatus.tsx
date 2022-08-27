import { isAfter } from "date-fns";

export enum DateStatus {
  UPCOMING,
  ONGOING,
  ENDED,
}

export function getDateStatus(dateStart: Date, dateEnd: Date) {
  const today = new Date();
  if (isAfter(dateStart, today)) {
    return DateStatus.UPCOMING;
  }
  if (isAfter(dateEnd, today)) {
    return DateStatus.ONGOING;
  }
  return DateStatus.ENDED;
}
