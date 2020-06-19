/**
 * this function converts the input to a slugified string, which has no spaces
 * and only contains alphanumeric characters, underscores, or hyphens.
 * regex taken from https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
 * @param {string} text input text to be slugified
 * @returns {string} slugified input
 */
const convertToSlug = (text:string):string => {
    return text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[-]+/g, '-')
      .replace(/[^\w-]+/g,'');
}

export default convertToSlug;