export interface CharacterDTO {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  create: string;
  edited: string;
  url: string;
}

class Character {
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  create: string;
  edited: string;
  url: string;

  constructor({
    birth_year,
    eye_color,
    hair_color,
    skin_color,
    name,
    height,
    mass,
    gender,
    homeworld,
    films,
    vehicles,
    starships,
    create,
    edited,
    url,
  }: CharacterDTO) {
    this.birthYear = birth_year;
    this.eyeColor = eye_color;
    this.hairColor = hair_color;
    this.skinColor = skin_color;
    this.name = name;
    this.height = height;
    this.mass = mass;
    this.gender = gender;
    this.homeworld = homeworld;
    this.films = films;
    this.vehicles = vehicles;
    this.starships = starships;
    this.create = create;
    this.edited = edited;
    this.url = url;
  }
}

export default Character;
