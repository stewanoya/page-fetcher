const request = require("request");
const fs = require("fs");

const args = process.argv.slice(2);

const fetcher = (url, localfile) => {
  request(url, (error, response, body) => {
    if (error) {
      console.log(
        `There was an error with the URL! Here is what happened: ${error}`
      );
      return;
    }
    fs.writeFile(
      localfile,
      body,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      },
      () => {
        fs.stat(localfile, (err, stats) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(
            `Downloaded and saved ${stats.size} bytes to ${localfile}.`
          );
        });
      }
    );
  });
};

fetcher(args[0], args[1]);
