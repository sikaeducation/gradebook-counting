const assert = require('chai').assert;
const counters = require('../counters');

describe('Counters', () => {
  describe("#countPassedSubmissions()", () => {
    it("returns the number of passed submissions based on the standard", () => {
      const submissions = [{
        didPass: true
      }, {
        didPass: true
      }, {
        didPass: false
      }];
      assert.equal(counters.countPassedSubmissions(submissions), 2);
    });
  });
  describe("#didMasterStandard()", () => {
    it("returns true when enough assessments have passed", () => {
      const submissions = [{
        standardId: "1",
        didPass: true
      }];
      const standard = {
        assessmentsToPass: 2,
        standardId: "1"
      };
      assert.ok(!counters.didMasterStandard(submissions, standard));
      submissions.push({
        standardId: "1",
        didPass: true
      });
      assert.ok(counters.didMasterStandard(submissions, standard));
      submissions.push({
        standardId: "1",
        didPass: true
      });
      assert.ok(counters.didMasterStandard(submissions, standard));
    });
  });
  describe("#remainingAssessments()", () => {
    it("returns a list of remaining assessments for a standard", () => {
      const assessments = [{
        standardId: "a",
      }, {
        standardId: "b",
      }, {
        standardId: "c",
      }];
      const submissions = [{
        standardId: "a",
        didPass: true
      }, {
        standardId: "b",
        didPass: true
      }, {
        standardId: "c",
        didPass: false
      }];
      assert.deepEqual(counters.remainingAssessments(submissions, assessments), [{
        standardId: "c"
      }]);
    });
  });
});
