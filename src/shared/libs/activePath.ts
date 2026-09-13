import { ALLOWED_URLS } from "../constants";

export const isPathActive = (path: string) => {
    return Object.values(ALLOWED_URLS).find(key => ALLOWED_URLS[key].slice(1) === path);
}