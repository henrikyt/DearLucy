# Dear Lucy Coding Assignment

## Overview
This repository contains a simple nodejs project for completing a short coding assignment. Read the detailed instructions below, implement the required functionality in [lib/employees.js](lib/employees.js) and run the tests in [test/employees.js](test/employees.js). Create a pull request with your solution when you are satisfied with your work.

## Assignment
We would like to know how the number of employees of a company has changed over the past two years. As input we have the [test/employees.json](test/employees.json) JSON file. The file contains basic employee information, including when an employee started working, potentially stopped working, date of birth and gender of the employee. Convert this information into an array of objects, one object for each month of the past two years. Each object in the array should have a ```date``` property and a ```count``` property. The value of the ```date``` property should be a month in YYYY-MM format and the value of the ```count``` property should be the number of employees at the end of that month. See below for an example result array.
  ```javascript
  [{ date: '2015-04', count: 22 }, { date: '2015-05', count: 25 },
   { date: '2015-06', count: 26 }, { date: '2015-07', count: 23 }]
  ```
### Coding
The starting poing of your solutions should be [lib/employees.js](lib/employees.js), but feel free to organize your code as you see fit. Focus on writing maintainable and easy to understand code over performance optimization. Lodash and Moment.js are already part of the project, but you can add more dependencies if needed.

### Testing
There are some basic tests in [test/employees.js](test/employees.js). Improve on these and add some more tests that demonstrate the correctness of your solution. The tests can be run with the command ```npm test```.

### Extra Credit
What other information, in addition to number of employees, can be gathered from the source JSON? Add more information to the output array and adjust the tests accordingly.

## External Documentation
* http://momentjs.com/
* http://lodash.com/docs
* http://mochajs.org/
* http://chaijs.com/api/bdd/
