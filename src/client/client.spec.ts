import * as child from "child_process";
import { startServer } from "../common/spec.lib";

import {
  AsyncSetupFixture,
  AsyncTeardownFixture,
  AsyncTest,
  Expect,
  TestFixture,
} from "alsatian";

import {
  Builder,
  By,
  WebDriver,
} from "selenium-webdriver";

import * as chrome from "selenium-webdriver/chrome";

import * as debugModule from "debug";

const debug = debugModule("client.spec");

const PORT = 3000;

const verboseLogging = true;

@TestFixture("Client tests")
export class ClientTests {
  private driver: WebDriver;
  private browserName = "chrome";
  private server: child.ChildProcess;

  @AsyncSetupFixture
  public async setupFixture() {
    debug("setupFixture:+");

    // Start server
    debug("setupFixture: startServer");
    this.server = await startServer(PORT, 5000, "./dist/server/server.js");

    let options = new chrome.Options();
    //options.addArguments("disable-background-timer-throttling");

    if (verboseLogging) {
      debug("setupFixture: create server and driver with verbose logging");
      let service = new chrome.ServiceBuilder()
          .loggingTo("./build/client.spec.chrome.Driver.log")
          .enableVerboseLogging()
          .build();

      this.driver = chrome.Driver.createSession(options, service);
    } else {
      // Start the browser we"re going to control
      debug("setupFixture: create Builder for chrome");
      this.driver = new Builder()
          .forBrowser(this.browserName)
          .setChromeOptions(options)
          .build();
    }

    // Get the home page
    debug("setupFixture: get home page");
    await this.driver.get(`http://localhost:${PORT}/`);

    debug("setupFixture:-");
  }

  @AsyncTeardownFixture
  public async teardownFixture() {
    debug("teardownFixture:+");

    await this.driver.quit();
    await this.server.kill();

    debug("teardownFixture:-");
  }

  @AsyncTest("wd: nop which is defined in a TS file")
  public async testWdNop() {
    debug("testWdNop:+");

    try {
      let button = await this.driver.findElement(By.id("invokeNop"));
      button.click();
    } catch (e) {
      debug(`testWdNop caught e=${e}`);
      Expect(false).toBe(true); // Always fail.
    }
    // Expect(false).toBe(true); // Always fail.

    debug("testWdNop:-");
  }
}
