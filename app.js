
function createHeroDescriptions(autotypeTextUl,dynamicTexts){
    for (i = 0; i < dynamicTexts.length; i++)
    {
    const newDyanmicTextLi = document.createElement("li");
    const newDyanmicTextLiSpan = document.createElement("span");
    // newDyanmicTextLiSpan.textContent = dynamicTexts[i];
    newDyanmicTextLi.appendChild(newDyanmicTextLiSpan);
    autotypeTextUl.appendChild(newDyanmicTextLi);
    }
}

function controlTextCaret(textCaret, timeout){
    textCaret.style.animationPlayState = "running";
    setTimeout(() => {
        textCaret.style.animationPlayState = "paused";
        textCaret.style.opacity = 0;
        console.log("hello");
    }, timeout);

}



var bhasExit = false;

//typewriter function
function typewriter(introText, text, textCaret, typingSpeed, introString, step){
    if(step >= text.length)
    {
        const textCaretElement = introText.querySelector('#caret');
        controlTextCaret(textCaretElement, 1000);
        return true;
    }

    if(step < text.length)
    {
        if (bhasExit == true){
            return;
        }
        introString += text.charAt(step);
        introText.innerHTML = ""+introString + ""+textCaret;
        step++;
    }

    setTimeout(() => {
        typewriter(introText, text, textCaret, typingSpeed, introString, step);
    }, typingSpeed);
}





//add dynamic autotyping text function
dynamicTexts = ["I am Aik Kiat, SUTD CSD", "Software Engineering", "Frontend Dev, Aspiring Fullstack", "AI-Applications Enthusiast"];
const autotypeTextUl = document.querySelector(".dynamic__texts");
const heroTextCaret = "<span class='hero__caret' id='caret'></span>"; //caretElement

createHeroDescriptions(autotypeTextUl,dynamicTexts);
const rootElement = document.documentElement;

const dynamicTextsSpans = autotypeTextUl.querySelectorAll('li span');
console.log(dynamicTextsSpans);

const startButton = document.querySelector(".start__button");
finishedDisplaying = false;

//Display Hero Texts
function displayDynamicTexts(textSpanCount){
    var typingSpeed = 40;
    if(textSpanCount >= dynamicTexts.length)
    {
        return;
    }
    if(typewriter(dynamicTextsSpans[textSpanCount], dynamicTexts[textSpanCount], heroTextCaret,typingSpeed,"", 0));
        textSpanCount++;
        setTimeout(() => {
            displayDynamicTexts(textSpanCount);
    }, timeBetweenTexts);
}

var textSpanCount = 0;
var timeBetweenTexts = 1000;

displayDynamicTexts(textSpanCount);
console.log(finishedDisplaying);

setTimeout(() => {
    startButton.style.opacity = 1;
    startButton.style.zIndex = 1;
}, 3000);


function initialiseIntersectionObserver(){
    //animating when coming into view:
    let aboutBoxAll = document.querySelectorAll(".about__box")
    console.log(aboutBoxAll);

    const observer = new IntersectionObserver((entries)=>{
        for(let i = 0; i < entries.length; i++)
        {
            if(entries[i].isIntersecting){
                observer.unobserve(entries[i].target)
                entries[i].target.style.opacity=1;
                let elementCover = entries[i].target.querySelector(".about__box__cover")
                setTimeout(() => {
                    elementCover.style.opacity = 0;
                    // elementCover.style.zIndex = -1;
                    entries[i].target.classList.add('animate');

                }, 1000);
                setTimeout(() => {
                    entries[i].target.style.animationPlayState = "paused";
                }, 3900);
            }
        }
    }, {threshold:0.8});
    
    for(let i = 0; i < aboutBoxAll.length; i++)
    {
        observer.observe(aboutBoxAll[i]);
    }
}



//pressing Start button, spawn the rest of the page

//get refernces to navigation button class and its border
const navigationButtons = document.querySelectorAll(".navigation__button");
const navigationButtonBorders = document.querySelectorAll(".navigation__button .navi__button__border");

