//https://api.swingbyswing.com/v2/add-client-profile
//make sure that the callback is the exact website that you are creating localhost:// whatever on webstorm
var clientID = "d989db4e-e351-44f3-94db-7696884bdd09";
//http://openweathermap.org/appid
var weatherAppId = "19a21ef97ff0f9444517d8fc89ef7a8d";
var accessToken, model, weather;

//checks to see if there is a accessToken
function onload() {
    var redirectURI = document.URL;
    var authUrl = "https://api.swingbyswing.com/v2/oauth/authorize?scope=read&redirect_uri=" + encodeURI(redirectURI) + "&response_type=token&client_id=" + clientID;
    accessToken = getUrlVars().access_token;
    if(accessToken == null) {
        location.replace(authUrl);
    }
    else {
        accessToken = accessToken.replace("\n","");
        model = getCourse(51763);
    }
}

//decodes the url
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

function getWeather(lat, lon) {
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + weatherAppId;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            weather = JSON.parse(xhttp.responseText);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

//Makes an AJAX request to the swing by swing website
//NOTE http://blog.jetbrains.com/webstorm/2013/06/cors-control-in-jetbrains-chrome-extension/
function getCourse(id) {
    var url = "https://api.swingbyswing.com/v2/courses/" + id + "?access_token=" + accessToken;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            model = JSON.parse(xhttp.responseText);
            var location = model.course.location;
            getWeather(location.lat, location.lng);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}