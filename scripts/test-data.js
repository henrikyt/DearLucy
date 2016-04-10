const jsonfile = require('jsonfile'),
  moment = require('moment'),
  _ = require('lodash');

function randomDate(max, min) {
  const difference = min.diff(max, 'days');
  return moment(max).add(Math.random() * difference, 'days');
}

function randomEmployee(id) {
  const dateFormat = 'YYYY-MM-DD';
  const startDate = randomDate(moment().subtract(5, 'years'), moment());
  const endDate = randomDate(moment().subtract(5, 'years'), moment());
  return {
    id: id,
    dateOfEmployment: startDate.format(dateFormat),
    dateOfTermination: endDate.isAfter(startDate) ? endDate.format(dateFormat) : null,
    dateOfBirth: randomDate(moment().subtract(60, 'years'), moment().subtract(25, 'years')).format(dateFormat),
    gender: Math.random() > 0.5 ? 'Male' : 'Female'
  }
}

jsonfile.writeFileSync('./test/employees.json', _.range(100).map(randomEmployee));
