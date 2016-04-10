# Dear Lucy Coding Assignment

## Overview
This repository contains a simple nodejs project for completing a short coding assignment. Read the detailed instructions below,
 implement the required functionality in [lib/employees.js](lib/employees.js) and run the tests in [test/employees.js](test/employees.js).
 Create a pull request with your solution when you are satisfied with your work.

## Assignment
We would like to know how the number of employees of a company has changed over the past two years. As input, we have the
 [test/employees.json](test/employees.json) JSON file with some basic employee information, including when they started working,
 potentially stopped working, date of birth and gender. Convert this information into an array of objects, one object for each month
 of the past two years. Each object has a ```date``` in YYYY-MM format containing the month it represents and a ```count``` containing
 the number of employees at the end of that month. See below for an example.
  ```javascript
  [
    { date: '2015-04', count: 22 },
    { date: '2015-05', count: 25 },
    { date: '2015-06', count: 26 },
    { date: '2015-07', count: 23 }
  ]
  ```
### Coding
The starting poing of your solutions should be [lib/employees.js](lib/employees.js), but feel free to organize your code as you see fit.
 Focus on writing maintainable and easy to understand code over performance optimization. Lodash and Moment.js are already part of the project,
 but you can add more dependencies if needed.

### Testing
There are some basic tests in [test/employees.js](test/employees.js). Improve on these and add some more tests that demonstrate the correctness
 of your solution.

### Extra Credit
What other information, in addition to number of employees, can be gathered from the source JSON? Add more information to the output array and
 adjust the tests accordingly.

## External Documentation
* http://momentjs.com/
* http://lodash.com/api
* http://mochajs.org/
* http://chaijs.com/api/bdd/
