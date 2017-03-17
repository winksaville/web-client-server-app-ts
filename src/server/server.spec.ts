import * as child from "child_process";
import { httpGet } from "../common/spec.lib";

import {
  AsyncSetupFixture,
  AsyncTeardownFixture,
  AsyncTest,
  Expect,
  TestFixture,
} from "alsatian";

import * as debugModule from "debug";
const debug = debugModule("server.spec");

const PORT = 3000;

@TestFixture("Server tests")
export class ServerTests {
  public server: child.ChildProcess;

  public async waitTillStarted(port: number, timeoutMs: number) {
    return new Promise<void>((resolve, reject) => {
      // Listen for the running message
      const listener = (data: Buffer) => {
        const expected = `running PORT=${port}`;
        debug(`waitTillStarted: data='${data}'`);
        if (data.toString() === expected) {
          clearTimeout(timeoutId);
          this.server.stdout.removeListener("data", listener);
          debug(`waiTillStarted: found 'running PORT=${port}'`);
          resolve();
        }
      };
      this.server.stdout.on("data", listener);

      // But only wait for timeoutMs
      const timeoutId = setTimeout(() => {
        this.server.stdout.removeListener("data", listener);
        this.server.kill();
        reject();
      }, timeoutMs);
    });
  }

  @AsyncSetupFixture
  public async setupFixture() {

    debug("setupFixture:+");

    // Start the server
    this.server = await child.spawn("node", [ "./dist/server/server.js" ]);

    // Wait till server starts
    await this.waitTillStarted(PORT, 5000)
        .then(() => {
          debug("setupFixture: server started");
        })
        .catch(() => {
          throw new Error(`setupFixture: server NOT started ${PORT}`);
        });

    this.server.stdout.on("data", (data) => {
                 debug(`server.stdout: ${data}`);
    });
    this.server.stderr.on("data", (data) => {
                 debug(`server.stderr: ${data}`);
    });
    this.server.on("close", (code) => {
                 debug(`server: exited with ${code}`);
    });
    this.server.on("error", (err) => {
                 debug(`server: error ${err}`);
    });

    // Get the root page
    debug("setupFixture: call httpGet '/'");
    await httpGet("localhost", PORT, "/")
                .then((statusCode) => debug(`httpGet: '/' statusCode=${statusCode}`))
                .catch((err) => debug(`httpGet: '/' ERR=${err}`));

    debug("setupFixture:-");
  }

  @AsyncTeardownFixture
  public async teardownFixture() {
    debug("teardownFixture:+");

    await this.server.kill();

    debug("teardownFixture:-");
  }

  @AsyncTest()
  public async testNop() {
    debug("testNop:+");

    let retValue = await httpGet("localhost", PORT, "/nop")
      .then((statusCode) => {
        debug(`httpGet: '/nop' ${statusCode}`);
        return statusCode;
      })
      .catch((err) => {
        debug(`httpGet: '/nop' ERR=${err}`);
        return -1;
      });
    Expect((retValue >= 200) && (retValue <= 299)).toBeTruthy();

    debug("testNop:-");
  }
}
