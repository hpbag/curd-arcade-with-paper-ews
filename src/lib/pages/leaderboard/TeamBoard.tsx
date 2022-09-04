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
    [TEAM_THIRDWEB]: { value: TEAM_THIRDWEB, score: 0, otherPlayers: 0 },
    [TEAM_PAPER]: { value: TEAM_PAPER, score: 0, otherPlayers: 0 },
    "Team Milk Road": { value: "Team Milk Road", score: 0, otherPlayers: 0 },
    "Team BuildSpace": { value: "Team BuildSpace", score: 0, otherPlayers: 0 },
  };
  type TeamScoreKeys = keyof typeof teamScores;
  rows.forEach((row) => {
    if (!row.team) {
      // james or jake
      if (row.value === "@jameszmsun") {
        teamScores[TEAM_PAPER].score += row.score;
      }
      if (row.value === "@jake") {
        teamScores[TEAM_THIRDWEB].score += row.score;
      }
    }
    Object.keys(teamScores).forEach((team) => {
      if (team === row.team) {
        teamScores[team as TeamScoreKeys].score += row.score;
      } else {
        teamScores[team as TeamScoreKeys].otherPlayers += 1;
      }
    });
  });
  const teamScoreSorted = Object.keys(teamScores)
    .sort((key1, key2) => {
      return (
        teamScores[key2 as TeamScoreKeys].score -
        teamScores[key1 as TeamScoreKeys].score
      );
    })
    .map((team) => {
      return teamScores[team as TeamScoreKeys];
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
              <Th isNumeric>Potential Team Winning</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamScoreSorted.map((row, index) => {
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
                  <Td isNumeric>
                    {Intl.NumberFormat("en-US", {
                      currency: "USD",
                      style: "currency",
                    }).format(row.otherPlayers * 16.83 + 52.66)}
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
