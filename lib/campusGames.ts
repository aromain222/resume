export const shotScores = (position: number) => Math.abs(position - 50) <= 9;
/** One continuous arc to the rim, followed by a short drop through/past the net. */
export function shotPoint(progress: number, made: boolean) {
  const t = Math.max(0, Math.min(1, progress)),
    endX = made ? 245 : 273;
  if (t <= 0.78) {
    const u = t / 0.78;
    return {
      x: 42 + (endX - 42) * u,
      y: (1 - u) ** 2 * 138 + 2 * (1 - u) * u * -42 + u * u * 64,
    };
  }
  const u = (t - 0.78) / 0.22;
  return { x: endX + (made ? 0 : 10 * u), y: 64 + 74 * u };
}
export const cookingOrders = [
  {
    name: "Jerk chicken bowl",
    ingredients: ["Chicken", "Jerk seasoning", "Rice", "Peppers"],
    extras: ["Curry spice", "Potatoes"],
  },
  {
    name: "Curry chicken bowl",
    ingredients: ["Chicken", "Curry spice", "Rice", "Peppers"],
    extras: ["Jerk seasoning", "Steak"],
  },
  {
    name: "Steak dinner",
    ingredients: ["Steak", "Garlic butter", "Potatoes", "Greens"],
    extras: ["Chicken", "Curry spice"],
  },
];
export const orderMatches = (chosen: string[], required: string[]) =>
  chosen.length === required.length &&
  new Set(chosen).size === chosen.length &&
  required.every((item) => chosen.includes(item));
export const pokemonPairs = ["Infernape", "Pikachu", "Squirtle"] as const;
export function shuffledPairs(random: () => number = Math.random) {
  const cards = [...pokemonPairs, ...pokemonPairs];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
export const brickColors = ["Empty", "Leaf", "Trunk", "Pot"] as const;
export const bonsaiPattern = [0, 1, 1, 0, 1, 1, 1, 1, 0, 2, 0, 0, 3, 3, 3, 0];
export const bonsaiComplete = (board: number[]) =>
  board.length === bonsaiPattern.length &&
  board.every((cell, i) => cell === bonsaiPattern[i]);
