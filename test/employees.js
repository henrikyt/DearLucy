'use strict';

const expect = require('chai').expect,
  employees = require('../lib/employees'),
  moment = require('moment'),
  _ = require('lodash');

describe('List of employees', function() {
  const employeeList = employees(require('./employees.json'));
  const dateFormat = 'YYYY-MM';

  it('should contain entries for each month for the past two years', function() {
    expect(_.head(employeeList).date).to.equal(moment().subtract(2, 'years').format(dateFormat));
    expect(_.last(employeeList).date).to.equal(moment().format(dateFormat));
    expect(employeeList).to.have.lengthOf(25);
  });

  it('should have date and count for all months', function() {
    expect(employeeList).to.not.be.empty;
    _.each(employeeList, (employee) => {
      expect(employee).to.have.all.keys(['date', 'count']);
    });
  });
});