const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const piratebay_url = "https://proxtpb.art/s/?q="
const torrentz2_url = "https://torrentz2.eu/search?f=";
const zooqle_url =  "https://zooqle.com/search?q="

function searchPiratebay(searchTerm) {
    return fetch(`${piratebay_url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
              $('.detName').each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $link = $element.find("a");
                
                const result = {
                    title: $title.attr('title'),
                    link: "https://proxtpb.art" + $link.attr('href')
                    
                };
                results.push(result);
            });
            return results;
        });
}

// function searchZooqle(searchTerm) {
//     return fetch(`${torrentz2_url}${searchTerm}`)
//         .then(response => response.text())
//         .then(body => {
//             const results = [];
//             const $ = cheerio.load(body);
//               $('dt').each(function(i, element) {
//                 const $element = $(element);
//                 const $title = $element.find("a");
//                 const $link = $element.find("a");

                
//                 const result = {
//                     title: $title.attr('title'),
//                     link:"https://zooqle.com" + $link.attr('href')
                    
//                 };
//                 results.push(result);
//             });
//             return results;
//         });
// }


function searchTorrentz2(searchTerm) {
    return fetch(`${torrentz2_url}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const results = [];
            const $ = cheerio.load(body);
             $("dl").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("dt a");
                const $link = $element.find("dt a");

                    const result = {
                        title : $title.text(),
                        link : "https://torrentz2.eu" + $link.attr('href')
                };
                results.push(result);
            });
            return results;
        });
}

module.exports = {
    searchPiratebay,
    // searchZooqle,
    searchTorrentz2
};