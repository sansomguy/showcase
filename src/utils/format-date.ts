export function formatDate(str: string) {
  const dt = Date.parse(str);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dt);
  return formattedDate;
}
