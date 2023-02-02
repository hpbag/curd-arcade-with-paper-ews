import type { GetServerSideProps } from "next";

import Home from "lib/pages/home";
import type { Tournament } from "services/tournament";
import { getCurrentTournaments, getPastTournaments } from "services/tournament";

export default Home;

export const getServerSideProps: GetServerSideProps<{
  sections: Array<{
    sectionTitle: string;
    tournaments: Tournament[];
  }>;
}> = async () => {
  return {
    props: {
      sections: [
        {
          sectionTitle: "Ongoing Games",
          tournaments: await getCurrentTournaments(),
        },
        // {
        //   sectionTitle: "Upcoming Games",
        //   tournaments: await getUpcomingTournaments(),
        // },
        {
          sectionTitle: "Ended Games",
          tournaments: await getPastTournaments(),
        },
      ],
    },
  };
};
