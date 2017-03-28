var express = require('express');
var app = express()
var unixTime = require('unix-time');
app.get('/:param1', (req,res)=>{
    var url = req.url;
    var param1 = req.params.param1;
    var bar = {
        unix : this.unixvalue,
        natural : this.naturalvalue
    }
    if(req)
    if(isNaN(param1) && url != '/favicon.ico'){
        var unixdate = unixTime(new Date(param1));        
        bar.unixvalue = unixdate,
        bar.naturalvalue = param1
    } else if(!isNaN(param1) && url != '/favicon.ico'){ 
        bar.unixvalue = param1
        var d = new Date(param1*1000)
        var months = ["January","February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        bar.naturalvalue = months[d.getMonth()] + " " + d.getDate() + "," + d.getFullYear(); 

    }
    res.send(bar)   
})
app.listen(3000,()=>{
    console.log("App listening at 3000")
})
