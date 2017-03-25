import {
  AsyncSetupFixture,
  AsyncTeardownFixture,
  AsyncTest,
  TestFixture,
} from "alsatian";

import {
  Builder,
  WebDriver,
} from "selenium-webdriver";

import * as chrome from "selenium-webdriver/chrome";

import * as debugModule from "debug";
const debug = debugModule("chromedriver.spec");

const verboseLogging = true;

@TestFixture("Chromedriver tests")
export class ClientTests {
  private driver: WebDriver;
  private browserName = "chrome";

  @AsyncSetupFixture
  public async setupFixture() {
    debug("setupFixture:+");

    let options = new chrome.Options();
    // options.addArguments("disable-background-timer-throttling");

    if (verboseLogging) {
      debug("setupFixture: create server and driver with verbose logging");
      let service = new chrome.ServiceBuilder()
          .loggingTo("./build/chromedriver.spec.log")
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


    debug("setupFixture:-");
  }

  @AsyncTeardownFixture
  public async teardownFixture() {
    debug("teardownFixture:+");

    await this.driver.quit();

    debug("teardownFixture:-");
  }

  @AsyncTest("Do nothing test")
  public async testDoNothing() {
    debug("testDoNothing:#");
  }
}
