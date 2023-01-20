console.log("out");

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("in");
    var i = 0;
    var txt = 'Lorem ipsum typing effect!'; /* The text */
    var speed = 50; /* The speed/duration of the effect in milliseconds */

    function typeWriter() {
    if (i < txt.length) {
        var para = document.getElementById("demo");
        console.log(para===null);
        para.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    }
})