const express =require("express");
var http =require("http");

const app =express();
const port = process.env.port||5000
var server = http.createServer(app);
var io=require("socket.io")(server); 

//middleware
app.use(express.json());

var clients={};
io.on("connection",(Socket)=>{
    console.log(`connected : ${Socket.id}`);
    Socket.on("signIn",(id)=>{
        clients[id]=Socket;
        //console.log(clients);
    });
    
    //events
    Socket.on("message",(msg)=>{
        console.log(msg);
        let targetID =msg.targetID;
        if(clients[targetID]){
            console.log("inside");
            clients[targetID].emit("message",msg); 
        }
        else{
            console.log("finded");
        }
    });
});

 
server.listen(port,"0.0.0.0",()=>{
    console.log("server started");
});


//npm run dev