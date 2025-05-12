

// //Control the About, Skills and Projects Sections
// sections = [document.querySelector('.sections .about__section'), document.querySelector('.sections .project__section'), document.querySelector('.sections .skills__section')];

// for(let i = 0; i < sections.length; i++)
// {
//     const rect = sections[i].getBoundingClientRect();
//     // console.log(rect);
//     // console.log(rect.left);
// }
// const translateAmount = 33.333;
// let translate = 0;
// let currentPage = "";


// function checkInViewport(rect){
//     // console.log(rect.left);
//     if(rect.left == 0){
//         return true;
//     }
//     return false;
// }
// function slide(sectionName)
// {
//     for(let i = 0; i < sections.length; i++)
//     {
//         const rect = sections[i].getBoundingClientRect();
//         // console.log(document.innerWidth);
//         if(checkInViewport(rect)){
//             // console.log(sections[i].id)
//             currentPage = sections[i].id;
//         }
//     }

//     if (sectionName === "about")
//     {
//         console.log(currentPage);
//         translate = (parseInt(currentPage) - 1) * translateAmount;
//         console.log("Go to About page", "translate" + translate);
//     }
//     if(sectionName === "projects"){
//         console.log(currentPage);
//         translate = (parseInt(currentPage) - 2) * translateAmount;
//         console.log("Go to projects page", "translate" + translate);
//     }
//     if(sectionName === "skills"){
//         console.log(currentPage);
//         translate = (parseInt(currentPage) - 3) * translateAmount;
//         console.log("Go to skills page", "translate" + translate);
//     }

//     document.querySelector('.sections').style.transform = `translateX(${translate}%)`;
// }

/*man

var delayMiliseconds2 = 400;
var delayMiliseconds3 = 200;
var i = 0;
const manSpan = document.querySelectorAll(".man span");
const man = document.querySelectorAll(".man");
// console.log(man);

function setManOpacity(){
    if(i < man.length)
    {
        const spans = man[i].getElementsByTagName('span');
        console.log(spans);
        if(spans)
        {
            spinSpans(spans, 0)
        }
        man[i].style.opacity = 1;
        i++;
        setTimeout(setManOpacity, delayMiliseconds2);
    }
}

function spinSpans(spans, j){
    if(j < spans.length)
    {
        spans[j].style.animationPlayState = "running";
        j++;
    }
    setTimeout(() => {
        spinSpans(spans, j);
    }, delayMiliseconds3);
}



var animationStepDelays = 2000;

*/


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
    if(step == text.length)
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
dynamicTexts = ["I am Aik Kiat, Computer Science Student","SUTD", "Software Engineering", "AI Computer Vision Enthusiast", "CyberSecurity Fan"];
const autotypeTextUl = document.querySelector(".dynamic__texts");
const heroTextCaret = "<span class='hero__caret' id='caret'></span>"; //caretElement

createHeroDescriptions(autotypeTextUl,dynamicTexts);
const rootElement = document.documentElement;

const dynamicTextsSpans = autotypeTextUl.querySelectorAll('li span');
console.log(dynamicTextsSpans);

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
var timeBetweenTexts = 3000;
displayDynamicTexts(textSpanCount);


//About me section
// const aboutMetextCaret = "<span class='about__me__caret' id='caret'></span>"; //caretElement
// const introText = document.getElementById("intro__text");
// // var introString = "";
// var i = 0;
// var text = "Hello! I am Thng Aik Kiat, currently a year 2 student at SUTD. I like to spend time coding projects in python, having picked it up since 2017. Apart from Python I have also acquired a great many other languages under my belt, such as Java, Javascript, CSS, HTML. All part and parcel of my eventful journey learning ever more, in the field of computer science";
// var typingSpeed = 50;

// typewriter(introText, text, aboutMetextCaret, typingSpeed, "", 0, false);



//pressing Start button, spawn the rest of the page

//get refernces to navigatio  button class
const navigationButtons = document.querySelectorAll(".navigation__button");

function start(){
    navigationButtons.forEach(element => {
        element.style.opacity = 1;
        const currentAnimState = window.getComputedStyle(element).animationPlayState;
        console.log(currentAnimState);
        if(currentAnimState == "paused")
        {
            element.style.animationPlayState = "running";
        }
    });
}

function toggle(sectionName){

    const searchSection = document.querySelector(".search__section");
    const heroContainer = document.querySelector(".hero");

    const heroOpacity = window.getComputedStyle(heroContainer).opacity;
    const searchOpacity = window.getComputedStyle(searchSection).opacity;
    
    if(heroOpacity == 1)
    {
        heroContainer.style.opacity =0;
    } else if(heroOpacity == 0)
    {
        heroContainer.style.opacity = 1;
    }
    if(searchOpacity == 1)
    {
        searchSection.style.opacity = 0;
    } else if(searchOpacity == 0)
    {
        searchSection.style.opacity = 1;
    }

    //show sections based off sectionName
    if(sectionName == "about"){
        console.log("over here");
        const aboutSection = document.querySelector(".about__section");
        const aboutOpacity = window.getComputedStyle(aboutSection).opacity;
        if(aboutOpacity == 1)
        {
            console.log("over here!!!");
            aboutSection.style.opacity = 0;
            aboutSection.style.zIndex = -1;
        } else if(aboutOpacity == 0)
        {
            console.log("changing opacity");
            aboutSection.style.opacity = 1;
            aboutSection.style.zIndex = 1;
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