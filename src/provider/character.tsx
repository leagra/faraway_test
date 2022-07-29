import React, { FC, ReactNode, useState, createContext, useMemo } from "react";

import Character from "../entity/character";
import { SwapiServiceController } from "../service/swapi";

type ListCharacter = (page?: number) => Promise<void>;
type GetCharacter = (characterId: string) => Promise<Character | undefined>;

export interface CharacterController {
  isLoading: boolean;
  characters: Character[];
  count: number;
  currentPage: number;
  rowsPerPage: number;
  listCharacter: ListCharacter;
  getCharacter: GetCharacter;
}

export const CharacterContext = createContext<CharacterController>({
  isLoading: false,
  characters: [],
  count: 0,
  rowsPerPage: 10,
  currentPage: 1,
  listCharacter: async () => undefined,
  getCharacter: async () => undefined,
});

CharacterContext.displayName = "CharacterContext";

interface CharacterProviderProps {
  swapiService: SwapiServiceController;
  children: ReactNode;
}

const CharacterProvider: FC<CharacterProviderProps> = ({
  swapiService,
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const listCharacter: ListCharacter = async () => {
    try {
      setIsLoading(true);

      const result = await swapiService.listCharacter(currentPage);

      if (result) {
        const { count, characters } = result;

        setCount(count);
        setCharacters((oldCharacters) => [...oldCharacters, ...characters]);
        setCurrentPage((oldCurrentPage) => oldCurrentPage + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacter: GetCharacter = async (characterId) => {
    try {
      const currentCharacter = characters.find(
        (value) => value.id === characterId
      );

      if (currentCharacter) {
        return currentCharacter;
      }

      setIsLoading(true);

      const character = await swapiService.getCharacter(characterId);

      if (character) {
        setCharacters((oldCharacters) => [...oldCharacters, character]);

        return character;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        isLoading,
        characters,
        currentPage,
        count,
        rowsPerPage,
        listCharacter,
        getCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
