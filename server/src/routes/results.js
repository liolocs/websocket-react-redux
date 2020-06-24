/// <reference path="../../index.d.ts" />

/**
 * Returns the list of games played
 *
 * @param {Context} ctx
 * @param {string} teamId
 */
export default async function (ctx) {
  const { gameResults } = ctx;
  ctx.body = {
    gameResults: gameResults.map(({ teams, result }) => ({ teams, result })),
  };
}
