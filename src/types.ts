export type ResponseInfo = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Place;
  location: Place;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type Place = {
  name: string;
  url: string;
};
