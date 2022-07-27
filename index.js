function createEmployeeRecord(employeeInfoArray) {
    return {
        firstName: employeeInfoArray[0],
        familyName: employeeInfoArray[1],
        title: employeeInfoArray[2],
        payPerHour: employeeInfoArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfEmployeeInfoArrays) {
    return arrayOfEmployeeInfoArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let hourDate = dateStamp.split(" ");
    employeeRecord['timeInEvents'].push({
        type: "TimeIn",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    })

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let hourDate = dateStamp.split(" ");
    employeeRecord['timeOutEvents'].push({
        type: "TimeOut",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    })

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateWorked) {
    let employeeOut = employeeRecord.timeOutEvents.find(dateElement => dateElement.date === dateWorked);
    let employeeIn = employeeRecord.timeInEvents.find(dateElement => dateElement.date === dateWorked);
    return (employeeOut.hour - employeeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateWorked) {
    return hoursWorkedOnDate(employeeRecord, dateWorked) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord){
    let wageArray =  employeeRecord.timeInEvents.map(timeInEvent => wagesEarnedOnDate(employeeRecord, timeInEvent.date));
    const initialValue = 0;
    return wageArray.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
}

function calculatePayroll(employeeRecords) {
    let totalWageArray = employeeRecords.map(allWagesFor);
    const initialValue = 0;
    return totalWageArray.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
}