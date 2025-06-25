import { Show } from "../types/shows";

export default async function fetchShows(): Promise<Show[]> {
  const res = await fetch("https://api.tvmaze.com/shows");
  if (!res.ok) throw new Error("Failed to fetch shows");
  return res.json();
}
