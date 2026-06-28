// Bundled fallback puzzle shown (as "Practice") inside the empty state
// when today's Daily can't be fetched. Generated once with the real solver;
// it ships with the app so a total S3 outage still can't crash or dead-end
// the game. See docs/adr/0009.
import type { Game } from "./local_types"

export const fallbackGame: Game = {
  "goalNumbers": [
    123,
    456,
    789
  ],
  "playNumbers": [
    3,
    7,
    25,
    50,
    75,
    100
  ],
  "solutions": {
    "123": {
      "min_operations": [
        "3 × 7 = 21",
        "50 ÷ 25 = 2",
        "21 + 100 = 121",
        "2 + 121 = 123"
      ],
      "max_operations": [
        "3 + 7 = 10",
        "10 × 50 = 500",
        "75 + 500 = 575",
        "575 ÷ 25 = 23",
        "23 + 100 = 123"
      ]
    },
    "456": {
      "min_operations": [
        "3 + 75 = 78",
        "100 ÷ 25 = 4",
        "4 + 50 = 54",
        "7 × 54 = 378",
        "78 + 378 = 456"
      ],
      "max_operations": [
        "3 + 75 = 78",
        "100 ÷ 25 = 4",
        "4 + 50 = 54",
        "7 × 54 = 378",
        "78 + 378 = 456"
      ]
    },
    "789": {
      "min_operations": [
        "50 ÷ 25 = 2",
        "2 + 100 = 102",
        "7 × 102 = 714",
        "75 + 714 = 789"
      ],
      "max_operations": [
        "50 ÷ 25 = 2",
        "2 + 100 = 102",
        "7 × 102 = 714",
        "75 + 714 = 789"
      ]
    }
  },
  "date": "",
  "gameNumber": 0
}
