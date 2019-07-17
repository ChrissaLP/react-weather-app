import React from 'react';

export default class HandleWeatherData extends React.Component {
    constructor(props) {
        super(props);
        
    }
    parseData() {
        let weather = {};
            let data = this.props.weatherData["data"]; 
            //let dayInfo = data['0'];
        //console.log(data);
        
    }
    
        
    
    render() {
        let data = this.props.weatherData;
        let dataDetails = data;
        console.log(dataDetails);
        return(
            <div>
            Yes, I'm working.
            <p>{dataDetails}</p>
            
            </div>
        );
        
    }
} 