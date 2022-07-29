import axios from "axios";
import queryString from "query-string";

import Character, { CharacterDTO } from "../entity/character";

interface SwapiProps {
  baseURL: string;
}

interface ListCharacterResultDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: CharacterDTO[];
}

interface ListCharacterResult {
  count: number;
  characters: Character[];
}

type ListCharacter = (
  page?: number
) => Promise<ListCharacterResult | undefined>;
type GetCharacter = (charactedId: string) => Promise<Character | undefined>;

export interface SwapiServiceController {
  listCharacter: ListCharacter;
  getCharacter: GetCharacter;
}

interface CharactersQueryParameters {
  page?: number;
}

const paths = {
  characters: (query?: CharactersQueryParameters) =>
    `people${query ? `?${queryString.stringify(query)}` : ""}`,
  character: (charactedId: string) => `${paths.characters()}/${charactedId}`,
};

const mapListCharacterResult: (
  data: ListCharacterResultDTO
) => ListCharacterResult = ({ count, results }) => ({
  count,
  characters: results.map((data) => new Character(data)),
});

const SwapiService = ({ baseURL }: SwapiProps): SwapiServiceController => {
  const instance = axios.create({ baseURL });

  const listCharacter: ListCharacter = async (page = 1) => {
    try {
      const result = await instance.get<ListCharacterResultDTO>(
        paths.characters({ page })
      );

      return mapListCharacterResult(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getCharacter: GetCharacter = async (characterId) => {
    try {
      const result = await instance.get(paths.character(characterId));

      return new Character(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  return { listCharacter, getCharacter };
};

export default SwapiService;
