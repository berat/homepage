import moment from "moment/moment";

type Categories = {
  name: string;
  value: string;
};

/**
 * Extracts and returns the names of categories from an array of category objects.
 *
 * @param {Categories[]} categories - An array of category objects, each containing a 'name' property.
 * @returns {string[]} An array of category names extracted from the input array.
 */
export const getCategory = (categories: Categories[]) => {
  return categories.map((category: Categories) => {
    return category.name;
  });
};

/**
 * Formats a given date string into a default website format.
 *
 * This function takes a date string as input and returns a formatted string
 * in the format "DD MMM, YYYY", where:
 * - "DD" is the two-digit day of the month,
 * - "MMM" is the three-letter abbreviation of the month,
 * - "YYYY" is the four-digit year.
 *
 * @param {string} datestring - The date string to be formatted. It should be
 * in a format that can be parsed by the moment library.
 * @returns {string} A string representing the formatted date.
 */
export function defaultDateFormat(datestring: string) {
  let date = moment(datestring);

  const day = moment(date).format("DD");
  const month = moment(date).format("MMM");
  const year = moment(date).format("YYYY");
  return `${day} ${month}, ${year}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * This function ensures that the generated integer is within the bounds by rounding
 * the minimum value up and the maximum value down, then using these adjusted values
 * to calculate a random integer.
 *
 * @param {number} minimum - The lower bound of the random integer range, inclusive.
 * @param {number} maximum - The upper bound of the random integer range, inclusive.
 * @returns {number} A random integer between the specified minimum and maximum values.
 *
 * @example
 * // Returns a random integer between 1 and 10, inclusive.
 * const randomInt = getRandomInt(1, 10);
 */
export function getRandomInt(minimum, maximum) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Validates a Twitter or X.com URL to check if it matches the expected pattern for a tweet URL.
 *
 * This function uses a regular expression to determine if the provided URL corresponds to a valid
 * tweet URL format from either twitter.com or x.com. It checks for the presence of a username and
 * a tweet ID in the URL structure.
 *
 * @param {string} url - The URL to be validated as a tweet URL.
 * @returns {RegExpMatchArray | null} - Returns a match array if the URL is a valid tweet URL,
 * or null if it does not match the expected pattern.
 */
export function validTweet(url) {
  const regex = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status\/(\d+)/;
  const match = url.match(regex);
  return match;
}

/**
 * Extracts the tweet ID from a given Twitter URL.
 *
 * This function takes a URL string as input and attempts to extract the tweet ID
 * using a regular expression match. If the URL is valid and contains a tweet ID,
 * the function returns the ID as a string. If the URL is invalid or does not
 * contain a tweet ID, the function returns null.
 *
 * @param {string} url - The Twitter URL from which to extract the tweet ID.
 * @returns {string | null} The extracted tweet ID if the URL is valid, otherwise null.
 */
export function getTweetIdFromUrl(url) {
  const match = validTweet(url);
  return match ? match[2] : null;
}

/**
 * Extracts the YouTube video ID from a given URL.
 *
 * This function takes a YouTube URL and attempts to extract the video ID
 * using a regular expression. It supports both standard YouTube URLs and
 * shortened youtu.be URLs.
 *
 * @param {string} url - The URL of the YouTube video.
 * @returns {string | null} The extracted YouTube video ID if found, otherwise null.
 */
export function getYoutubeId(url) {
  const regex = /(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\w+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
