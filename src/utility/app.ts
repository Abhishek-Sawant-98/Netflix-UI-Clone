import { Movie } from "../config/AppTypes";

export const truncateString = (str: string, maxLength: number): string => {
    if (!str || !str.length || str === "undefined") return "Loading...";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

export const { VITE_IMG_BASE_URL, VITE_NETFLIX_LOGO, VITE_USER_AVATAR } = import.meta.env;