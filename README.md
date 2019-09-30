# react-weather-app
## A React Weather App

This is a weather app built in React. It pulls data from Weather API (www.weatherbit.io) and displays a forecast for locations in the U.S. You can search for weather data by either zip code or city, state. This application is still a work in progress.

## Getting Started
### Install dependencies
After cloing the project, to install the necessary dependencies, run:
    yarn install

### API_KEY
In order to connect to the [WeatherBit API](www.weatherbit.io), you will need to sign up for your own API key. Then, create an env file in your root directory, with your API key included:
    API_KEY = [your API key goes here]

The file will be ignored by git. See more about how dotenv works here: [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv).


## Development
To run the dev server:
    yarn run dev-server

Then open [http://localhost:8080/](http://localhost:8080/) to view the app in the local browser.

## Production
To run the build for production:
    yarn run build:prod


## Testing
TO DO

## Notes
This app was not built with create-react-app, and I am currently working on updating some of the dependencies. More changes to come.

# License
[MIT](https://choosealicense.com/licenses/mit/)
