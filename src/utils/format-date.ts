export function formatDate(str: string) {
  const editedDate = Date.parse(str);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(editedDate);
  return formattedDate;
}
