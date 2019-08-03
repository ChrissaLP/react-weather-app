import React from 'react';
import Card from './Card';
import Header from './Header';
import FetchWeather from './FetchWeather';
import HandleWeatherData from './HandleWeatherData';

export default class WeatherApp extends React.Component {
    state = {
            location: {},
            weatherData: []
    };
    randomNum = () => {
        let num = Math.floor((Math.random() * 3));
        return num;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const zipcode = e.target.elements.zipcode.value;
        //console.log(e.target.elements.zipcode.value);

        this.fetchWeather(zipcode, '767d944c186f4165b5d8dde168ee3323');
    }
    handleSubmitCity = (e) => {
        e.preventDefault();
        // need to add error handling if no value submitted or if bad value submitted
        let location = e.target.elements.city.value;
        location = location.split(',');
        let city = location[0].replace(/\s+/g, '_');
        let state = '';
        if (location[1]) {
            state = location[1].replace(/\s+/g, '');
        }
        city = city + ',' + state;
        this.fetchWeatherByCity(city, '767d944c186f4165b5d8dde168ee3323');
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
                        this.setState({ 
                            weatherData: this.parseWeather(weatherData),
                            location: this.parseLocation(weatherData) });
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

    fetchWeatherByCity = (city, apiKey) => {
        // can see if need this checking later
        if (city) {
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?city=' + city + '&country=US&key=' + apiKey).then(
                (response) => {
                    return response.json();

                }).then((result) => {
                    // so I remember - stringify turns result into string
                    // parse turns it into object!
                    const weatherData = JSON.parse(JSON.stringify(result));
                    console.log(typeof (weatherData));
                    try {
                        this.setState({
                            weatherData: this.parseWeather(weatherData),
                            location: this.parseLocation(weatherData)
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                    // setState({ posts: result.data.children, lastPostName: result.data.children[result.data.children.length - 1].data.name });

                    //console.log(that.state.posts);
                });
        }
        //console.log('https://api.openweathermap.org/data/2.5/forecast?postal_code=' + zip + '&key=' + apiKey);
    };
    componentDidMount() {
        this.fetchWeather('19107', '767d944c186f4165b5d8dde168ee3323');
    }   
    parseLocation = (data) => {
        let city = data.city_name;
        let country = data.country_code;
        let state = data.state_code;
        let location = {
            city: '',
            country: '',
            state: ''
        };
        if (city) {
            location.city = city;
        }
        if (country) {
            location.country = country;
        }
        if (state) {
            location.state = state;
        }
        return location;
    }
    parseWeather = (data) => {
        console.log(data);
        
        
        if (!data || !data.data) {
            return [];
        }
        
        let weatherData = data.data;
        console.log(weatherData);

        let parsedData = [];
        // starting with 7 days of data
        for (let i = 0; i < 7; i++ ) {
            let datapoint = weatherData[i];
            parsedData.push({
                date: datapoint.valid_date,
                temp: datapoint.temp,
                min_temp: Math.round(datapoint.min_temp * (9/5) + 32),
                max_temp: Math.round(datapoint.max_temp * (9/5) + 32),
                description: datapoint.weather.description,
                iconCode: datapoint.weather.code, 
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
                <Header />
          
            <h2>Weather forecast for: </h2>
                <h3>{this.state.location.city}{this.state.location.state && <span>, {this.state.location.state}</span>}
                </h3>
                <h3>{!this.state.location.state && <span>{this.state.location.country}</span>}</h3>
            {
                
                this.state.weatherData.map((data, index) => (
                <Card 
                    date={data.date}
                    key = {index} 
                    count = {index+1}
                    iconCode={data.iconCode}
                    num = {this.randomNum()}
                    description={data.description}
                    min_temp={data.min_temp}
                    max_temp={data.max_temp}
                />
                ))
                    
            }
            <div className="form__container">
                
                <form className="form__zipcode" onSubmit={this.handleSubmit}>
                        <legend>Enter a zipcode:</legend>
                    <input className="add-zipcode__input" type="text" name="zipcode" />
                    <button className="button">Get Weather</button>
                </form>
                <form className="form__city" onSubmit={this.handleSubmitCity}>
                <legend>Or search by city, state:</legend>
                    <input className="add-city__input" type="text" name="city" />
                    <button className="button">Get Weather</button>
                </form>
                </div>
                <div className="creditContainer">
                {/* <FetchWeather /> */} 
               
                
                <p className="text__credit">Thanks to <a href="https://icons8.com/">icons8</a> for the icons.</p>
                   
                    {/*  <HandleWeatherData weatherData={this.state.weatherData} /> */}
                </div>
            </div>
        );
    }
}

