class Answer{
    constructor(_text,_correctAnswer=false){
        this.text=_text;
        this.correctAnswer=_correctAnswer;
    }
    getAnswer(){
        return this.text;
    }
    isCorrectAnswer(){
        return this.correctAnswer;
    }
}
class Quistion{
    constructor(_text,..._answers){
        this.text=_text;
        this.answers=_answers;
    }
    getQuistion(){
        return this.text
    }
    getAnswers(){
        return this.answers;
    }
    getCorrectAnswer(){
        for(var i=0; i<this.answers.length; i++){
            if(this.answers[i].isCorrectAnswer()){
                return this.answers[i];
            }
        }

    }
}

var hQuestion= document.querySelector("form h3");
var choices = document.getElementsByTagName("label");
var choicesRadios= document.querySelectorAll(`input[type="radio"]`);
var timerMinutes = document.querySelector("#timer h4 span:first-of-type");
var timerSeconds = document.querySelector("#timer h4 span:last-of-type");
var previousbtn =document.getElementById("previous");
var nextbtn =document.getElementById("next");
var currentQuestion =document.getElementById("qNumber");
var markbtn =document.getElementById("mark-btn");
var indicator =document.querySelector("#indicator div");
var markList =document.getElementById("mark-list");

var quistionsArray=[];
var answersCorrection=[];
var chosenAnswers=[];


createQuistions(quistionsArray);
quistionsArray.length<10?timerMinutes.innerHTML="0"+quistionsArray.length:timerMinutes.innerHTML=quistionsArray.length; 
setInterval(timerFunction, 1000);
createAnswersCorrection(answersCorrection);
shuffleQuistions(quistionsArray);
showCurrentQuestion(Number(currentQuestion.innerHTML));
setIndecator(currentQuestion.innerHTML);




function timerFunction(){
    if(Number(timerSeconds.innerHTML)!=0){
        if(Number(timerSeconds.innerHTML)<=10){
            timerSeconds.innerHTML="0"+(Number(timerSeconds.innerHTML)-1);
        }
        else{
            timerSeconds.innerHTML=Number(timerSeconds.innerHTML)-1;
        }
    }
    else if(Number(timerSeconds.innerHTML)==0 && Number(timerMinutes.innerHTML)!=0){
        if(Number(timerMinutes.innerHTML)<=10){
            timerMinutes.innerHTML="0"+(Number(timerMinutes.innerHTML)-1);
        }
        else{
            timerMinutes.innerHTML=Number(timerMinutes.innerHTML)-1;
        }
        
        timerSeconds.innerHTML=59;
    }
    else if(Number(timerSeconds.innerHTML)==0 && Number(timerMinutes.innerHTML)==0){
        var grade= clculateGrade();
        localStorage.setItem("grade", grade);
        location.replace("timeOut.html");
    }
}



