'use strict';
const _ = require('lodash'),
    moment = require('moment'),
    settings = require('./settings.json');

/**
 * Creates a new employee instance. Employee id is mandatory.
 * @class Employee
 * @param {?number} oParameters.id
 * @param {string} [oParameters.dateOfEmployment]
 * @param {string} [oParameters.dateOfTermination]
 * @param {string} [oParameters.dateOfBirth]
 * @param {string} [oParameters.gender]
 * @constructor
 */
var Employee = function (oParameters) {
    settings.trace && console.log("Employee::constructor::" + JSON.stringify(oParameters));
    if (oParameters === undefined || oParameters.id === null || typeof oParameters.id !== "number") {
        // Employee id is required
        throw new TypeError("Employee::constructor::No id for employee::" + JSON.stringify(oParameters), "employee.js");
    }
    _.mergeWith(this, oParameters);
};

Employee.prototype = {
    id: null,
    dateOfEmployment: null,
    dateOfTermination: null,
    dateOfBirth: null,
    gender: null
};

/**
 * Getter for Id
 * @name Employee.getId
 * @returns {?number}
 * @function
 */
Employee.prototype.getId = function () {
    return this.id;
};
/**
 * Getter for DateOfEmployment
 * @name Employee.getDateOfEmployment
 * @returns {Object}
 * @function
 */
Employee.prototype.getDateOfEmployment = function () {
    return moment(this.dateOfEmployment);
};
/**
 * Getter for getDateOfTermination
 * @name Employee.getDateOfTermination
 * @returns {Object}
 * @function
 */
Employee.prototype.getDateOfTermination = function () {
    return moment(this.dateOfTermination);
};
/**
 * Getter for getDateOfBirth
 * @name Employee.getDateOfBirth
 * @returns {Object}
 * @function
 */
Employee.prototype.getDateOfBirth = function () {
    return moment(this.dateOfBirth);
};

/**
 * Getter for Gender
 * @name Employee.getGender
 * @returns {Object}
 * @function
 */
Employee.prototype.getGender = function () {
    return this.gender;
};

/**
 * Find whether the employee is employed a this time
 * @param oDate
 * @name Employee#getEmployment
 * @return {boolean}
 */
Employee.prototype.getEmployment = function (oDate) {
    var oCompareDate = this.getDateOfEmployment();
    if (oCompareDate.isValid() && oCompareDate.isBefore(oDate)) {
        oCompareDate = this.getDateOfTermination();
        if (!oCompareDate.isValid() || oCompareDate.isAfter(oDate)) {
            return true;
        }
    }
    return false;
};

// Export class to node
module.exports = Employee;