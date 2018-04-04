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
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=be17c085f499e7bbe7c298115551f128&units=metric`)
        .then(function (res) {
            var tempDetails = {
                temp: res.data.main.temp,
                desc: res.data.weather[0].description,
                icon: res.data.weather[0].icon
            }
            console.log('temp is:', res.data.main.temp);
            console.log('weather is:', res.data.weather[0].description);
            return tempDetails;
        })
}




export default {
    getPosition,
    getAddress,
    getNameByCoords,
    getWeather
}