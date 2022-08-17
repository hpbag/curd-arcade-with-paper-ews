import type { GetServerSideProps } from "next";

import { Board } from "lib/pages/leader-board/board";

export default function LeaderBoard() {
  return <Board />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== "test") {
    return { notFound: true };
  }
  return { props: {} };
};
