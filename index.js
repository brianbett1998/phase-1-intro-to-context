// Your code here
//The payroll system
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ")
  const timeInEvent = {
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  }
  employeeRecord.timeInEvents.push(timeInEvent)
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ")
  const timeOutEvent = {
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  }
  employeeRecord.timeOutEvents.push(timeOutEvent)
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour
  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
  return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date)
  const wages = datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0)
  return wages
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0)
}
