// utils/text.ts
export function possessive(name?: string) {
  const n = (name ?? "").trim();
  if (!n) return "your neighborhood's";                 // fallback
  if (/['']s$/i.test(n)) return n;                      // already possessive (e.g., Queen's)
  if (/['']$/i.test(n)) return n;                       // ends with apostrophe already
  return /s$/i.test(n) ? `${n}'` : `${n}'s`;           // Los Angeles' / Altamonte Springs' vs. Beverly Hills's (style choice: ')
}