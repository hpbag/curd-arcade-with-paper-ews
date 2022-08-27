import { Flex, Heading } from "@chakra-ui/react";

import DateTimeDisplay from "./DateTimeDisplay";
import { useCountDown } from "./useCountDown";
import { DateStatus, getDateStatus } from "./useDateStatus";

const ExpiredNotice = () => {
  return <Heading>Event Ended</Heading>;
};

function OngoingNotice() {
  return <Heading>Ending in:</Heading>;
}
function UpcomingNotice() {
  return <Heading>Starting in:</Heading>;
}
function DeterminingTime() {
  return <Heading>Checking Timings...</Heading>;
}

const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  return (
    <Flex>
      <DateTimeDisplay value={days} type="Days" />
      :
      <DateTimeDisplay value={hours} type="Hours" />
      :
      <DateTimeDisplay value={minutes} type="Mins" />
      :
      <DateTimeDisplay value={seconds} type="Seconds" />
    </Flex>
  );
};

export const CountDownTimer = ({
  dateStart,
  dateEnd,
}: {
  dateStart: string;
  dateEnd: string;
}) => {
  const dateStatus = getDateStatus(new Date(dateStart), new Date(dateEnd));
  const [days, hours, minutes, seconds] = useCountDown(dateStart, dateEnd);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  }

  let CountdownHeader: React.ReactNode;
  switch (dateStatus) {
    case DateStatus.ENDED:
      return <ExpiredNotice />;
    case DateStatus.ONGOING:
      CountdownHeader = OngoingNotice();
      break;
    case DateStatus.UPCOMING:
      CountdownHeader = UpcomingNotice();
      break;
    default:
      CountdownHeader = DeterminingTime();
  }

  return (
    <>
      {CountdownHeader}
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </>
  );
};
