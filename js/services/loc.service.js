// ES6 Object shorthand syntax:
// var x = 9;
// var y = 8;

// var obj = {x, y};
// console.log('obj', obj);



// var locs = { lat: 11.22, lng: 22.11 };

// function getLocs1() {
//     return Promise.resolve(locs);
// }

// function getLocs() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(locs);
//         }, 2000)
//     });

// }


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDOfrPRKmzX0iX63U8l0ufgU1mo8ZL53do`)
        .then(function (res) {
            var loc = {
                coords: res.data.results[0].geometry.location,
                address: res.data.results[0].formatted_address
            };
            console.log('lng and lat of search', res.data.results[0].geometry.location);
            console.log('lng and lat of search', res.data.results[0].formatted_address);
            return loc;
        })
}

function getNameByCoords(lat, lng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDOfrPRKmzX0iX63U8l0ufgU1mo8ZL53do`)
        .then(function (res) {
            console.log('lng and lat of search', res.data.results[0].formatted_address);
            return res.data.results[0].formatted_address;
        })
}

function getWeather(lat, lon) {
    return axios.get(`https://api.weatherbit.io/v2.0/current?key=1645a6b8133a4d809f23bde481bde143&lat=${lat}&lon=${lon}`)
        .then(function (res) {
            var tempDetails = {
                temp: res.data.data[0].temp,
                desc: res.data.data[0].weather.description,
                icon: res.data.data[0].weather.icon,
                appTemp: res.data.data[0].app_temp,
                sunset: res.data.data[0].sunset,
                sunrise: res.data.data[0].sunrise

            }
            return tempDetails;
        })
}

function getForecast(lat, lon) {
    return axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=1645a6b8133a4d809f23bde481bde143&lat=${lat}&lon=${lon}`)
        .then(function (res) {
            var tempDetails = {
                day1Date: res.data.data[1].datetime,
                day1Icon: res.data.data[1].weather.icon,
                day1Desc: res.data.data[1].weather.description,
                day1max: res.data.data[1].max_temp,
                day1min: res.data.data[1].min_temp,
                day2Date: res.data.data[2].datetime,
                day2Icon: res.data.data[2].weather.icon,
                day2Desc: res.data.data[2].weather.description,
                day2max: res.data.data[2].max_temp,
                day2min: res.data.data[2].min_temp,
                day3Date: res.data.data[3].datetime,
                day3Icon: res.data.data[3].weather.icon,
                day3Desc: res.data.data[3].weather.description,
                day3max: res.data.data[3].max_temp,
                day3min: res.data.data[3].min_temp
            }

            return tempDetails;
        })
}


export default {
    getPosition,
    getAddress,
    getNameByCoords,
    getWeather,
    getForecast
}