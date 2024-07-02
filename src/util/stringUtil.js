export function abbreviateLongString(text, maxLen = 15, replaceWith = "...") {
  return text.length > maxLen ? `${text.substring(0, maxLen)}${replaceWith}` : text;
}