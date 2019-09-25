import React from 'react';
import Card from './Card';
import Footer from './Footer';
import Header from './Header';

export default class WeatherApp extends React.Component {
    state = {
            location: {},
            weatherData: [], 
            error: ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const data = e.target.elements.data.value;
        e.target.elements.data.value = '';
        if (data.match(/^[\d]{5}$/)) {
            this.fetchWeatherByZip(data, process.env.API_KEY);
        }
        else if (data.match(/[A-Za-z]+/)) {
            let location = data;
            if (location.includes(',')) {
                location = location.split(',');
            }
            else {
                location = location.split(' ');
            }
            let city = location[0].replace(/\s+/g, '_');
            let state = '';
            if (location[1]) {
                state = location[1].replace(/\s+/g, '');
            }
            city = city + ',' + state;
            this.fetchWeatherByCity(city, process.env.API_KEY);
        }
        else {
            const error = "Incorrect format. Please enter either a 5 digit zip or city, state.";
            this.setState({ error });
        }
    }

    fetchWeatherByZip = (zip, apiKey) => {
        // can see if need the if clause, this checking later
        // need to handle error better
        if (zip) {
            this.setState({ error: '' });
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?units=I&postal_code=' + zip + '&key=' + apiKey)
            .then((response) => {
                    return response.json();
                }).then((result) => {
                    const weatherData = JSON.parse(JSON.stringify(result));
                    try {
                        this.setState({ 
                            weatherData: this.parseWeather(weatherData),
                            location: this.parseLocation(weatherData) });
                    }
                    catch(error) {
                        this.setState({
                            error
                        });
                    }
                   
                });
        }
       
    };

    fetchWeatherByCity = (city, apiKey) => {
        // again review if clause format
        if (city) {
            this.setState({ error: ''});
            fetch('https://api.weatherbit.io/v2.0/forecast/daily?units=I&city=' + city + '&country=US&key=' + apiKey).then(
                (response) => {
                    if (response.status === 404 || response.status === 200) {
                        console.log(response);
                        return response.json();
                    }
                    else {  
                        const error = `Error processing your request. Please re-enter data, 
                                since no weather information found.`;
                        this.setState({
                            error
                        });
                    }
                }).then((result) => {
                    if (!this.state.error) {
                        const weatherData = JSON.parse(JSON.stringify(result));
                        try {
                            this.setState({
                                weatherData: this.parseWeather(weatherData),
                                location: this.parseLocation(weatherData),
                                error: ''
                            });
                        }
                        catch (error) {
                            this.setState({ error });
                        }
                    }
                   
                }).catch((e) => {
                    console.log(e);
                    this.setState({error: e});
                });
        }
        
    };
    componentDidMount() {
        this.fetchWeatherByZip('19107', process.env.API_KEY);
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
        // data.data contains an array of weather forecast information by day
        if (!data || !data.data) {
            return [];
        }
        let weatherData = data.data;
        let parsedData = [];
        // starting with 7 days of data
        for (let i = 0; i < 7; i++ ) {
            let datapoint = weatherData[i];
            parsedData.push({
                date: datapoint.valid_date,
                min_temp: Math.round(datapoint.min_temp),
                max_temp: Math.round(datapoint.max_temp),
                description: datapoint.weather.description,
                iconCode: datapoint.weather.code, 
            });
        }
        
        return parsedData;
    };

    render() {
        
        return (
            <div>
                <Header />
          
            <h2>Weather forecast for: </h2>
                <h3>{this.state.location.city}{this.state.location.state && <span>, {this.state.location.state}</span>}
                </h3>
                <h3>{!this.state.location.state && <span>{this.state.location.country}</span>}</h3>
                { this.state.error && <p>{this.state.error}</p>}
                <div className="card--container">
            {
                   
                this.state.weatherData.map((data, index) => (
                
                    <Card 
                        date={data.date}
                        key = {index} 
                        count = {index+1}
                        iconCode={data.iconCode}
                        description={data.description}
                        min_temp={data.min_temp}
                        max_temp={data.max_temp}
                    />
                ))
                    
            }
                </div>
            <div className="form__container">
                <form className="form__complete" onSubmit={this.handleSubmit}>
                        <legend>Search by zip or by city, state:</legend>
                        <input className="form__input" type="text" name="data" />
                        <button className="button">Get Weather</button>
                </form>
                </div>
              <Footer />
            </div>
        );
    }
}