function start(){
    console.log(navigationButtonBorders);
    navigationButtonBorders.forEach(element => {
        element.style.opacity = 1;
        const currentAnimState = window.getComputedStyle(element).animationPlayState;
        console.log(currentAnimState);
        if(currentAnimState == "paused")
        {
            element.style.animationPlayState = "running";
        }
    });

    navigationButtons.forEach(element => {
        element.style.opacity = 1;
        element.style.zIndex = 1;
    });
}

function toggle(sectionName){

    //get button
    const back__buttons = document.querySelectorAll(".back__button");
    back__buttons.forEach(button => {
        button.style.animationPlayState = "running";
    });

    navigationButtons.forEach(button =>{
        if (button.id == sectionName)
        {
            button.style.animationPlayState = "running";
        }
    })

    //play static transition anims
    const flicker = document.querySelector('.flicker__effect');
    const flash = document.querySelector('.flash__filter');
    flickerStyle = window.getComputedStyle(flicker);
    flashStyle = window.getComputedStyle(flash);
    if(flickerStyle.zIndex == -1)
    {
            flicker.style.zIndex = 1;
    }

    if(flashStyle.zIndex == -1)
    {
            flash.style.zIndex = 1;      
    }


    setTimeout(() => {

        if(flickerStyle.zIndex == 1)
        {
            flicker.style.zIndex = -1;
        }

        if(flashStyle.zIndex == 1)
        {
            flash.style.zIndex = -1;      
        }
        switchViews(sectionName);
        back__buttons.forEach(button => {
        button.style.animationPlayState = "paused";
        });

        navigationButtons.forEach(button =>{
        button.style.animationPlayState = "paused";
        });
    },500);

    //console.log("here"+window.getComputedStyle(back__button).animationPlayState);
}


function switchViews(sectionName){

    const searchSection = document.querySelector(".search__section");
    const heroContainer = document.querySelector(".hero");

    const heroOpacity = window.getComputedStyle(heroContainer).opacity;
    const searchOpacity = window.getComputedStyle(searchSection).opacity;
    
    if(heroOpacity == 1)
    {
        heroContainer.style.opacity = 0;
    } else if(heroOpacity == 0)
    {
        heroContainer.style.opacity = 1;
    }
    if(searchOpacity == 1)
    {
        searchSection.style.opacity = 0;
        searchSection.style.zIndex = -1;
    } else if(searchOpacity == 0)
    {
        searchSection.style.opacity = 1;
        searchSection.style.zIndex = 1;
    }

    //show sections based off sectionName
    if(sectionName == "about"){
        console.log("over here");
        const aboutSection = document.querySelector(".about__section");
        const aboutOpacity = window.getComputedStyle(aboutSection).opacity;
        const aboutwhole = document.querySelector('.about__whole');
        const aboutwo = window.getComputedStyle(aboutwhole).opacity;
        const aboutBoxAll = document.querySelectorAll(".about__box");
        const aboutBoxCoverAll = document.querySelectorAll(".about__box__cover");

        if(aboutOpacity == 1)
        {
            aboutBoxAll.forEach((aboutBox) =>{
                aboutBox.style.animationPlayState = "running";
                aboutBox.classList.remove('animate');
                aboutBox.style.opacity = 0;
            });
            aboutBoxCoverAll.forEach((aboutBoxCover) =>{
                aboutBoxCover.style.opacity = 1;
                // aboutBoxCover.style.zIndex = 1;
            })
            console.log("over here!!!");
            aboutSection.style.opacity = 0;
            aboutSection.style.zIndex = -1;

        } else if(aboutOpacity == 0)
        {
            console.log("changing opacity");
            aboutSection.style.opacity = 1;
            aboutSection.style.zIndex = 1;
            initialiseIntersectionObserver();
        }

        if(aboutwo == 1)
        {
            aboutwhole.style.opacity = 0;
            aboutwhole.style.zIndex = -1;
        } else if(aboutwo == 0)
        {
            aboutwhole.style.opacity = 1;
            aboutwhole.style.zIndex = 1;
        }
    }
    else if(sectionName == "projects"){
        const projectSection = document.querySelector(".projects__section");
        const opacity = window.getComputedStyle(projectSection).opacity;
        let videoSource = document.getElementById("project__information__video");
        let popUpWindow = document.querySelector(".projects__popupWindow");
        if(opacity == 1)
        {
            popUpWindow.style.opacity = 0;
            popUpWindow.style.zIndex = -1;
            videoSource.setAttribute('src', videoLinks['placeholder']);
            projectSection.style.opacity = 0;
            projectSection.style.zIndex = -1;
        } else if(opacity == 0)
        {
            projectSection.style.opacity = 1;
            projectSection.style.zIndex = 1;
        }
    }

    else if(sectionName == "skills"){
        const skillsSection = document.querySelector(".skills__section");
        const opacity = window.getComputedStyle(skillsSection).opacity;
        if(opacity == 1)
        {
            skillsSection.style.opacity = 0;
            skillsSection.style.zIndex = -1;
        } else if(opacity == 0)
        {
            skillsSection.style.opacity = 1;
            skillsSection.style.zIndex = 1;
        }
    }
}


