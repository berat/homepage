import { unstable_cache } from "next/cache";

const BASE_URL = "https://api.unsplash.com/users/beratbozkurt0";
const CLIENT_ID = `client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

const getData = async (url: string) => {
    const res = await fetch(url, { method: "GET" });
    return await res.json();
};

const buildUrl = (path: string, parameters: string = "") => {
    return `${BASE_URL}/${path}?${parameters}${CLIENT_ID}`;
};

const getStats = () => {
    const url = buildUrl("statistics");
    return getData(url);
};

const getPhotos = unstable_cache(
    (numPhotos: number = 30) => {
        const url = buildUrl("photos", `per_page=${numPhotos}&`);
        return getData(url);
    },
    [],
    {
        revalidate: 10800, // 3 hour
    }
);

// eslint-disable-next-line import/no-anonymous-default-export
export { getStats, getPhotos };