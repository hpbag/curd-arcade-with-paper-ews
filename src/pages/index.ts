import type { GetServerSideProps } from "next";

import { ROUTE_TOURNAMENT_PAGE } from "lib/constants/routes";
import type { TournamentCardProps } from "lib/pages/home";
import Home from "lib/pages/home";

export default Home;

export const getServerSideProps: GetServerSideProps<{
  sections: Array<{
    sectionTitle: string;
    tournaments: TournamentCardProps[];
  }>;
}> = async () => {
  return {
    props: {
      sections: [
        {
          sectionTitle: "Upcoming Games",
          tournaments: [
            {
              title: "To Be Revealed",
              imageUrl: "/tournament-logo/question-mark.png",
              participantsOverride: 0,
              prizePoolOverride: 0,
              nftContractAddress: "",
              tokenContractAddress: "",
              treasuryAddress: "",
              tournamentLink: ROUTE_TOURNAMENT_PAGE("soon"),
            },
          ],
        },
        {
          sectionTitle: "Ongoing Games",
          tournaments: [
            {
              title: "Web3Sf Speakers",
              imageUrl: "/tournament-logo/web3sf.svg",
              participantsOverride: 0,
              prizePoolOverride: 0,
              nftContractAddress: "",
              tokenContractAddress:
                "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
              treasuryAddress: "",
              tournamentLink: ROUTE_TOURNAMENT_PAGE("web3sf"),
            },
          ],
        },
        {
          sectionTitle: "Ended Games",
          tournaments: [
            {
              title: "BuildSpace Flap Off",
              imageUrl: "/buildspace.png",
              participantsOverride: 14,
              prizePoolOverride: 235.62,
              nftContractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
              tokenContractAddress:
                "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
              treasuryAddress: "0x61c66721D9094DA3ceCED0F2C52c36c3AE94A319",
              tournamentLink: ROUTE_TOURNAMENT_PAGE("n&w-buildspace"),
            },
          ],
        },
      ],
    },
  };
};