function downloadResume(){
   // const downloadButton = document.querySelector(".resume");
    const fileLink = "https://drive.google.com/file/d/1eoFZH2_LDuVrmVGw4mqAE2y6sHGUSbY0/view?usp=drive_link";
    location.href = fileLink;
}



smartHealth_text = `Android App created as Part of 50.001 Informations Systems and Programming Course.\n 
Created using Java in Android Studio, and used Java Spring as the backend framework. 
User data stored in a PostGreSQL database, hosted on AWS.\n 
REST APIs for standardised clear communication standard between the client and backend, 
and RESTful APIs include Google Places, Routes API, Open AI GPT4.0 Api. We also hosted this backend on a free server space platform called Render, 
allowing the backend service of our app to be running 24/7. A step towards increased efficacy in deployment, and allowing our backend service to scale to larger platforms in the future. `


popKids_text = `A virtual life-size simulation of fishes that morph and swirl according to users' hand gestures.
Used OpenCV and Mediapipe for motion gesture detection, captured through an XBOX Kinect mounted on the ceiling. Done as part of our Term 2 Course in Design Thinking and Innovation.
Spearheaded parsing of the AI prediction data as results to drive the fish particle elements in the simulation, and also set up the scene in Blender 3D to host this simulation, using the built-in Blender Python Library.`


nlpNews_Text =`My own personal project on exploring the applications of NLP, namely on finding the relations between news articles. I used Babelscape's REBEL Model, which uses a Transformer-based approach to extract 
key text information from a given corpus in the form of triplets. This is at odds with conventional Classification Pipelines 
which are multi-step in nature, from pre-processing to Feature Extraction, and encoding said features to be parsed into a Classification model for training and evaluation. Read more on my github repo!`


mathMassacre_text=`Simple and fun game created during our first term at SUTD, using Python Standard Libraries and Tkinter. Project done as part of our Computational Thinking for Design course, an introduction to simple programming in Python.`


fred_text=`My personal project for exploring how Real-time Object Detection can be implemented as a handheld feature, and thus I devled into Flutter App development as well. Used the TensorflowLite plugin as well as OpenCV for object detection. More info about it on my github repo.`


greenLoop_text=`Team Project as part of SUTD's annual What-The-Hack(WTH) competition featuring sponsors such as DBS, HTX, Govtech and IMDA. As a team, we built a system that could sort recyclables automatically via OpenCV for Computer Vision, 
detecting the type of recyclable using an existing model. The prediction results were then passed over to an onboard ESP32 via Serial Communication at a synchronized Baud Rate on both the local machine and the ESP32. By collecting the data, conditionals could thus be coded 
into the ESP32 to drive the hardware components in different ways to sort the different types of recyclables.`


