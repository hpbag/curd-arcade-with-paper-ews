import { buildspaceNWSlug, upcomingEventSlug, web3Slug } from "./tournament";

const FLAP_SPACE_GAME_NAME = "Flap Bird";

export type Game = Awaited<ReturnType<typeof getTournamentGames>>[0];

export enum AvailableGames {
  FLAP_SPACE = "flap-space",
}
export enum GameScoring {
  FFA = "FFA",
  TEAM = "TEAM",
}

export async function getTournamentGames() {
  return [
    {
      tournamentSlug: upcomingEventSlug,
      slug: AvailableGames.FLAP_SPACE,
      // this should be in a separate Games tables with only information about the Games.
      name: FLAP_SPACE_GAME_NAME,
      scoring: GameScoring.FFA,
    },
    {
      tournamentSlug: web3Slug,
      slug: AvailableGames.FLAP_SPACE,
      // this should be in a separate Games tables with only information about the Games.
      name: FLAP_SPACE_GAME_NAME,
      scoring: GameScoring.TEAM,
    },
    {
      tournamentSlug: buildspaceNWSlug,
      slug: AvailableGames.FLAP_SPACE,
      name: FLAP_SPACE_GAME_NAME,
      scoring: GameScoring.FFA,
    },
  ];
}

export async function getTournamentGamesByTournament(
  tournamentSlug: string
): Promise<Game[]> {
  const games = await getTournamentGames();
  return games.filter((game) => game.tournamentSlug === tournamentSlug);
}
export async function getTournamentGamesByTournamentAndGame(
  tournamentSlug: string,
  gameSlug: AvailableGames
): Promise<Game | undefined> {
  const games = await getTournamentGames();
  return games.filter(
    (game) => game.tournamentSlug === tournamentSlug && game.slug === gameSlug
  )[0];
}
