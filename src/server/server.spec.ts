import * as child from 'child_process';

import {
  Expect,
  TestCase,
  TestFixture,
  SetupFixture,
  TeardownFixture,
} from 'alsatian';

const debug = require('debug')('server.spec');

@TestFixture('Server tests')
export class ServerTests {
  private server: child.ChildProcess;

  @SetupFixture
  public setupFixture() {
    debug('setupFixture:+');

    // Start the server
    this.server = child.spawn('node', [ 'dist/server/server.js' ], {
      env: {
        DEBUG: 'server'
      }
    });

    debug('setupFixture:-');
  }

  @TeardownFixture
  public teardownFixture() {
    debug('teardownFixture:+');

    this.server.kill();

    debug('teardownFixture:-');
  }

  @TestCase(0, 1)
  public testNothing(param1: number, param2: number) {
    debug('testNothing:+');

    Expect(param1 <= param2).toBe(true);

    debug('testNothing:-');
  }
}
