'use strict';

const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');
// const people = require('../lib/routes/people-routes.js');
// const teams = require('../lib/routes/teams-routes.js');
//jest.mock()

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

  test('should respond properly on request to /teams', async () => {
    mockRequest
      .get('/teams')
      .then(results=> {
        expect(results.status).toBe(200);

      })
      .catch(console.error);

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

  it('should respond properly on post to /teams', () => {
    mockRequest
      .post('/teams')
      .send({ name: 'Test', color: 'Brown' })
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
      })
      .catch(console.error);
  });
  it('should respond with a 404 on unknown route', ()=>{
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.error);
  });



});















