import * as child from 'child_process';

import {
  Expect,
  TestFixture,
  AsyncSetupFixture,
  AsyncTeardownFixture,
  AsyncTest
} from 'alsatian';

import {
  WebDriver,
  By,
  Builder
} from 'selenium-webdriver';

const debug = require('debug')('client.spec');

@TestFixture('Client tests')
export class ClientTests {
  private driver: WebDriver;
  private browserName = 'chrome';
  private server: child.ChildProcess;

  @AsyncSetupFixture
  public async setupFixture() {
    debug('setupFixture:+');

    // Start the browser we're going to control
    this.driver = new Builder()
        .forBrowser(this.browserName)
        .build();

    // Start the server
    this.server = await child.spawn('node', [ './dist/server/server.js' ]);
    //this.server = await child.spawn('node', [ './dist/server/server.js' ], {
    //  env: {
    //    DEBUG: 'server'
    //  },
    //  shell: true
    //});
    this.server.stdout.on('data', (data) => {
                 debug(`server.stdout: ${data}`);
    });
    this.server.stderr.on('data', (data) => {
                 debug(`server.stdout: ${data}`);
    });
    this.server.on('close', (code) => {
                 debug(`server: exited with ${code}`);
    });

    // Get the home page
    await this.driver.get('http:localhost:3000/');

    debug('setupFixture:-');
  }

  @AsyncTeardownFixture
  public async teardownFixture() {
    debug('teardownFixture:+');

    await this.driver.quit();
    await this.server.kill();

    debug('teardownFixture:-');
  }

  @AsyncTest('wd: nop which is defined in a TS file')
  public async testWdNop() {
    debug('testWdNop:+');

    try {
      let button = await this.driver.findElement(By.id('invokeNop'));
      button.click();
    } catch (e) {
      console.log(`testWdNop caught e=${e}`);
      Expect(false).toBe(true); // Always fail.
    }

    debug('testWdNop:-');
  }
}
