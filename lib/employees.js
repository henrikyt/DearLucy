'use strict';
const _ = require('lodash'),
    moment = require('moment'),
    Employee = require('./employee.js'),
    settings = require('./settings.json');

/**
 * Creates new Employees instance. Used to parse and print employee data from inputs. Formatting settings can be modified at runtime.
 * @class Employees
 * @param {Object} [oParameters]
 * @param {string} [oParameters.dateFormat]
 * @param {Array} [oParameters.startFrom]
 * @param {Array} [oParameters.interval]
 * @param {Array} [oParameters.columns]
 * @param {Object} [oParameters.columnFormatters]
 * @constructor
 */
var Employees = function (oParameters) {
    settings.trace && console.log("Employees::constructor::" + JSON.stringify(oParameters));
    if (oParameters && oParameters.columnFormatters) {
        _.mergeWith(oParameters.columnFormatters,this.columnFormatters);
    }
    _.assign(this, oParameters);
};

Employees.prototype = {
    dateFormat: "YYYY-MM",
    startFrom: [2, "years"],
    interval: [1, "months"],
    columns: ["date", "count", "genders", "age_groups"],
    columnFormatters: {
        "date": function (parser, date) {
            return parser.getDate(date)
        },
        "count": function (parser, date) {
            return parser.getCount(date)
        },
        "genders": function (parser, date) {
            return parser.getGenders(date)
        },
        "age_groups": function (parser, date) {
            return parser.getAges(date)
        }
    },
    employees: []
};

/**
 * Parse input data and return parsed output according to parser settings
 * @param {Object[]} employeeData
 * @name Employees#parse
 * @return {Object[]}
 */
Employees.prototype.parse = function (employeeData) {
    this.parseData(employeeData);
    return this.printData();
};

/**
 * Parse input data
 * @name Employees#parseData
 * @param {Object[]} employeeData
 */
Employees.prototype.parseData = function (employeeData) {
    this.employees=[];
    settings.trace && console.log("Employees::parseData::" + JSON.stringify(employeeData));
    _.forEach(employeeData, (oData) => {
        try {
            var oEmployee = new Employee(oData)
            this.employees.push(oEmployee);
        } catch (e) {
            // Just log and continue if employee can't be generated
            console.error(e);
        }
    })
};

/**
 * Print data from internal storage according to the parser settings
 * @name Employees#printData
 * @return {Object[]}
 */
Employees.prototype.printData = function () {
    settings.trace && console.log("Employees::printData::" + JSON.stringify(this.employees));
    var aReturn = [];
    // Starting point from parser settings
    var oMoment = moment().subtract(this.startFrom[0], this.startFrom[1]);
    while (oMoment.diff(moment()) < 0) {
        var oRow = {};
        _.forEach(this.columns, (sLabel) => {
            if(sLabel in this.columnFormatters){
                oRow[sLabel] = this.columnFormatters[sLabel](this, oMoment);
            }
        })
        aReturn.push(oRow);
        // Add interval to next loop
        oMoment.add(this.interval[0], this.interval[1]);
    }
    settings.trace && console.log("Employees::printData::" + JSON.stringify(aReturn));
    return aReturn;
};

/**
 * Formatter for count property
 * @name Employees#getCount
 * @param {Object} oDate
 * @return {number}
 */
Employees.prototype.getCount = function (oDate) {
    var iCount = 0;
    _.each(this.employees, (oEmployee) => {
        if(oEmployee.getEmployment(oDate)){
            iCount++;
            settings.trace && console.log("Employees::getCount::Added to count::" + JSON.stringify(oEmployee));
        }
    });
    return iCount;
};

/**
 * Formatter for date string
 * @name Employees#getDate
 * @param {Object} oDate
 * @return {string}
 */
Employees.prototype.getDate = function (oDate) {
    return oDate.format(this.dateFormat);
};

/**
 * Formatter for age_groups property
 * @name Employees#getAges
 * @param {Object} oDate
 * @return {Object}
 */
Employees.prototype.getAges = function (oDate) {
    var oCount = {20:0,30:0,40:0,50:0,60:0,70:0,80:0};
    _.each(this.employees, (oEmployee) => {
        var oAge = oEmployee.getDateOfBirth();
        if (oAge.isValid()) {
            oAge = moment().diff(oAge, "years");
            for (var i in oCount) {
                if (oAge < i) {
                    oCount[i-10]++
                    settings.trace && console.log("Employees::getAges::Added to count::" + JSON.stringify(oEmployee));
                    break;
                }
            }
        }
    });
    return oCount
};

/**
 * Formatter for gender property
 * @name Employees#getGenders
 * @param {Object} oDate
 * @return {Object}
 */
Employees.prototype.getGenders = function (oDate) {
    var oCount = {Male: 0, Female: 0};
    _.each(this.employees, (oEmployee) => {
        if(oEmployee.getEmployment(oDate)){
            var sGender = oEmployee.getGender();
            if (sGender && sGender in oCount) {
                oCount[sGender]++;
                settings.trace && console.log("Employees::getGenders::Added to count::" + JSON.stringify(oEmployee));
            }
        }
    })
    return oCount
};

// Export class definition to Node
module.exports = Employees;
// Export Employee class definition
module.exports.Employee = Employee;