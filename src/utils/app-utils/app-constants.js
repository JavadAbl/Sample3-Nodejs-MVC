export const appConstants = {
  ACCESS_TOKEN_EXPIRE: new Date(Date.now() + 15 * 60 * 1000),
  REFRESH_TOKEN_EXPIRE: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  PAGE_SIZE: 6,
};
Object.freeze(appConstants);
