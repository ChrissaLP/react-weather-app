import React from 'react';
import Card from './Card';
import FetchWeather from './FetchWeather';
import HandleWeatherData from './HandleWeatherData';

export default class WeatherApp extends React.Component {
    state = {
            days: ['a'],
            weatherData: []
    };
    randomNum = () => {
        let num = Math.floor((Math.random() * 3));
        return num;
    }
    
    fetchWeather = (zip, apiKey) => {
        // can see if need this checking later
        if (zip) {
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?postal_code=' + zip + '&key=' + apiKey).then(
                (response) => {
                    return response.json();

                }).then((result) => {
                    // so I remember - stringify turns result into string
                    // parse turns it into object!
                    const weatherData = JSON.parse(JSON.stringify(result));
                    console.log(typeof(weatherData));
                    try {
                        this.setState({ weatherData: this.parseWeather(weatherData) });
                    }
                    catch(e) {
                        console.log(e);
                    }
                    // setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });

                    //console.log(that.state.posts);
                });
        }
        //console.log('https://api.openweathermap.org/data/2.5/forecast?postal_code=' + zip + '&key=' + apiKey);
    };
    componentDidMount() {
        this.fetchWeather('19355', '767d944c186f4165b5d8dde168ee3323');
    }   
    parseWeather = (data) => {
        let weatherData = data.data;
        console.log(weatherData);
        if (!data || !data.data) {
            return [];
        }

        let parsedData = [];
        // starting with 5 days of data
        for (let i = 0; i < 5; i++ ) {
            let datapoint = weatherData[i];
            parsedData.push({
                datetime: datapoint.datetime,
                temp: datapoint.temp,
                min_temp: Math.round(datapoint.min_temp * (9/5) + 32),
                max_temp: Math.round(datapoint.max_temp * (9/5) + 32),
                description: datapoint.weather.description,
                iconCode: datapoint.weather.code
            });
        }
        console.log(parsedData);
        return parsedData;
    };

    render() {

        let today = new Date();
        //console.log(today);
        let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let startDay = today.getDay();
        let newDays = [];
        //console.log(startDay);
        //makes sense to do this with state???
        newDays.push('Today');
        
        for (let i = startDay + 1; i !== startDay; i = (i + 1) % daysOfWeek.length) {
            newDays.push(daysOfWeek[i]);
        }
        //console.log(newDays);

        return (
            <div>
            {
                this.state.weatherData.map((weather, index) => (
                <Card 
                    date = {weather.datetime}
                    key = {index} 
                    count = {index+1}
                    iconCode = {weather.iconCode}
                    num = {this.randomNum()}
                    description = {weather.description}
                    min_temp = {weather.min_temp}
                    max_temp = {weather.max_temp}
                />
                ))
                    
            }
                <div className="container">
                {/* <FetchWeather /> */} 
               
                
                <p className="text__credit">Thanks to <a href="https://icons8.com/">icons8</a> for the icons.</p>
                   
                    {/*  <HandleWeatherData weatherData={this.state.weatherData} /> */}
                </div>
            </div>
        );
    }
}

