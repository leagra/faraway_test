import React, { FC, ReactNode, useState, createContext, useMemo } from "react";

import Character from "../entity/character";
import { SwapiServiceController } from "../service/swapi";

type ListCharacter = (page?: number) => Promise<Character[] | void>;
type GetCharacter = (characterId: number) => Promise<Character | void>;

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

  const listCharacter: ListCharacter = async (page) => {
    try {
      setIsLoading(true);

      const result = await swapiService.listCharacter(page ?? currentPage);

      if (page) {
        setCurrentPage(page);
      }

      if (result) {
        const { count, characters } = result;

        setCount(count);
        setCharacters(characters);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacter: GetCharacter = async (characterId) => {
    const character = swapiService.getCharacter(characterId);
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
