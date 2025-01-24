

    const apiKey = '62437d3e581c40aab99775e353f9c4f0';
      const searchCity =document.querySelector('.city');
    localisationCity();

function checkweather(apiUrl){
    fetch(apiUrl)
.then(Response => Response.json())
.then(data => {
    console.log(data);
    

    //for the current weather "that day"
    document.getElementById('localisation').innerHTML=data.city.name;
    document.getElementById('temperature').innerHTML= data.list[0].main.temp+"c°";
    document.getElementById('etat').innerHTML=data.list[0].weather[0].description;
    document.getElementById('Humiditi').innerHTML=data.list[0].main.humidity +"%";
    document.getElementById('sped').innerHTML=data.list[0].wind.speed+"km/s";
    document.getElementById('date').innerHTML=data.list[0].dt_txt;
   document.getElementById('cloudy').src="https://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon+"@2x.png";
   
    // for the next days:
  
    document.getElementById('temp').innerHTML= data.list[5].main.temp+"c°";
    document.getElementById('day').innerHTML=data.list[5].dt_txt;
    document.getElementById('card-imag1').src="https://openweathermap.org/img/wn/"+data.list[5].weather[0].icon+"@2x.png";
   

    document.getElementById('temp-2').innerHTML= data.list[13].main.temp+"c°";
    document.getElementById('day-2').innerHTML=data.list[13].dt_txt;
    document.getElementById('card-imag2').src="https://openweathermap.org/img/wn/"+data.list[13].weather[0].icon+"@2x.png";
   

    document.getElementById('temp-3').innerHTML= data.list[21].main.temp+"c°";
    document.getElementById('day-3').innerHTML=data.list[21].dt_txt;
    document.getElementById('card-imag3').src="https://openweathermap.org/img/wn/"+data.list[21].weather[0].icon+"@2x.png";
   

    document.getElementById('temp-4').innerHTML= data.list[29].main.temp+"c°";
    document.getElementById('day-4').innerHTML=data.list[29].dt_txt;
    document.getElementById('card-imag4').src="https://openweathermap.org/img/wn/"+data.list[29].weather[0].icon+"@2x.png";
   




});

} function  resarchCity() {
    console.log(document.getElementById('city').value);

    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?&q=' + document.getElementById('city').value + '&appid='+ apiKey + "&units=metric";
    console.log(apiUrl);
    checkweather(apiUrl);
}


function localisationCity() {
    let lon,lat ;

     if( navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            lat=position.coords.latitude;
            lon=position.coords.longitude;


             
            checkweather('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ apiKey + '&units=metric');
        });

        
     }
   
} 
document.getElementById('search-Btn').addEventListener('click',()=> {
   resarchCity() ;
   
});