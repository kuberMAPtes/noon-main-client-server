export function abbreviateLongString(text, maxLen = 15, replaceWith = "...") {
  if (!text) {
    return "";
  }
  return text.length > maxLen ? `${text.substring(0, maxLen)}${replaceWith}` : text;
}