'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
// jest.mock()

const mockRequest = supertester(server);
// this is actually server.js > server
// (akin to server.start, we're doing server.server)

describe('web server', () => {
  it('should respond properly on request to /people', () => {
    mockRequest
      .get('/people')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(4);
      })
      .catch(console.error);
  });

  test('async/await: should respond properly on request to /people', async () => {
    try {
      let res = await mockRequest.get('/people');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(4);
    } catch (e) {
      console.error(e);
    }
  });

  it('should respond properly on post to /people', () => {
    mockRequest
      .post('/people')
      .send({ firstName: 'Test', lastName: 'Person' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.firstName).toBe('Test');
      })
      .catch(console.error);
  });
});
