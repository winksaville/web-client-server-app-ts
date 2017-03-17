/**
 * Module with routines shared by spec.ts files
 */
import * as debugModule from "debug";
const debug = debugModule("spec.lib");
import * as http from "http";

export function httpGet(httpHost: string,
                        httpPort: number,
                        httpPath: string): Promise<number> {
  debug(`httpGet:+ httpPath='${httpPath}'`);
  let promise = new Promise<number>((resolve, reject) => {
    debug("httpGet.promise:+");
    try {
      let options = {
        host: httpHost,
        path: httpPath,
        port: httpPort,
      };

      http.request(options, (response) => {
        debug("httpGet.response:+");
        let str = "";

        // Handle incoming data
        response.on("data", (chunk) => {
          debug(`httpGet.response: chunk=${chunk}`);
          str += chunk;
        });

        // Handle end of data
        response.on("end", () => {
          debug(`httpGet.response: end ${response.statusCode}`);
          resolve((response.statusCode) ? response.statusCode : 500);
        });
        debug("httpGet.response:-");
      }).end();
    } catch (err) {
      reject(`err=${err}`);
    }
    debug("httpGet.promise:-");
  });
  debug("httpGet:-");
  return promise;
}
