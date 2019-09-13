import React from 'react';

// TO DO eliminate this class or make use of it

class Date extends React.Component {
    
    determineDate() {
        let today = new Date();
        console.log(today);
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
        let startDay = today.getDay();
        let newDays = [];
        console.log(startDay);
        newDays.push(daysOfWeek[startDay]);
        for (let i = startDay + 1; i !== startDay; i = (i+1) % daysOfWeek.length) {
            newDays.push(daysOfWeek[i]);
        }
        console.log(newDays);
    }
    render() {
        return (
            <p>Test date information here.</p>
        );
    }
}
