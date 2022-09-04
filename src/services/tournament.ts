import { isAfter, isBefore } from "date-fns";

import { ROUTE_TOURNAMENT_PAGE } from "lib/constants/routes";

export type Tournament = Awaited<ReturnType<typeof getUpcomingTournaments>>[0];

export const upcomingEventSlug = "soon";
export const web3Slug = "web3sf";
export const buildspaceNWSlug = "n&w-buildspace";

export async function getTournaments() {
  return [
    {
      title: "To Be Revealed",
      description:
        "Big things coming. Alpha drop: Holding the previous two event's NFTs is going to help.",
      // unique
      slug: upcomingEventSlug,
      imageUrl: "/tournament-logo/question-mark.png",
      // nullable
      participantsOverride: 0,
      // nullable
      prizePoolOverride: 0,
      // do we want the next three contract address to be nullable?
      nftContractAddress: "",
      tokenContractAddress: "",
      treasuryAddress: "",
      tournamentLink: ROUTE_TOURNAMENT_PAGE(upcomingEventSlug),
      // dates
      dateStart: "Wed Sept 8 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
      dateEnd: "Sun Sept 11 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
      // probably do a date create, updated and deleted.
    },
    {
      title: "Web3Sf Speakers",
      description: `We're doing something a little different for this event! The sum of everyone's score with the same NFT will determine the winning group. What do you win? The other NFT holder's buy-in scaled according to your score. Choose wisely.`,
      slug: web3Slug,
      imageUrl: "/tournament-logo/web3sf.svg",
      participantsOverride: null,
      prizePoolOverride: null,
      nftContractAddress: "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F",
      tokenContractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      treasuryAddress: "0x61c66721D9094DA3ceCED0F2C52c36c3AE94A319",
      tournamentLink: ROUTE_TOURNAMENT_PAGE(web3Slug),
      dateStart: "Sat Aug 27 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
      dateEnd: "Tue Sept 6 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
    },
    {
      title: "BuildSpace Flap Off",
      description: "Free for all.",
      slug: buildspaceNWSlug,
      imageUrl: "/tournament-logo/buildspace.png",
      participantsOverride: 14,
      prizePoolOverride: 235.62,
      nftContractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
      tokenContractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      treasuryAddress: "0x61c66721D9094DA3ceCED0F2C52c36c3AE94A319",
      tournamentLink: ROUTE_TOURNAMENT_PAGE(buildspaceNWSlug),
      dateStart: "Mon Aug 15 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
      dateEnd: "Fri Aug 19 2022 00:00:00 GMT-0700 (Pacific Daylight Time)",
    },
  ];
}

export async function getPastTournaments() {
  const tournaments = await getTournaments();
  return tournaments.filter((tournament) => {
    return isBefore(new Date(tournament.dateEnd), new Date());
  });
}
export async function getCurrentTournaments() {
  const tournaments = await getTournaments();
  return tournaments.filter((tournament) => {
    const today = new Date();
    return (
      isBefore(new Date(tournament.dateStart), today) &&
      isAfter(new Date(tournament.dateEnd), today)
    );
  });
}
export async function getUpcomingTournaments() {
  const tournaments = await getTournaments();
  return tournaments.filter((tournament) => {
    return isAfter(new Date(tournament.dateStart), new Date());
  });
}

/**
 *
 * @param slug This is a unique identifier of tournaments since
 * there can be at most one tournament at a link
 * @returns Tournament
 */
export async function getTournamentBySlug(
  slug: string
): Promise<Tournament | undefined> {
  return (await getTournaments()).filter((tournament) => {
    return tournament.slug === slug;
  })[0];
}