function createQuistions(quistionsArray){
    quistionsArray.push(new Quistion("Inside which HTML element do we put the JavaScript?",new Answer("&lt;script&gt;",true), new Answer("&lt;js&gt;"), new Answer("&lt;javascript&gt;"), new Answer("&lt;Jscript&gt;")));
    quistionsArray.push(new Quistion(`Where is the correct place to insert a JavaScript?`,new Answer("&lt;body&gt;"), new Answer("&lt;head&gt;"), new Answer("both &lt;body&gt; and &lt;head&gt;",true), new Answer("none")));
    quistionsArray.push(new Quistion(`What is the correct syntax for referring to an external script called "xxx.js"?`,new Answer(`&lt;script src="xxx.js"&gt;`,true), new Answer(`&lt;script href="xxx.js"&gt;`), new Answer(`&lt;script name="xxx.js"&gt;`), new Answer(`&lt;script id="xxx.js"&gt;`)));
    quistionsArray.push(new Quistion(`How to write an IF statement in JavaScript??`,new Answer("if(i==5)",true), new Answer("if(i==5) then"), new Answer("if i=5"), new Answer("if i=5 then")));
    quistionsArray.push(new Quistion(`How can you add a comment in a JavaScript?`,new Answer("//",true), new Answer("&lt;!-- --&gt;"), new Answer("'"), new Answer("none")));
}
function shuffleQuistions(array){
    for (var i=array.length-1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createAnswersCorrection(answersCorrection){
    for(var i=0 ; i<quistionsArray.length; i++){
        answersCorrection.push(false);
    }
}

function showCurrentQuestion(number){
    if(Number(number)==1){
        previousbtn.style.visibility="hidden";
    }
    else{
        previousbtn.style.visibility="visible";
    }
    if((Number(number)==quistionsArray.length)){
        nextbtn.style.visibility="hidden"
    }
    else{
        nextbtn.style.visibility="visible"
    }

    hQuestion.innerHTML=quistionsArray[number-1].getQuistion();
    var answers=quistionsArray[number-1].getAnswers();
    for(var i=0 ; i<choices.length ;i++){
        choices[i].innerHTML=answers[i].getAnswer();
    }
    currentQuestion.innerHTML=number;
    setIndecator(number);
    isMarked(number);
    checkChosen(Number(number)-1);
}

function nextQuestion(){
    currentQuestion.innerHTML=Number(currentQuestion.innerHTML)+1;
    showCurrentQuestion(currentQuestion.innerHTML);
}
function preQuestion(){
    currentQuestion.innerHTML=Number(currentQuestion.innerHTML)-1;
    showCurrentQuestion(currentQuestion.innerHTML);

}

function setIndecator(num){
    indicator.style.width=(Number(num)/(quistionsArray.length))*100+"%";
}


function shuffleMark(){
    if(isMarked(currentQuestion.innerHTML)){
        unMark(currentQuestion.innerHTML);       
    }
    else{
        mark(currentQuestion.innerHTML);
    }    
}

function isMarked(num){
    var marked= document.querySelectorAll("#mark-list button");
    for(var i=0 ; i<marked.length; i++){
        if(marked[i].innerHTML=="question"+num){
            markbtn.innerHTML="unmark"
            return true;               
        }
    }
    markbtn.innerHTML="mark"
    return false;
    
}
function unMark(num){
    var marked= document.querySelectorAll("#mark-list button");
    for(var i=0 ; i<marked.length; i++){
        if(marked[i].innerHTML=="question"+num){
            marked[i].remove();               
        }
    }
    markbtn.innerHTML="mark";
}
function mark(num){
        var button=document.createElement("button");
        button.innerHTML="question"+num;
        markList.appendChild(button);
        button.addEventListener("click",function(){showCurrentQuestion(num)});

        markbtn.innerHTML="unmark";
}

function check(choice){
    var radio=choice.firstElementChild.nextElementSibling;
    var label=choice.firstElementChild;
    clearChoice();
    radio.checked="true";
    choice.style.borderWidth="3px";
    var correctAnswer= quistionsArray[(currentQuestion.innerHTML)-1].getCorrectAnswer().getAnswer();
    if(label.innerHTML==correctAnswer){
        answersCorrection[(currentQuestion.innerHTML)-1]=true;
    }
    chosenAnswers[(currentQuestion.innerHTML)-1]=label.innerHTML;
}

function clearChoice(){
    for(var i=0; i<choices.length; i++ ){
        choices[i].parentElement.style.borderWidth="1px";
        choicesRadios[i].checked=false;
    }

}

function checkChosen(num){
    if(chosenAnswers[num]){
        for(var i=0; i<choices.length; i++){
            if(choices[i].innerHTML==chosenAnswers[num]){
                check(choices[i].parentElement);
            }
        }        
    }
    else{
        clearChoice();
    }
}

function clculateGrade(){
    var grade=0;
    for(var i=0; i<answersCorrection.length; i++){
        if(answersCorrection[i]){
            grade++;
        }
    }
    return (grade/(quistionsArray.length)*100)+"%";
}

function gotoGrade(){
    var grade= clculateGrade();
    localStorage.setItem("grade", grade);
    location.replace("grade.html");
}