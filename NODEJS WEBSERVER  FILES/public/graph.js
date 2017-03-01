var speedArr = $("#speedArr").text().split(",");
var categories = $("#timeArr").text().split(",");
var data= [];
var aTime = [6];
//console.log(timeArr);
for(var i=0; i < speedArr.length; i++){
   data[i] = parseFloat(speedArr[i]);
}
//console.log(data);

//var categories = ['19:00', '19:03','19:04', '19:30', '19:33','19:44','19:55', '20:00','20:04','20:33', '20:43','21:04'];
           
//var data = [300.9, 4.2, 5.7, 200.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];            
//var data = []
console.log(categories)
console.log(data)

$(function () {
    Highcharts.chart('graph', {
        title: {
            text: 'Change in Speed for the Day',
            x: -20 //center
        },
        xAxis: {
            name: 'time',
            categories 
        },
        yAxis: {
            title: {
                text: 'Speed (km/h)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'km/h'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
           name: 'speed',
           data
        }]
    });
});
