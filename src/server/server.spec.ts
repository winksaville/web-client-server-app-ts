import * as child from 'child_process';

import {
  Expect,
  TestCase,
  TestFixture,
  SetupFixture,
  TeardownFixture,
} from 'alsatian';

@TestFixture('Server tests')
export class ServerTests {
  private server: child.ChildProcess;

  @SetupFixture
  public setupFixture() {
    console.log('setupFixture:+');

    // Start the server
    this.server = child.exec('node build/server.js');

    console.log('setupFixture:+');
  }

  @TeardownFixture
  public teardownFixture() {
    console.log('teardownFixture:+');

    this.server.kill();

    console.log('teardownFixture:-');
  }

  @TestCase(0, 1)
  public testNothing(param1: number, param2: number) {
    console.log('testNothing:+');

    Expect(param1 <= param2).toBe(true);

    console.log('testNothing:-');
  }
}
