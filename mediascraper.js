const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url1 = "https://www2.123movies.la/search/";
const url2 = "https://www2.watchmovie.io/search.html?keyword=";
const url3 = "https://www1.9anime.nl/search?keyword=";
const url4 = "https://www4.gogoanime.io//search.html?keyword=";

function search1(searchTerm) {
    return fetch(`${url1}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
             $(".ml-item").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $description = $element.find("a img");
                const $image = $element.find(".a-section img");
                
                const result = {
                    title: $description.attr('title') ,
                    link: $title.attr('href'),
                    image: $description.attr('data-original')
                    
                };
                results.push(result);
            });
            return results;
        });
}

function search2(searchTerm) {
    return fetch(`${url2}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
               $(".video-block").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $link = $element.find("a");
                const $image = $element.find("img");
                
                const result = {
                    title: $title.attr('title'),
                    link: "https://www2.watchmovie.io"+ $link.attr('href'),
                    image: $image.attr('src')
                    
                };
                results.push(result);
            });
            return results;
        });
}

function search3(searchTerm) {
    return fetch(`${url3}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
               $(".inner").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $link = $element.find("a");
                const $image = $element.find("img");

                const result = {
                    title: $title.text(),
                    link: $link.attr('href'),
                    image: $image.attr('src')
                    
                };
                results.push(result);
            });
            return results;
        });
}

function search4(searchTerm) {
    return fetch(`${url4}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
                     $("ul.items li").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $link = $element.find("a");
                const $image = $element.find("img");

                const result = {
                    title: $title.attr('title') ,
                    link: "https://www4.gogoanime.io" + $link.attr('href'),
                    image: $image.attr('src')
                    
                };
                results.push(result);
            });
            return results;
        });
}

module.exports = {
   search1,
   search2,
   search3,
   search4
};