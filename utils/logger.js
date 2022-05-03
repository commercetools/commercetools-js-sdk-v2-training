const highlight = require('cli-highlight').highlight
const chalkAnimation = require('chalk-animation');

const codeLog = function (o, lang) {
    console.log(highlight(
        JSON.stringify(o, null, 4),
        {
            language: lang,
            ignoreIllegals: true
        }
    ));
}

module.exports.log = function (o, lang) {
    lang = lang ? lang : 'json';
    if (o.hasOwnProperty('stack')) {
        console.error(o.stack)
        codeLog(o)
    }
    else if (o.hasOwnProperty('body')
        && o.hasOwnProperty('statusCode')
        && o.statusCode < 300) {
        codeLog(o.body, 'json');
        console.log('');
        const rainbow = chalkAnimation.rainbow('C O N G R A T U L A T I O N S : HTTP Status ' + o.statusCode);
        setTimeout(() => {
            rainbow.stop();
        }, 2000);
    }
    else {
        codeLog(o);
    }
}