/** className 합치기. falsy 값은 건너뛰어요. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
