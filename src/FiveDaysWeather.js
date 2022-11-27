import {useEffect, useState} from "react";
// import {fun} from "./fun.js";
let FiveDaysWeather = (props) => {
    console.log("brojpozivaaaaaaa")
    const [weather, setWeather] = useState([]);
    const [newclass, toggle] = useState(0);
    const [buttonDay, SetbuttonDay] = useState([]);
    const [x,setX] = useState("18")

let apiFunction = (prop) => { 
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + prop + 
    "&appid=ff146a8b4c46b05b8bce4aa16d2a8c35")
    .then(response=>response.json())
    .then((data) =>{console.log("data",data); storingFunction(data)
                    
    })
}

useEffect(()=>{
    console.log("useeffect",props)
    apiFunction(props.city)
    SetbuttonDay([])
                },[props]
    )
let temp ;
let getMyDate = (i) =>{
    let date = new Date;
    // let hourEpoch = date.setHours(date.getHours())
    // let hour = new Date(hourEpoch).toString().substring(16,18)
    let dayEpoch = date.setDate(date.getDate() + i);
    let day = new Date(dayEpoch).toString().substring(8,10);
    
    if(temp !== i){
        temp = i;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    SetbuttonDay(buttonDays=>([...buttonDays, `${days[date.getDay()]}`]))}

    let monthEpoch = date.setMonth(date.getMonth());
    let monthX = new Date(monthEpoch).toString().substring(4,7).toLocaleLowerCase();
    var months = ["","jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    let month = `0${months.indexOf(monthX)}`.substr(-2);
    let yearEpoch = date.setFullYear(date.getFullYear());
    let year = new Date(yearEpoch).toString().substring(11,15);
    
    console.log("date", `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}


let storingFunction = (weatherData) => {
    setWeather([])
    let i = 0;
    while(i < 6){
    const allDays = (weatherData.list.filter(element => {
       return element.dt_txt.substring(0,10)===getMyDate(i)
    }))
    setWeather(sumOfAll =>([...sumOfAll, allDays]))
    i=i+1
}}


   let blocksFunction = (days) =>{
    return days.map((day, index)=>{

        console.log("day",day.dt_txt.substring(11,13));

   if(`${day.dt_txt.substring(11,13)}` == x){ return (<div className="block3h" key={index}>
    <div>{`${day.dt_txt.substring(11,13)}h - ${parseInt(day.dt_txt.substring(11,13))+3}h`}</div>
    <img  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}></img>
    <h6>{day.weather[0].main}</h6>
    <h6>temperature: {(day.main.temp-273.15).toFixed(1)}</h6>
    <h6>Wind: {day.wind.speed}</h6>
</div>)}
})}
    

    const fun = (e, d) =>{
        let input = e.target.value;
        
        let num = 100/(d);
        console.log(num);
        if(input >= 0 && input < num){
            setX("00");
        }
        if(input >= num && input < num*2){
            setX("03");
        }
        if(input >= num*2 && input < num*3){
            setX("06");
        }
        if(input >= num*3 && input < num*4){
            setX("09");
        }
        if(input >= num*5 && input < num*6){
            setX("12");
        }
        if(input >= num*6 && input < num*7){
            setX("15");
        }
        if(input >= num*7 && input < num*8){
            setX("18");
        }
        if(input >= num*8 && input < num*9){
            setX("21");
        }
        if(input >= num*9 && input <= 100){
            setX("24");
        }
        
            }


return(
<div id="daysHolder">
    <div id="dayButtons">
    <div onClick={(e)=>toggle(0)}>{buttonDay[0]}</div>
    <div onClick={(e)=>toggle(1)}>{buttonDay[1]}</div>
    <div onClick={(e)=>toggle(2)}>{buttonDay[2]}</div>
    <div onClick={(e)=>toggle(3)}>{buttonDay[3]}</div>
    <div onClick={(e)=>toggle(4)}>{buttonDay[4]}</div>
    </div>
    
    <div id="holderChild">
    {weather.map((days, index)=>{console.log("werd",days)

           if(index == newclass  && days.length !== 0){return (<div className={`flexDays ${index}`} key={index} >
           {/* <div  >{`${days[0].dt_txt.substring(8,10)}.${days[0].dt_txt.substring(5,7)}.`}</div> */}
           <>{blocksFunction(days)}</>
           <input id="input" type="range" onChange={(e)=>fun(e, days.length)}  ></input>
           </div>)}

        })}
      </div>  
</div>)

}  
export default FiveDaysWeather;
