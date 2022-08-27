import { Flex, Heading } from "@chakra-ui/react";

import DateTimeDisplay from "./DateTimeDisplay";
import { useCountDown } from "./useCountDown";

const ExpiredNotice = () => {
  return <Heading>Ended</Heading>;
};

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

export const CountDownTimer = ({ targetDate }: { targetDate: number }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  }
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};
