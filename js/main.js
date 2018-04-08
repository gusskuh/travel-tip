console.log('Main!');

// debugger;

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'

var gLat;
var gLng;


window.onload = () => {
    mapService.initMap()
        .then(
        () => {
            var url = document.querySelector('.url').value;
            var lat = +getParameterByName('lat', url);
            var lng = +getParameterByName('lng', url);
            if (lat && lng) {
                setMarkerWithCenter({ lat, lng });
                locService.getNameByCoords(lat, lng).then(loc => {
                    renderLocAndSetUrl(loc);
                });
                weatherGet(lat, lng);
                foreCastgGet(lat, lng);
            }
            else {
                getPos();
            }
        }
        );
}

document.querySelector('.search').addEventListener('click', (ev) => {
    var address = document.querySelector('.user-address').value;
    document.querySelector('.user-address').focus();
    locService.getAddress(address).then(loc => {
        gLat = loc.coords.lat;
        gLng = loc.coords.lng;
        setMarkerWithCenter(loc.coords);
        renderLocAndSetUrl(loc.address);
        weatherGet(loc.coords.lat, loc.coords.lng);
        foreCastgGet(loc.coords.lat, loc.coords.lng);

    });
})

document.querySelector('.search').addEventListener('mouseover', (event) => {
    document.querySelector('.user-address').focus();
})

document.querySelector('.my-loc').addEventListener('click', () => {
    getPos();
    document.querySelector('.user-address').value = '';

})

document.querySelector('.copy-location').addEventListener('click', () => {
    var copyText = document.querySelector('.url');
    copyText.select();
    document.execCommand("Copy");
})



function weatherGet(lat, lng) {
    locService.getWeather(lat, lng).then(tempDetails => {
        document.querySelector('.temp').innerHTML = parseInt(tempDetails.temp);
        document.querySelector('.desc').innerHTML = tempDetails.desc;

        document.querySelector('.app-temp').innerHTML = tempDetails.appTemp;
        document.querySelector('.sunset').innerHTML = tempDetails.sunset;
        document.querySelector('.sunrise').innerHTML = tempDetails.sunrise;
        
        document.querySelector('.icon').setAttribute('src', "https://www.weatherbit.io/static/img/icons/" + tempDetails.icon + ".png");
    });
}

function foreCastgGet(lat, lng){
    locService.getForecast(lat, lng).then(tempDetails => {
        document.querySelector('.day1-date').innerHTML = tempDetails.day1Date;
        document.querySelector('.day1-icon').setAttribute('src', "https://www.weatherbit.io/static/img/icons/" + tempDetails.day1Icon + ".png");
        document.querySelector('.day1-desc').innerHTML = tempDetails.day1Desc;
        document.querySelector('.day1-max-deg').innerHTML = tempDetails.day1max;
        document.querySelector('.day1-min-deg').innerHTML = tempDetails.day1min;

        document.querySelector('.day2-date').innerHTML = tempDetails.day2Date;
        document.querySelector('.day2-icon').setAttribute('src', "https://www.weatherbit.io/static/img/icons/" + tempDetails.day2Icon + ".png");
        document.querySelector('.day2-desc').innerHTML = tempDetails.day2Desc;
        document.querySelector('.day2-max-deg').innerHTML = tempDetails.day2max;
        document.querySelector('.day2-min-deg').innerHTML = tempDetails.day2min;

        document.querySelector('.day3-date').innerHTML = tempDetails.day3Date;
        document.querySelector('.day3-icon').setAttribute('src', "https://www.weatherbit.io/static/img/icons/" + tempDetails.day3Icon + ".png");
        document.querySelector('.day3-desc').innerHTML = tempDetails.day3Desc;
        document.querySelector('.day3-max-deg').innerHTML = tempDetails.day3max;
        document.querySelector('.day3-min-deg').innerHTML = tempDetails.day3min;

    });
}

function setMarkerWithCenter(pos) {
    mapService.addMarker(pos);
    mapService.setCenter(pos);
}

function renderLocAndSetUrl(loc) {
    document.querySelector('h2').innerHTML = loc;
    document.querySelector('.url').value = `http://127.0.0.1:5500/travel-tip-startHere/index.html?lat=${gLat}&lng=${gLng}`
}

function getPos() {
    locService.getPosition()
        .then(pos => {
            gLng = pos.coords.longitude;
            gLat = pos.coords.latitude;
            setMarkerWithCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            locService.getNameByCoords(gLat, gLng).then(loc => {
                renderLocAndSetUrl(loc);
            });
            weatherGet(gLat, gLng);
            foreCastgGet(gLat, gLng);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



