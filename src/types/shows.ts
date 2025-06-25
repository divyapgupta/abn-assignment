export type castMember = {
  person: {
    id: number;
    url: string;
    name: string;
    image?: {
      medium: string;
      original: string;
    } | null;
  };
  character: {
    id: number;
    url: string;
    name: string;
    image?: {
      medium: string;
      original: string;
    } | null;
  };
  self: boolean;
  voice: boolean;
};

export type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime?: number;
  premiered: string;
  ended: string | null;
  officialSite?: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
  } | null;
  webChannel?: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    } | null;
  } | null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode?: {
      href: string;
      name?: string;
    };
    nextepisode?: {
      href: string;
      name?: string;
    };
  };
  _embedded?: {
    cast: castMember[];
  };
};
