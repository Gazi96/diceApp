"use strict";

class Dice{
    constructor(amount){
        this.amount = amount;
    }
    
    random(){
        this.amount = Math.floor(Math.random() * 6) + 1; 
    }
}

class DiceArray{
    constructor(){
        this.array = [];
    }
    addDice(Dice){
        this.array.push(Dice);
    }
    sumValue(){
        let sum = 0;
        
        for(let i = 0; i < this.array.length; i++){
            sum += this.array[i].amount;    
        }
        
        return sum;
    }
    checkSum(value){
        const sumOfDice = this.sumValue();
        
        if(value == sumOfDice){
            return true;
        }
        else{
            return false;
        }
    }
}

startApp();

function startApp(){
    const DiceObject1 = new Dice();
    const DiceArray1 = new DiceArray();
    
    addEventListenerOnMenu();
}

function addEventListenerOnMenu(){
    const menuItem = document.getElementsByClassName("menu__item");
    const diceContainer = document.getElementsByClassName("main__container")[0];
    const menu = document.getElementsByClassName("main__menu")[0];
    
    for(let i = 0; i < menuItem.length; i++){
        menuItem[i].addEventListener("click", () => {
            hideElement(menu);
            showElement(diceContainer);
            createDiceElements(i);
            addEventListenerStartButton(i);
            addPoints();
        });
    }
}

function addPoints(){
    const points = document.getElementsByClassName("header__points")[0];
    
    points.textContent = 0;
}

function createDiceElements(amountOfDice){
    const diceContainer = document.getElementsByClassName("main__container")[0]; 
    diceContainer.classList += ` main__container--${amountOfDice + 1}`;
    
    for(let i = 0; i < amountOfDice + 1; i++){
        const dice = document.createElement("div");
        dice.classList = "dice";
        diceContainer.appendChild(dice);
    }
}

function hideElement(element){      
    if(!element.classList.contains("hidden")){
        element.classList.add("hidden");
    }
}

function showElement(element){
    if(element.classList.contains("hidden")){
        element.classList.remove("hidden");
    }
}

function addEventListenerStartButton(i){
    const startButton = document.getElementsByClassName("main__start")[0];
    
    startButton.addEventListener("click", () => {
        hideElement(startButton);
        createDice(i); 
    });
}

function createDice(amountOfDice){
    const arrayOfDice = new DiceArray();
    
    for(let i = 0; i <= amountOfDice; i++){
        arrayOfDice.addDice(new Dice());
    }
    
    generateRandomNumber(arrayOfDice);
}

function generateRandomNumber(arrayOfDice){    
    for(let i = 0; i < arrayOfDice.array.length; i++){
        arrayOfDice.array[i].random();
    }
    
    iterationDiceElements(arrayOfDice);
}

function iterationDiceElements(arrayOfDice){
    const diceContainer = document.getElementsByClassName("main__container")[0];
    const diceElements = diceContainer.getElementsByClassName("dice");
    
    for(let i = 0; i < diceElements.length; i++){
        
        createDotsElements(arrayOfDice, diceElements, i);
    }
    
    setSpeedVolume(diceElements, arrayOfDice);
}

function createDotsElements(arrayOfDice, diceElements, iteration){
    const amountOfDots = arrayOfDice.array[iteration].amount
    
    for(let j = 0; j < amountOfDots; j++){
        const dotElement = document.createElement("div");
        dotElement.classList = "dot";
        
        diceElements[iteration].appendChild(dotElement);
        diceElements[iteration].classList = `dice dice--${amountOfDots}`;
    }
}

function setSpeedVolume(diceElements, arrayOfDice){
    const speedVolume = document.getElementsByClassName("box__input--range")[0].value;
    
    const speed = setTimeout(() => {
        hideDotsElements(diceElements, arrayOfDice);
    }, speedVolume * 1000);
}

function hideDotsElements(diceElements, arrayOfDice){
    const mainForm = document.getElementsByClassName("main__form")[0];
    
    for(let i = 0; i < diceElements.length; i++){
        diceElements[i].textContent = "";
    }
    
    addFormElements(mainForm);
    addEventListenerFormButton(arrayOfDice, mainForm);
}

function addEventListenerFormButton(arrayOfDice, mainForm){  
    const formButton = mainForm.getElementsByClassName("form__button")[0];
    showElement(mainForm);
    
    formButton.addEventListener("click", () => {
        checkInputValue(mainForm, arrayOfDice, formButton);
    });
}

function addFormElements(mainForm){
    const formInput = document.createElement("input");
    const formButton = document.createElement("button");
    
    formInput.classList = "form__input";
    formButton.classList = "form__button";
    formButton.textContent = "CHECK";
    
    mainForm.appendChild(formInput);
    mainForm.appendChild(formButton);
}

function checkInputValue(mainForm, arrayOfDice, formButton){
    const inputValue = mainForm.getElementsByClassName("form__input")[0].value;
    const points = document.getElementsByClassName("header__points")[0];
    formButton.textContent = arrayOfDice.sumValue();
    
    if(arrayOfDice.checkSum(inputValue)){
        points.textContent = parseInt(points.textContent) + 1;
    }
    
    setTimeout(() => {
        nextTurn(arrayOfDice, inputValue, formButton);
    }, 1000);
}

function nextTurn(arrayOfDice, inputValue, formButton){
    const mainForm = document.getElementsByClassName("main__form")[0];
        
    mainForm.textContent = "";
    hideElement(mainForm);
    generateRandomNumber(arrayOfDice);
}
