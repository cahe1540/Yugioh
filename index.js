//MODULES
const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = require(`./replaceTemplate`);

/*Added a comment to practice checkout*/

//read html template files
const tmpCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tmpMonster = fs.readFileSync(`${__dirname}/templates/template-monster.html`, 'utf-8');
const tmpOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');

//read json data
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const data = JSON.parse(json);

const server = http.createServer((req, res) => {

    //first remember how to properly extract the url
    const pathname = url.parse(req.url, true).pathname;
    const query = url.parse(req.url, true).query;

    //add routing here using if-else-if
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        //generate a card for each element in json file
        const cards = data.map(el => {
            return replaceTemplate(tmpCard, el);
        }).join('');

        //update cards to overview 
        const overview = tmpOverview.replace(/{%CARDS%}/g, cards);

        //send response
        res.end(overview);

    } else if (pathname === '/monster') {
        res.writeHead(200, { 'Content-type': 'text/html' });


        if (!query.id) {
            res.writeHead(404, { 'Content-type': 'text/html' });
            return res.end(`<h1 style="text-align:center;">NO MONSTER ID WAS PROVIDED!</h1>`);
        }

        try {
            const monster = replaceTemplate(tmpMonster, data[query.id]);
            res.end(monster);
        } catch (error) {
            res.writeHead(404, { 'Content-type': 'text/html' });
            return res.end(`<h1 style="text-align:center;">THAT MONSTER ID DOES NOT EXIST!</h1>`);
        }

    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(json);

        //correctly render the images
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(pathname)) {
        fs.readFile(`${__dirname}/data/img${pathname}`, (err, data) => {
            res.writeHead(200, { "Content-type": "image/jpeg" });
            res.end(data);
        });

        //bad url
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end(`<h1 style="text-align:center;">URL NOT FOUND!</h1>`);
    }
});

const port = 7000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
