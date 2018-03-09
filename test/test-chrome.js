import assert from 'assert';

// We're using the compiled code, so must register the source maps.
import 'source-map-support/register'
import Browser from '../dist';


describe('Chrome Browser', function() {
  this.timeout(5000);
  let browser;
  before(async () => {
    browser = new Browser();
    await browser.launch();
  });
  after(async () => await browser.quit());

  it('should receive a ping/pong response', async () => {
    const response = await browser.client.ping();
    assert.equal(response, 'pong');
  });

  it('should execute JavaScript in the background', async () => {
    const userAgent = await browser.evaluateInBackground(async () => window.navigator.userAgent);
    assert(typeof userAgent === 'string');
    assert(userAgent.includes('Chrome') || userAgent.includes('Chromium'));
  });
});
