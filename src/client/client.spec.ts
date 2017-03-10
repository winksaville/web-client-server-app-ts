import * as child from 'child_process';

import {
  //Expect,
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

@TestFixture('Client tests')
export class ClientTests {
  private driver: WebDriver;
  private browserName = 'chrome';
  private server: child.ChildProcess;

  @AsyncSetupFixture
  public async setupFixture() {
    console.log('setupFixture:+');
    // Start the browser we're going to control
    this.driver = new Builder()
        .forBrowser(this.browserName)
        .build();

    console.log('setupFixture: 1');

    // Start the server
    this.server = await child.spawn('node', ['dist/server/server.js']);
    this.server.stdout.on('data', (data) => {
                 console.log(`server.stdout: ${data}`);
    });
    this.server.stderr.on('data', (data) => {
                 console.log(`server.stdout: ${data}`);
    });
    this.server.on('close', (code) => {
                 console.log(`server: exited with ${code}`);
    });

    console.log('setupFixture: 2');

    // Get the home page
    await this.driver.get('http:localhost:3000/');
    console.log('setupFixture:-');
  }

  @AsyncTeardownFixture
  public async teardownFixture() {
    console.log('teardownFixture:+');
    await this.driver.quit();
    console.log('teardownFixture: 1');
    await this.server.kill();
    console.log('teardownFixture:-');
  }

  @AsyncTest('wd: nop which is defined in a TS file')
  public async testWdNop() {
    console.log('testWdNop:+');
    let button = await this.driver.findElement(By.id('invokeNop'));
    console.log('testWdNop: 1');
    button.click();
    console.log('testWdNop:-');
  }
}
