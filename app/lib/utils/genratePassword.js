import crypto from "crypto";

export function generateSecurePassword(length = 12) {
  if (length < 10) {
    throw new Error("Password length must be at least 10 characters");
  }

  const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const LOWER = "abcdefghijkmnopqrstuvwxyz";
  const NUMBER = "23456789";
  const SYMBOL = "@#$%&*!?";

  const ALL = UPPER + LOWER + NUMBER + SYMBOL;

  // Ensure complexity rules are met
  let password = [
    UPPER[crypto.randomInt(UPPER.length)],
    LOWER[crypto.randomInt(LOWER.length)],
    NUMBER[crypto.randomInt(NUMBER.length)],
    SYMBOL[crypto.randomInt(SYMBOL.length)],
  ];

  // Fill remaining length
  for (let i = password.length; i < length; i++) {
    password.push(ALL[crypto.randomInt(ALL.length)]);
  }

  // Shuffle to avoid predictable order
  return password.sort(() => crypto.randomInt(3) - 1).join("");
}
