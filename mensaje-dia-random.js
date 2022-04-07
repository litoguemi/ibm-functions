function main(params) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    const today = new Date();
    
    let day     = '01';
    let month   = '01';
    let year    = '2005';
    
    let n = 12
    var zerofilled = ('00'+n).slice(-2);
    
    day     = ('00'+between(1, 28)).slice(-2);
    month   = ('00'+between(1, today.getMonth())).slice(-2);
    year    = between(2005, today.getFullYear());
    

    https.get('https://es.wikiquote.org/w/api.php?action=parse&text={{'+month+''+day+'|año='+year+'}}&format=json', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        const quote = JSON.parse(data).parse.text['*']
        console.log(quote);

        resolve({ quote })
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
      reject({ error: err.message })
    });

  })
}

function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}
