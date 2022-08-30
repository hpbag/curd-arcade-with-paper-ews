import {
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TEAM_PAPER = "Team Paper";
const TEAM_THIRDWEB = "Team thirdweb";

export const TeamBoard = ({
  rows,
  user,
}: {
  rows: {
    value: string;
    score: number;
    walletAddress: string | undefined;
    team: string | undefined;
  }[];
  user?: {
    value: string;
    rank: number | null;
    score: number | null;
    team: string | undefined;
    walletAddress: string | undefined;
  };
}) => {
  const teamScores = {
    [TEAM_PAPER]: { value: TEAM_PAPER, score: 0 },
    [TEAM_THIRDWEB]: { value: TEAM_THIRDWEB, score: 0 },
    "Team Milk Road": { value: "Team Milk Road", score: 0 },
    "Team BuildSpace": { value: "Team BuildSpace", score: 0 },
  };
  rows.forEach((row) => {
    if (!row.team) {
      // james or jake
      if (row.value === "@jameszmsun") {
        const paper = TEAM_PAPER;
        const result = teamScores[paper];
        result.score = (result.score || 0) + row.score;
        result.value = TEAM_PAPER;
        return { ...teamScores, "Team Paper": result };
      }
      if (row.value === "@jake") {
        const thirdweb = TEAM_THIRDWEB;
        const result = teamScores[thirdweb];
        result.score = (result.score || 0) + row.score;
        result.value = TEAM_THIRDWEB;
        return { ...teamScores, [TEAM_THIRDWEB]: result };
      }
      return undefined;
    }
    type TeamScoreKeys = keyof typeof teamScores;
    const result = teamScores[row.team as TeamScoreKeys];
    result.score = (result.score || 0) + row.score;
    result.value = row.team;
    return { ...teamScores, [row.team]: result };
  });

  return (
    <Stack align="center">
      <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
        Team Leader Board
      </Heading>

      <TableContainer maxW={{ base: "sm", md: "md" }} mx="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>Team</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(teamScores).map((row, index) => {
              return (
                <Tr key={row.value}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>
                    {row.value === user?.team ? (
                      <Text fontWeight="bold">{row.value} (Your Team!)</Text>
                    ) : (
                      row.value
                    )}
                  </Td>
                  <Td isNumeric>{Math.round((row.score || 0) * 10) / 10}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Text fontSize="xs" opacity={0.6}>
        Winning team takes the Pot!
      </Text>
    </Stack>
  );
};
