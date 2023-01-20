// console.log("out");

document.addEventListener("DOMContentLoaded", ()=>{
    // console.log("in");
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

    // switching b/w sections
    // main btns are buttons that are displayed on the welcome screen
    mainBtns = document.querySelectorAll(".main-btns");
    mainBtns.forEach((mainBtn)=>{
        mainBtn.addEventListener("click", ()=>{
            let currentBtn = document.getElementsByClassName("active-btn")[0];
            if (currentBtn){
                currentBtn.className = currentBtn.className.replace("active-btn", "");
            }
            // console.log(mainBtn.className);
            mainBtn.className += " active-btn";
            var controlBtnId = mainBtn.dataset.id + "-control-btn";
            
            let controlBtn = document.getElementById(controlBtnId);
            let currentActiveControlBtn = document.getElementsByClassName("active-control-btn")[0];
            if (currentActiveControlBtn)
            {
                currentActiveControlBtn.className = currentActiveControlBtn.className.replace("active-control-btn", "");
            }
            controlBtn.className += " active-control-btn";
        })
    })

    controlBtns = document.querySelectorAll(".control-btn")
    controlBtns.forEach((controlBtn)=>{
        if (controlBtn.id != "resume-control-btn"){         
            // we don't want to add active btn class to resume control button 
            // so we implement a check for that 

            controlBtn.addEventListener("click", ()=>{
                let currentControlBtn = document.getElementsByClassName("active-control-btn")[0];
                if (currentControlBtn){
                    currentControlBtn.className = currentControlBtn.className.replace("active-control-btn", "");
                }
                // console.log(mainBtn.className);
                controlBtn.className += " active-control-btn";
                });
        };
    })
    // projectsBtn.addEventListener("click", ()=>{
    //     welcomeDiv.classList.remove("active");
    //     projectsDiv.classList.add("active");
    // })

})