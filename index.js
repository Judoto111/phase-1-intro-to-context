// Your code here


// Helper function to create an employee record from an array
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Helper function to convert a list of arrays into employee records
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Helper function to add a time in event to an employee's record
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Helper function to add a time out event to an employee's record
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Helper function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Helper function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Helper function to calculate total wages earned by an employee
function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    let totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Example usage:
let employeesData = [
    ["Gray", "Worm", "Security", 1],
    ["Sansa", "Stark", "Housekeeper", 2]
];

let employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2024-07-14 0800");
createTimeOutEvent(employees[0], "2024-07-14 1600");

createTimeInEvent(employees[1], "2024-07-14 0900");
createTimeOutEvent(employees[1], "2024-07-14 1700");

console.log(hoursWorkedOnDate(employees[0], "2024-07-14")); // Output should be 8
console.log(hoursWorkedOnDate(employees[1], "2024-07-14")); // Output should be 8

console.log(wagesEarnedOnDate(employees[0], "2024-07-14")); // Output should be 8 (since payPerHour is 1)
console.log(wagesEarnedOnDate(employees[1], "2024-07-14")); // Output should be 16 (since payPerHour is 2)

console.log(allWagesFor(employees[0])); // Output should be 8
console.log(allWagesFor(employees[1])); // Output should be 16

console.log(calculatePayroll(employees)); // Output should be 24
