
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
        introString += text.charAt(step);
        introText.innerHTML = ""+introString + ""+textCaret;
        step++;
    }

    setTimeout(() => {
        typewriter(introText, text, textCaret, typingSpeed, introString, step);
    }, typingSpeed);
}

function controlTextCaret(textCaret, timeout){
    textCaret.style.animationPlayState = "running";
    setTimeout(() => {
        textCaret.style.animationPlayState = "paused";
        textCaret.style.opacity = 0;
        console.log("hello");
    }, timeout);

}





//add dynamic autotyping text function
dynamicTexts = ["I am Aik Kiat, SUTD CSD", "Software Engineering", "Frontend Developer", "AI-Applications Enthusiast"];
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
var timeBetweenTexts = 1500;

displayDynamicTexts(textSpanCount);
console.log(finishedDisplaying);

setTimeout(() => {
    startButton.style.opacity = 1;
    startButton.style.zIndex = 1;
}, 6000);


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
                    elementCover.style.zIndex = -1;
                    entries[i].target.classList.add('animate');

                }, 1000);
                setTimeout(() => {
                    entries[i].target.style.animationPlayState = "paused";
                }, 3900);
            }
        }
    }, {threshold:1.0});
    
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

        initialiseIntersectionObserver();
        if(aboutOpacity == 1)
        {
            aboutBoxAll.forEach((aboutBox) =>{
                aboutBox.style.animationPlayState = "running";
                aboutBox.classList.remove('animate');
                aboutBox.style.opacity = 0;
            });
            aboutBoxCoverAll.forEach((aboutBoxCover) =>{
                aboutBoxCover.style.opacity = 1;
                aboutBoxCover.style.zIndex = 1;
            })
            console.log("over here!!!");
            aboutSection.style.opacity = 0;
            aboutSection.style.zIndex = -1;
        } else if(aboutOpacity == 0)
        {
            console.log("changing opacity");
            aboutSection.style.opacity = 1;
            aboutSection.style.zIndex = 1;
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
        if(opacity == 1)
        {
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

