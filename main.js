object=[];
status="";
object_name="";
function preload(){

}
function setup(){
    canvas=createCanvas(400,350);
    canvas.position(550,300);
    video=createCapture(VIDEO);
    video.size(400,350);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
    object_name=document.getElementById("name_input").value;
}
function modelLoded(){
    status=true;
    console.log("Model_Loded");
}
function draw(){
    image(video,0,0,400,350);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object detected";
            fill(r,g,b);
            percent=Math.floor(object[i].confidence*100);
            text(object[i].label+" "+percent,object[i].x+15,object[i].y+15);
            noFill();
            stroke('#FF0000');
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("check").innerHTML=object_name+" found";
                speechSynth=window.speechSynthesis;
                utter=new SpeechSynthesisUtterance(object_name+"found");
                speechSynth.speak(utter);
            }else{
                document.getElementById("check").innerHTML=object_name+"not found";
            }
        }
    }
}
function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    object=results;
}
}