var level = $("#batteryLevel").text();
$(function () {
   if (level > 75) {  
    $("#batterylife-amount").css("width",level+"%") 
    $("#batterylife-amount").css("backgroundColor","green") 
    $("#batteryLevel").text(level+"%")
    $("#batterylife").css("text-align", "right")
    
} else if (level >= 50 ) {  
    $("#batterylife-amount").css("width",level+"%") 
    $("#batterylife-amount").css("backgroundColor","yellow")  
    $("#batteryLevel").text(level+"%")
    $("#batterylife").css("text-align", "right")
}else if (level >= 25 ) {  
    $("#batterylife-amount").css("width",level+"%") 
    $("#batterylife-amount").css("backgroundColor","orange")  
    $("#batteryLevel").text(level+"%")
    $("#batterylife").css("text-align", "right")
} else {  
    $("#batterylife-amount").css("width",level+"%") 
    $("#batterylife-amount").css("backgroundColor","red")  
     $("#batteryLevel").text(level+"%")
    $("#batterylife").css("text-align", "right")
}

});
