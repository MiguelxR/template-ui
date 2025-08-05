// Interface para la ubicación (location y origin)
export interface Location {
  name: string;
  url: string;
}

// Interface principal para el personaje de Rick and Morty
export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string; // ISO date string
}

// Interface para el response de la Promise (si necesitas el wrapper)
export interface CharacterResponse {
  status: "fulfilled" | "rejected";
  value?: Character;
}
