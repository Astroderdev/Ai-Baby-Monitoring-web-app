var alarm = "";
var status_check = "";
var objects = [];
function preload(){
    alarm = loadSound("alarm.mp3");
}
function setup(){
    cocossd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    canvas = createCanvas(640, 420);
    canvas.center();
    background("white");
    video = createCapture(VIDEO);
    video.hide();
}
function modelLoaded(){
    console.log("cocossd is loaded");
    status_check = true;
    cocossd.detect(video, gotDetection);
}

function gotDetection(results, error){
    if(error){
    console.log(error);
    }
    if(results){
    console.log(results);
    objects = results;
    }
}
function draw(){
    image(video, 0, 0, 640, 420);
    if(status_check != "") 
    {
         for (var i = 0; i < objects.length; i++)
          { 
           if(objects[i] == "person"){
               document.getElementById("status").innerHTML = "Status: Baby/Person Found";
               alarm.stop();
           }else{
                document.getElementById("status").innerHTML = "Status: Baby/Person Not Found";
                alarm.play();
           }
        }
    }
    if(objects.length == 0){
        document.getElementById("status").innerHTML = "Status: No Objects Found";
    }
}