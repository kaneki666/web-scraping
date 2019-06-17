const fetch = require("node-fetch");
const cheerio = require("cheerio");


const url1 = "https://bikroy.com/bn/ads?query=";
const url2 = "https://cellbazaar.com/search/pattern,";
const url3 = "https://www.pickaboo.com/search/result/?q="

function searchProducts1(searchTerm) {
    return fetch(`${url1}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const products = [];
            const $ = cheerio.load(body);
            $(".item-content").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find(".item-title");
                const $location = $element.find(".item-area");
                const $price = $element.find(".item-info");
                const $link = $element.find("a");
                const $image = $element.find("div.item-thumb a img");
                const $bikroy = "https://bikroy.com";
                const $website = "Product of bikroy.com";

                const product = {
                    title: $title.text(),
                    location: $location.text(),
                    price: $price.text(),
                    link: $bikroy + $link.attr("href"),
                    image: $image.attr("currentSrc"),
                    website: $website
                };
                products.push(product);
            });

            return products;
        });
}


function searchProducts2(searchTerm) {
    return fetch(`${url2}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const products = [];
            const $ = cheerio.load(body);
            $(".tanim-item").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find(".resp-title");
                const $location = $element.find(".loc");
                const $price = $element.find(".price");
                const $link = $element.find(".view");
                const $image = $element.find(".lazy");
                const $website = " Product of cellbazaar.com";

                const product = {
                    title: $title.text(),
                    location: $location.text(),
                    price: $price.text(),
                    link: $link.attr("href"),
                    image: $image.attr("src"),
                    website: $website
                };
                products.push(product);
            });

            return products;
        });
}

function searchProducts3(searchTerm) {
    return fetch(`${url3}${searchTerm}`)
        .then(response => response.text())
        .then(body => {
            const products = [];
            const $ = cheerio.load(body)
            $(".product-item").each(function(i, element) {
                const $element = $(element);
                const $title = $element.find("a");
                const $website = " Product of pickaboo.com";
                const $price = $element.find(".price");
                const $link = $element.find("a");
                const $image = $element.find(".img-responsive");          

                const product = {
                    title: $title.attr('title'),
                    price: $price.text(),
                    link: $link.attr("href"),
                    image: $image.attr("src"),
                    website: $website
                };
                products.push(product);
            });

            return products;
        });
}

const puppeteer = require('puppeteer');
const url4 = "https://www.amazon.com/s?k="

function searchProducts4(searchTerm) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`${url4}${searchTerm}`);
            
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('.a-section img');
                let items2 = document.querySelectorAll('.a-offscreen');
                let items3 = document.querySelectorAll('.a-link-normal');
                items.forEach((item) => {
                    results.push({
                        title:  item.getAttribute('alt'),
                        image:  item.getAttribute('src')                        
                        
                    });
                });
                
                items2.forEach((item) => {
                    results.push({
                       
                        price:  item.innerText
                                               
                    });
                });
                
                items3.forEach((item) => {
                    results.push({
                       
                        link:  item.getAttribute('href')
                                                
                    });
                });
                

                
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}




module.exports = {
    searchProducts1,
    searchProducts2,
    searchProducts3,
    searchProducts4
};