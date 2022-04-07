function main(params) {
  return new Promise((resolve, reject) => {
    const https = require('https');

    https.get('https://es.wikiquote.org/w/api.php?action=parse&text={{Plantilla:Portada/temporal/Cita_del_día}}&format=json', (resp) => {
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