videoLinks = {"smartHealth":"https://www.youtube.com/embed/EaPBjWaO0MM?si=8EUNXFvua8doaU5p", "popKids":"https://www.youtube.com/embed/JwkDctVayhs?si=-H7w17iXeZvOiQ4x", 
    "fred": "https://www.youtube.com/embed/oVhxidlmAhY?si=fD7OIAYSqiQlSckN", "mathMassacre":"https://www.youtube.com/embed/adQkJX5DadU?si=-48adIf1l1DBiVgI",
    "nlpNews": "https://www.youtube.com/embed/5yQdkhj2GSM?si=E2srlXCG-6ffiaan", "greenLoop":"images/project_images/hacking2.jpg", "placeholder":"#"}

gitHubLinks = {"smartHealth":"https://github.com/ItsMeOX/SmartHealth", "popKids":"https://github.com/AikKiat/Pools-of-Possibilities-FIsh-Flock-Simulation-and-Motion-Gesture-Detection-in-Blender", 
    "fred": "https://github.com/AikKiat/ObjectDetect-Test", "mathMassacre":"https://github.com/AikKiat/The-Mathematician-s-Massacre",
    "nlpNews": "https://github.com/AikKiat/News-Article-Detective-NLP-Texts-Relations-Project-", "greenLoop":"https://github.com/AikKiat/-WTH2024-GreenLoop-Smart-Recyclables-Sorting"}


function typeOutInfo(text, component){
    let typingSpeed =10;
    typewriter(component, text, heroTextCaret, typingSpeed,"\n \n ",0)
}



//Control the Projects Popup window

function summonPopup(selector){
    let animationTime = 50;
    //get the popup window
    popUpWindow = document.querySelector(".projects__popupWindow");
    informationBody = document.querySelector(".projects__popupWindow .information__body");
    videoSource = document.getElementById("project__information__video");
    projectInfo = document.querySelector(".project__information");

    holder = document.querySelector(".holder");


    document.querySelector(".projects__popupWindow").animate(
        [
            {transform: 'skew(180deg)'}
        ],
        {
            duration: animationTime,
            iterations:'1'
        }
    )

    if (selector == 'exit'){
        videoSource.setAttribute('src', videoLinks['placeholder']);
        setTimeout(() => {
            videoSource.style.zIndex = 1;
            videoSource.style.opacity = 1;
            popUpWindow.style.opacity = 0;
            popUpWindow.style.zIndex = -1;
            informationBody.innerHTML = "";

            bhasExit = true;
        }, animationTime);
        return;
    }

    popUpWindow.style.opacity = 1;
    popUpWindow.style.zIndex = 2;
    bhasExit = false;
    
    if (selector == 'popKids'){
        typeOutInfo(popKids_text, informationBody);
        videoSource.setAttribute('src', videoLinks['popKids']);
        holder.setAttribute('href', gitHubLinks['popKids']);
        console.log("popKids");
    }

    if (selector == 'smartHealth'){
        typeOutInfo(smartHealth_text, informationBody);
        videoSource.setAttribute('src', videoLinks['smartHealth']);
        holder.href= gitHubLinks['smartHealth'];
        console.log("smarthealth");
    }

    if (selector == 'fred'){
        typeOutInfo(fred_text, informationBody);
        videoSource.setAttribute('src', videoLinks['fred']);
        holder.href= gitHubLinks['fred'];
        console.log("fred");
    }

    if (selector == 'nlpNews'){
        typeOutInfo(nlpNews_Text, informationBody);
        videoSource.setAttribute('src', videoLinks['nlpNews']);
        holder.href= gitHubLinks['nlpNews'];
        console.log("nlpNews");
    }

    if (selector == 'mathMassacre'){
        typeOutInfo(mathMassacre_text, informationBody);
        videoSource.setAttribute('src', videoLinks['mathMassacre']);
        holder.href=gitHubLinks['mathMassacre'];
        console.log("mathMassacre");
    }

    if (selector == 'greenLoop'){
        typeOutInfo(greenLoop_text, informationBody);
        videoSource.style.zIndex = -2;
        videoSource.style.opacity = 0;

        holder.href= gitHubLinks['greenLoop'];
        console.log("hacakthon");
    }
}
