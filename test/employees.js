'use strict';

const expect = require('chai').expect,
    Employees = require('../lib/employees'),
    moment = require('moment'),
    _ = require('lodash');

describe('List of employees', function () {
    const dateFormat = 'YYYY-MM';
    var employees = new Employees({columns:['date','count']});
    var employeeList = employees.parse(require('./employees.json'));

    it('should contain entries for each month for the past two years', function () {
        expect(_.head(employeeList).date).to.equal(moment().subtract(2, 'years').format(dateFormat));
        expect(_.last(employeeList).date).to.equal(moment().format(dateFormat));
        expect(employeeList).to.have.lengthOf(25);
    });

    it('should have date and count for all months', function () {
        expect(employeeList).to.not.be.empty;
        _.each(employeeList, (employee) => {
            expect(employee).to.have.all.keys(['date', 'count']);
        });
    });
});

describe('List of employees with gender and age groups, daily from past two months', function () {
    const dateFormat = 'YYYY-MM-DD';
    var employees = new Employees({dateFormat:'YYYY-MM-DD',interval:[1,'days'],startFrom:[2,'months']});
    var employeeList = employees.parse(require('./employees.json'));

    it('should contain entries for each day for the past two months', function () {
        expect(_.head(employeeList).date).to.equal(moment().subtract(2, 'months').format(dateFormat));
        expect(_.last(employeeList).date).to.equal(moment().format(dateFormat));
        expect(employeeList).to.have.lengthOf(62);
    });

    it('should have date, count, age_groups and genders for all days', function () {
        expect(employeeList).to.not.be.empty;
        _.each(employeeList, (employee) => {
            expect(employee).to.have.all.keys(['date', 'count', 'age_groups', 'genders']);
        });
    });
});

describe('List of employees with custom formatter collecting user ids', function () {
    const dateFormat = 'YYYY-MM';
    var employees = new Employees({columns:['date','ids'],columnFormatters:{'ids':
        function(parser,date){
            var aIds=[]
            _.each(parser.employees, (oEmployee) => {
                if(oEmployee.getEmployment(date)){
                    aIds.push(oEmployee.getId());
                }
            })
            return aIds;
        }
    }});
    var employeeList = employees.parse(require('./employees.json'));
    it('should contain entries for each month for the past two years', function () {
        expect(_.head(employeeList).date).to.equal(moment().subtract(2, 'years').format(dateFormat));
        expect(_.last(employeeList).date).to.equal(moment().format(dateFormat));
        expect(employeeList).to.have.lengthOf(25);
    });

    it('should have date and ids for all months', function () {
        expect(employeeList).to.not.be.empty;
        _.each(employeeList, (employee) => {
            expect(employee).to.have.all.keys(['date', 'ids']);
        });
    });
});