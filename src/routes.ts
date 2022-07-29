export const paths = {
  root: () => "/",
  character: () => `${paths.root()}:characterId`,
  toCharacter: (characterId?: string) => `${paths.root()}${characterId}`,
};
