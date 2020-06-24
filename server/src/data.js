/// <reference path="../index.d.ts" />
import { djb2, debug } from './helpers.js';

const NAMES = [
  'Unreal Mad Engineers',
  'eLemonators',
  'One Kick Wonders',
  'Goal Diggers',
  'Abcde FC',
  'Cirque Du Sore Legs',
  'No De Feet',
  "Arse n' all",
  'Whateverton',
  'West Ham Sandwich',
  "AC Me Rollin'",
  'Inter the Pub',
  'Pathetico Madrid',
  'Beercelona',
  'Ball of Duty',
  'Class on Grass',
  'Spraining Men',
  'Victorious Secret',
  'Kiss My Pass',
  'Ice Ice Bebe',
  'Sons of Pitches',
  'Sore Boozers',
  'Smells Like Team Spirit',
  'Beastie Balls',
];

/** @type Competitor[] */
export const TEAMS = NAMES.map((name) => {
  const team = {
    // Just something to make them consistent between server restarts, so that
    // candidates can have an easier time debugging
    id: djb2(name).toString(16).padStart(8, 'x'),
    name,
    strength: Math.random(),
  };

  debug('Adding %o', team);

  return team;
});

debug('Teams ordered by strength');
TEAMS.sort((a, b) => b.strength - a.strength).forEach((t, i) =>
  debug('  %d. %d %s', i, t.strength.toFixed(2), t.name)
);
