const axios = require("axios");
const cheerio = require("cheerio");

async function extractMP4Links(url) {
  const response = await axios.get(url);
  const html = response.data;

  const $ = cheerio.load(html);
  const links = $("a");

  const mp4Links = [];
  links.each((i, link) => {
    const href = $(link).attr("href");
    if (href && href.endsWith(".mp4")) {
      mp4Links.push(href);
    }
  });

  return mp4Links;
}

(async () => {
  const url = "https://cnnespanol.cnn.com/video/turquia-aleppo-danos-terremoto-ciudad-antigua-perspectivas-buenos-aires/";
  const mp4Links = await extractMP4Links(url);

  console.log("Enlaces MP4 encontrados:");
  mp4Links.forEach((link, i) => {
    console.log(`${i + 1}. ${link}`);
  });
})();
