/// <reference path="../../index.d.ts" />
import { TEAMS } from '../data.js';

/** @type Map<string, Competitor> */
const teamMap = new Map();
for (let { name, id } of TEAMS) {
  // The strength is top-secret 🤫
  teamMap.set(id, { name, id });
}

/**
 * Returns information about a team
 *
 * @param {Context} ctx
 * @param {string} teamId
 */
export default async function (ctx, teamId) {
  const team = teamMap.get(teamId);

  if (team) {
    ctx.body = team;
  } else {
    ctx.throw(404, 'Team does not exist');
  }
}
