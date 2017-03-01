var express = require('express')
const pg = require('pg');
const conString = 'postgres://kudeh:kene95@localhost/phonestatus';
var bodyParser = require('body-parser')
var pug = require('pug')
var path = require('path')
var app = express()
var jsdom = require("jsdom")
var fs = require("fs")

app.use(bodyParser.json()) // support json encoded bodies
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', '/node_modules/pug')

app.get('/', function (req, res) {
  
  var jsons, dDate, time, timeArr, dataArr;
  var date, model, version, platform, manufacturer, battery, longitude, latitude, speed, direction, connectionType, networkStatus;
  pg.connect(conString, function (err, client, done) {
    
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT * FROM data ORDER BY date DESC LIMIT 10;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      
      date = result.rows[0].date;      
      model = result.rows[0].model;
      platform = result.rows[0].platform;
      manufacturer = result.rows[0].manufacturer;
      version = result.rows[0].version;
      battery = result.rows[0].battery;
      longitude = result.rows[0].longitude;
      latitude = result.rows[0].latitude;
      speed = result.rows[0].speed;
      direction = result.rows[0].direction;
      connectionType = result.rows[0].connectiontype;
      networkStatus = result.rows[0].networkstatus;
      timeArr = "";
      dataArr = "";
      
      if(speed == null)
           speed = Math.round(Math.random()*150+1);

      if(direction == null)
          direction = Math.round(Math.random()*150);
      
      if(networkStatus == null)
          networkStatus = "Online";

      for(var i = 0; i < result.rows.length; i++){
         var strDate = result.rows[i].date;
         var strData = result.rows[i].speed;
         if(strData == null)
           strData = Math.round(Math.random()*300+1)
         dDate = new Date(strDate);
         time = dDate.getHours()+":"+dDate.getMinutes()+":"+dDate.getSeconds();
         if(i !=(result.rows.length-1)){
         timeArr += time+",";
         dataArr += strData+",";}
         else{
          timeArr += time;
          dataArr += strData;}
      }
      //build timeArr and dataArr to send to
      console.log(timeArr);    
      console.log(dataArr);  
      console.log(date + " "+model+" "+platform+" "+manufacturer+" "+version+" "+battery+" "+longitude+" "+latitude+" "+speed+" "+direction+" "+connectionType+ " "+networkStatus);
          jsons = {"model": model, "platform": platform, "manufacturer": manufacturer, "version": version, "batteryLevel": battery, "longitude": longitude, "latitude": latitude, "speed": speed, "direction": direction, "connectionType": connectionType, "networkStatus":networkStatus, "speedArr": dataArr, "timeArr": timeArr};
 console.log(jsons);
       
      var html = pug.renderFile('index.pug', jsons)
      fs.writeFile("/home/kudeh/public/phonestatus.html", html, function(err) {
      if(err) {
        return console.log(err);
      }
      
    console.log("The file was saved!");
      res.sendFile(path.join(__dirname+'/public/phonestatus.html'))

      }); 
    //res.send(pug.renderFile('index.pug', jsons))
    // res.sendFile(path.join(__dirname+'site/phonestatus.html'))
    })
  })
  
   //res.sendFile(path.join(__dirname+'/public/phonestatus.html'))
     
  //res.send(pug.renderFile('index.pug', jsons))
})


// POST method route
app.post('/', function (req, res, next) {  

  const data = req.body
  console.log(data)
  var date = new Date();
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO data (date, model, platform, manufacturer, version, battery, longitude, latitude, speed, direction, connectionType, networkStatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);', [date.toString(), data.model, data.platform, data.manufacturer, data.version, data.battery, data.longitude, data.latitude, data.speed, data.direction, data.connectionType, data.networkStatus], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.sendStatus(200)
    })
//

  })//
})


app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
