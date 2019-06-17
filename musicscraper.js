const fetch = require("node-fetch");
const cheerio = require("cheerio");

const mp3download_url = "https://mp3download.center/mp3/"

function searchMp3download(searchTerm) {
    return fetch(`${mp3download_url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
              $("li.media").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("h4.media-heading");
                const $description = $element.find("p");
                const $link = $element.find("a");      

                const result = {
                    title: $title.text(),
                    description: $description.text(),
                    link: "https://mp3download.center" + $link.attr("href")
                    
                };
                results.push(result);
            });
            return results;
        });
}