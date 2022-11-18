//importing the packages
const express=require("express");
const https = require('https');
const bodyParser=require("body-parser");

const app=express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//the home page
app.get("/",(req,res)=>{res.render("index")})

//in home page we are showing the result
app.post("/",function(req,res){
    
    let city=req.body.cityName;
    
    let url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b5e1905f70ef4bf47b3235d50242e204";
    

    https.get(url,(responce)=>{
         
        responce.on("data",
                    (data)=>{

                        try{
                        
                        const Weather=JSON.parse(data);//converting to JSON file
                        
                        //from the JSON object we are calling each attribute
                        const icon=Weather.weather[0].icon;
                        const city=Weather.name;
                        const country=Weather.sys.country;
                        const temp=parseInt(Weather.main.temp-273.15);

                        //calling the Date() in JS
                        const date=new Date();

                        //getting the day
                        const day=date.getDate();
                        //declaring the array since the above return integer
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        const month=months[date.getMonth()];

                        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        const Day=days[date.getDay()];
                        
                        const descrip=Weather.weather[0].main;
                        
                        const min_temp=parseInt(Weather.main.temp_min-273.15);
                        const max_temp=parseInt(Weather.main.temp_max-273.15);

                        res.render("display",
                              {
                                  icon:icon,
                                  descrip:descrip,
                                  min_temp:min_temp,
                                  max_temp:max_temp,
                                  city:city,
                                  country:country,
                                  temp:temp,
                                  day:day,
                                  month:month,
                                  Day:Day
                               }
                               )

                        }

                        catch(e){
                            if(e)
                            {
                                res.render("Wrong_Input");
                            }
                          
                        }
           
                    })
                });
 
    
            })

app.get('*',(req,res)=>{res.render('error')})



app.listen(process.env.PORT || 2000,()=>{console.log("Server started..."); }  )


