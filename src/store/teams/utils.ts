import { TeamResult, TeamState  } from '../../models/team';
import gamesAPI from '../../api/games';
import { createTeam, updateScore } from './index';
import { Dispatch } from 'react';

export const getMatchResults = (teams: [string, string], result: string) => {
  const [
    teamAID,
    teamBID
  ] = teams;
  const teamResults = [
    createTeamResult(teamAID),
    createTeamResult(teamBID)
  ];

  evaluateWinnerAndAddResults(result, teamResults);

  return teamResults;
};

export const createTeamResult = (id: string): TeamResult => ({
  id,
  points: 0,
  goalsScored: 0,
  wins: 0,
  losses: 0
});

export const evaluateWinnerAndAddResults = (matchGoals: string, teamResults: TeamResult[]) => {
  const teamAGoals = +matchGoals[0];
  const teamBGoals = +matchGoals[2];
  const [
    teamA,
    teamB
  ] = teamResults;

  if (teamAGoals > teamBGoals) {
    //team A wins
    assignScore(teamA, 3, teamAGoals);
    assignScore(teamB, 0, teamBGoals);
  } else if (teamAGoals === teamBGoals) {
    assignScore(teamA, 1, teamAGoals);
    assignScore(teamB, 1, teamBGoals);
  } else {
    //team B wins
    assignScore(teamA, 0, teamAGoals);
    assignScore(teamB, 3, teamBGoals);
  }
};

export const assignScore = (team: TeamResult, points: number, goals: number) => {
  team.points = points;
  team.goalsScored = goals;

  if (points === 3) {
    team.wins = 1;
  } else if (points === 0) {
    team.losses = 1;
  }

  return team;
};

export const findTeamMatchResult = (matchResults: TeamResult[], teamId: string) =>
  matchResults.find((result) => result.id === teamId);

export const createNewTeams = async (
  params: {
    incomingTeams: string[];
    matchResults: TeamResult[];
  },
  dispatch: Dispatch<any>
) => {
  const { incomingTeams, matchResults } = params;

  for (let id of incomingTeams) {
    const matchResult = findTeamMatchResult(matchResults, id);

    if (matchResult) {
      await createNewTeam({ id, matchResult }, dispatch);
    }
  }
};

export const createNewTeam = async (
  params: {
    id: string;
    matchResult: TeamResult;
  },
  dispatch: Dispatch<any>
) => {
  const { id, matchResult } = params;
  const { data: { name } } = await gamesAPI.getTeamById(id);

  dispatch(createTeam({ name, ...matchResult }));
};

export const updateTeams = async (
  params: {
    currentTeams: TeamState;
    incomingTeams: string[];
    matchResults: TeamResult[];
  },
  dispatch: Dispatch<any>
) => {
  const { currentTeams, incomingTeams, matchResults } = params;

  for (let id of incomingTeams) {
    const matchResult = findTeamMatchResult(matchResults, id);

    if (matchResult) {
      const team = currentTeams[id];
      if (team) {
        // if team is found, update the score
        dispatch(updateScore(prepareUpdateObj(team, matchResult)));
      } else {
        // if the team isn't found, create team
        await createNewTeam(
          {
            id,
            matchResult
          },
          dispatch
        );
      }
    }
  }
};

export const prepareUpdateObj = (team: any, matchResult: any) => {
  const { id, ...teamUpdate } = matchResult;

  for (let [
    key,
    val
  ] of Object.entries(teamUpdate)) {
    teamUpdate[key] = val + team[key];
  }

  const gamesPlayed = team.gamesPlayed + 1;

  return { ...teamUpdate, gamesPlayed, id };
};
