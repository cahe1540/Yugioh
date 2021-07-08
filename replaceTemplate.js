
module.exports = (template, object) => {

    let html = template.replace(/{%CARDNAME%}/g, object.name);
    html = html.replace(/{%ATK%}/g, object.attack);
    html = html.replace(/{%DEF%}/g, object.defense);
    html = html.replace(/{%SERIES%}/g, object.series);
    html = html.replace(/{%PRICE%}/g, object.price);
    html = html.replace(/{%ID%}/g, object.id);
    html = html.replace(/{%DESCRIPTION%}/g, object.description);
    html = html.replace(/{%IMAGE%}/g, object.image);

    return html;
}