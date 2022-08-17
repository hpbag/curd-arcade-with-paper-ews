import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

export const Board = ({
  rows,
  game,
  user,
}: {
  game: string;
  rows: { value: string; score: number }[];
  user?: { value: string; rank: number; score: number };
}) => {
  const [isUserInList, setIsUserInList] = useState(false);
  return (
    <>
      <Heading textAlign="center" py={5} fontSize={{ base: "2xl", md: "3xl" }}>
        {game} Leader Board
      </Heading>
      <TableContainer maxW="md" mx="auto">
        <Table variant="simple">
          <TableCaption>
            Rank for same scoring users is not reflective of actual position
          </TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => {
              if (row.value === user?.value && !isUserInList) {
                setIsUserInList(true);
              }
              return (
                <Tr key={row.value}>
                  <Td isNumeric>{index}</Td>
                  <Td>{row.value}</Td>
                  <Td isNumeric>{row.score}</Td>
                </Tr>
              );
            })}
            {!isUserInList && user && (
              <>
                <Tr>
                  <Td isNumeric>...</Td>
                  <Td>...</Td>
                  <Td isNumeric>...</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>{user.rank}</Td>
                  <Td>{user.value}</Td>
                  <Td isNumeric>{user.score}</Td>
                </Tr>
              </>
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};
