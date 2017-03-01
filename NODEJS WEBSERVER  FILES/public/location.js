var longitude = -66.0853778;//longitude = document.getElementById("longitude")
var latitude = 45.3063846;//latitude = document.getElementById("latitude").

$(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
    var latlon = latitude + "," + longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=900x400&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}, function (error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});




