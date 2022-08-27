import { useEffect, useState } from "react";

import { DateStatus, getDateStatus } from "./useDateStatus";

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export const useCountDown = (dateStart: string, dateEnd: string) => {
  const dateStatus = getDateStatus(new Date(dateStart), new Date(dateEnd));
  let countDownDate: number;
  switch (dateStatus) {
    case DateStatus.ONGOING:
    case DateStatus.ENDED: {
      countDownDate = new Date(dateEnd).getTime();
      break;
    }
    case DateStatus.UPCOMING: {
      countDownDate = new Date(dateStart).getTime();
      break;
    }
    default:
      countDownDate = new Date(dateEnd).getTime();
  }

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};
