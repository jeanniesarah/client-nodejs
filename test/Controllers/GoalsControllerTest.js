/**
 * PipedriveAPIV1Lib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

'use strict';

const chai = require('chai');
const assert = chai.assert;
const TestHelper = require("../TestHelper");
const APIHelper = require("../../lib/APIHelper");
const testerlib = require("../../lib");
const testConfiguration = require("../TestBootstrap");

const controller = testerlib.GoalsController;
const TypeNameEnum = testerlib.TypeNameEnum;
const AssigneeTypeEnum = testerlib.AssigneeTypeEnum;
const ExpectedOutcomeTrackingMetricEnum = testerlib.ExpectedOutcomeTrackingMetricEnum;
const IntervalEnum = testerlib.IntervalEnum;

describe("GoalsController Tests", function tests() {
    this.timeout(testConfiguration.TEST_TIMEOUT);

    /**
     * Adds a new goal.
     */
    it("should testTestAddANewGoal response", function testTestAddANewGoalTest(done) {
        // parameters for the API call
        let input = [];
        input['contentType'] = null;
        input['body'] = null;

        controller.addANewGoal(input, function callback(error, response, context) {
            // test response code
            assert.equal(200, context.response.statusCode);
            done();
        }).catch(() => undefined);
    });

    /**
     * Returns data about goals based on criteria. For searching, append `{searchField}={searchValue}` to the URL, where `searchField` can be any one of the lowest-level fields in dot-notation (e.g. `type.params.pipeline_id`; `title`). `searchValue` should be the value you are looking for on that field. Additionally, `is_active=<true|false>` can be provided to search for only active/inactive goals. When providing `period.start`, `period.end` must also be provided and vice versa.
     */
    it("should testTestFindGoals response", function testTestFindGoalsTest(done) {
        // parameters for the API call
        let input = [];
        input['typeName'] = null;
        input['title'] = null;
        input['isActive'] = True;
        input['assigneeId'] = null;
        input['assigneeType'] = null;
        input['expectedOutcomeTarget'] = null;
        input['expectedOutcomeTrackingMetric'] = null;
        input['expectedOutcomeCurrencyId'] = null;
        input['typeParamsPipelineId'] = null;
        input['typeParamsStageId'] = null;
        input['typeParamsActivityTypeId'] = null;
        input['periodStart'] = null;
        input['periodEnd'] = null;

        controller.findGoals(input, function callback(error, response, context) {
            // test response code
            assert.equal(200, context.response.statusCode);
            done();
        }).catch(() => undefined);
    });

});
