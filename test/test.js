const chai = require('chai');
const expect = chai.expect;
const Test = require('../models/test');
const User = require('../models/users');
const app = require('../app');
const request = require('supertest')(app);
describe('TestController', () => {
  describe('submitTest', () => {
    it('should store the user\'s responses and return the score', (done) => {
      // Create a new test document
      const test = new Test({
        testId: 'test1',
        questions: [
          {
            questionId: 'q1',
            correctAnswers: ['a1'],
          },
          {
            questionId: 'q2',
            correctAnswers: ['a2', 'a3'],
          },
          {
            questionId: 'q3',
            correctAnswers: ['a4'],
          },
        ],
      });

      // Save the test to the database
      test.save()
        .then(() => {
          // Make a request to the submit-test endpoint
          request.post('/submit-test')
            .send({
              userId: 'user1',
              testId: 'test1',
              questionId: ['q1', 'q2', 'q3'],
              answers: [['a1'], ['a2', 'a3'], ['a4']],
            })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              // Assert the response
              expect(res.body.success).to.equal(true);
              expect(res.body.userId).to.equal('user1');
              expect(res.body.testId).to.equal('test1');
              expect(res.body.score).to.equal(3);

              done();
            });
        })
        .catch((err) => done(err));
    });
  });
});
