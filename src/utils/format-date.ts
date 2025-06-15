export function formatDate(str: string) {
  try {
    const dt = Date.parse(str);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dt);
    return formattedDate;
  } catch (error) {
    return "N/A";
  }
}
