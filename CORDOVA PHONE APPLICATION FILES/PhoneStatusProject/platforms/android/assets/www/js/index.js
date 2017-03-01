var app = {
    model: "", platform: "", version: "", manufacturer: "",latitude: "", longitude: "", direction: "", speed: "", timestamp: "", batteryLevel: "", connectionType: null, networkStatus: null,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        window.addEventListener('batterystatus', app.onBatteryStatus, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onOnline, false);

        app.deviceInformation();
        app.checkConnection();
        //app.onBatteryStatus();
        app.deviceLocation();
        app.sendData();
        /*app.receivedEvent('deviceready');   
        console.log("console.log works well");
        console.log(device.model);
        var header = document.getElementById("header");
        header.setAttribute('style', 'color:red;');*/
    },
    //get Device Information.
    deviceInformation : function() {
        this.model = device.model;
        this.platform = device.platform;
        this.manufacturer = device.manufacturer;
        this.version = device.version;
               
        document.getElementById("model").innerHTML="Model: "+ this.model;
        document.getElementById("platform").innerHTML="Platform: "+this.platform;
        document.getElementById("manufacturer").innerHTML="Manufacturer: "+this.manufacturer;
        document.getElementById("version").innerHTML="Version: "+this.version;
    },
    //get Battery Status.
    onBatteryStatus : function(status) {
        app.batteryLevel = status.level;
        document.getElementById("batteryLevel").innerHTML="Battery Level: "+app.batteryLevel;
    },
    //get Connection Type.
    checkConnection : function() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      
      this.connectionType = states[networkState];
      document.getElementById("connectionType").innerHTML=this.connectionType;     
    },
    //check if the device is online.
      onOnline : function(){
      this.networkStatus = "Online";
      document.getElementById("networkStatus").innerHTML = "Online";
    },
    //check if the device is offline.
    onOffline : function(){
      this.networkStatus = "Offline";
      document.getElementById("networkStatus").innerHTML = "Offline";
    },
    //get Device Location.
    deviceLocation : function(){
        navigator.geolocation.watchPosition(
            function(position){
               this.longitude = position.coords.longitude;
               this.latitude =  position.coords.latitude;
              // this.speed = position.coords.speed;
               //this.direction = position.coords.heading;
               this.timestamp = position.timestamp;

               document.getElementById("timestamp").innerHTML = "TimeStamp: "+this.timestamp;
               document.getElementById("longitude").innerHTML="Longitude: "+this.longitude;
               document.getElementById("latitude").innerHTML="Latitude: "+this.latitude;
              // document.getElementById("speed").innerHTML="Speed: "+this.speed;
              // document.getElementById("direction").innerHTML="Direction: "+this.direction;

            },
            function(error){
               //document.getElementById("timestamp").innerHTML = "error";
            }, {enableHighAccuracy: true});
        navigator.geolocation.getCurrentPosition(
            function(position){
               this.direction = position.coords.heading;
               this.speed = position.coords.speed;
            
               document.getElementById("speed").innerHTML="Speed: "+this.speed;
               document.getElementById("direction").innerHTML="Direction: "+this.direction;

            },
            function(error){
               //document.getElementById("timestamp").innerHTML = "error";
            });
    },
    //send Data to Server
    sendData : function() {

     $(document).ready(function(){
    //$("button").click(function(){
        var conType = $("#connectionType").text();
        //var netstat = 
     setInterval(function(){
        $.ajax({
        url:  'http://138.197.136.72:80',
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify({timestamp: this.timestamp, model: app.model,platform: app.platform, manufacturer: app.manufacturer, version: app.version, battery: app.batteryLevel,longitude: this.longitude, latitude: this.latitude, speed: this.speed, direction: this.direction, connectionType: app.connectionType, networkStatus: app.networkStatus}),
        dataType:'json',
        success: function(data){
         //On ajax success do this
         alert(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
          //On error do this
          if (xhr.status == 200) {
            //alert(ajaxOptions);
          }
          else {
            //alert(xhr.status);
            //alert(thrownError);
          }
          //document.getElementById("longitude").innerHTML="error";
        }
        });
     }, 10000);//time in milliseconds 
    //});
});
    }
   /* receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },*/
    
};

app.initialize();
