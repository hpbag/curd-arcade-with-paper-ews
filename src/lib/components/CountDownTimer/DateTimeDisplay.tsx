import { Stack, Text } from "@chakra-ui/react";

const DateTimeDisplay = ({ value, type }: { value: number; type: string }) => {
  return (
    <Stack alignItems="center" px={2}>
      <Text>{value}</Text>
      <Text>{type}</Text>
    </Stack>
  );
};

export default DateTimeDisplay;
