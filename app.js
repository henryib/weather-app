window.addEventListener('load', ()=>{
    let longitude;
    let latitiude;
    let tempDescription = document.querySelector(".temp-description");
    let temperature = document.querySelector(".temp-degrees");
    let timezone = document.querySelector(".location-timezone");
    let time = document.querySelector(".location-time");
    const api_key = '4acc186aedd96291133eb9c26f6c2580';
    var date = new Date();


    if(navigator.geolocation){  
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitiude = position.coords.latitude;
           
            const proxy = 'http://cors-anywhere.herokuapp.com/';// proxy needed for requests to local host
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitiude}&units=metric&lang=en&lon=${longitude}&appid=${api_key}`;
            
            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data =>{
                    console.log(data);
                    const{ main } = data.weather
                    // set Dom elems from the API
                    temperature.textContent = data.main.temp;
                    timezone.textContent = data.name;
                    tempDescription.textContent = data.weather[0].description;
                    time.textContent = date.getHours() - 12 + ":" + date.getMinutes() ;
                    setIcons(data.weather[0].description , document.querySelector(".icon"));

                })
        });
    }else{
        // runs if geoloaction is not enabled 
    }

    function  setIcons(icon, iconID){
        let currentIcon = "RAIN";
        const skycons = new Skycons({ color: "white"});
        if(icon.includes("clear") == true ){
            currentIcon = "CLEAR_DAY";
        } else if(icon.includes("rain") == true ){
            currentIcon = "RAIN";
        } else if(icon.includes("cloud") == true ){
            currentIcon = "CLOUDY";
        } else if(icon.includes("snow") == true ){
            currentIcon = "SNOW";
        } 
        
        skycons.play();
        return skycons.set(iconID , Skycons[currentIcon])
    }
});
