import { Show } from "../types/shows";

export default async function fetchShowInformation(
  showId: number,
): Promise<Show> {
  const res = await fetch(`https://api.tvmaze.com/shows/${showId}?embed=cast`);
  if (!res.ok) throw new Error(`Failed to fetch show with ID ${showId}`);
  return await res.json();
}
