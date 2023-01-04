console.log("out");

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("in");
    var i = 0;
    var j = 0;
    var k = 0;
    var hello_world_text = '> Hello World!';
    var intro_text = "> I'm Khawaja Abaid Ullah!";
    var email_text = "> reach me at khawaja.abaid@gmail.com"
    var speed = 75;

    function typeWriter() {
        // first print the hello world
        if (i < hello_world_text.length) {
            var hello_world_div = document.getElementById("hello-world");
            hello_world_div.innerHTML += hello_world_text.charAt(i);
            i++;
        }
        // followed by printing intro-text
        else if (j < intro_text.length) {
            var intro_text_div = document.getElementById("intro-text");
            intro_text_div.innerHTML += intro_text.charAt(j);
            j++;
        }
        // followed by printing email
        else if (k < email_text.length) {
            var email_div = document.getElementById("email");
            email_div.innerHTML += email_text.charAt(k);
            k++;
        }
        setTimeout(typeWriter, speed);
    }
    typeWriter();
})