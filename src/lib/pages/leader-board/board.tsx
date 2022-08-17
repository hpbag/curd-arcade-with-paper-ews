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

export const Board = () => {
  return (
    <>
      <Heading textAlign="center">Leader Board</Heading>
      <TableContainer maxW="md" mx="auto">
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>23</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};
