let life = 3;
let pointCount = 0;
let pointLabel = document.querySelector("#count_number");

let time = 25;

let gameTime;

let dog_1 = document.querySelector("#goldenpupper_container");
let dog_2 = document.querySelector("#sausagepup_container");
let dog_3 = document.querySelector("#corgo_container");

let dog_4 = document.querySelector("#bonusboi_container");

let dog_4_displayed = false;

let cat_1 = document.querySelector("#chunkboi_1_container");
let cat_2 = document.querySelector("#chunkboi_2_container");
let cat_3 = document.querySelector("#chonker_container");

let start = document.querySelector("#start");
let startButton1 = document.querySelector("#start_button1");
let settingsButton = document.querySelector("#settings_button");

let introduction = document.querySelector("#introduction");
let introductionBackground = document.querySelector("#introduction_background");
let sign = document.querySelector("#sign_container");
let startButton2 = document.querySelector("#start_button2");

let gameOverScreen = document.querySelector("#game_over");
let gameOverBackground = document.querySelector("#game_over_background");
let gameOverSign = document.querySelector("#bad_sign");
let hospital = document.querySelector ("#hospital");
let gameOverAlice = document.querySelector("#bad_alice");
let gameOverMenu = document.querySelector ("#menu_button_1");
let gameOverRestart = document.querySelector ("#try_again_button");


window.addEventListener("load", startScreen);

function startScreen (){

    start.style.display = "block";
    startButton1.style.display = "block";
    settingsButton.style.display = "block";

    document.querySelector("#alice_start").classList.add("start_jump");
    document.querySelector("#doggo_start").classList.add("start_jump");

    startButton1.classList.add("pulse");
    settingsButton.classList.add("pulse");

    startButton1.addEventListener("click", clickStart);


    }

function clickStart () {

    settingsButton.style.display = "none";

    document.querySelector("#alice_start").classList.remove("start_jump");
    document.querySelector("#doggo_start").classList.remove("start_jump");
    startButton1.classList.remove("pulse");
    settingsButton.classList.remove("pulse");


    startButton1.classList.add("click_button");

    start.classList.add("fadeout");


    start.addEventListener("animationend", intro);

}

function intro () {

    start.style.display = "none";
    startButton1.style.display = "none";

    startButton1.classList.remove("click_button");
    start.classList.remove("fadeout");

    introduction.style.display = "block";

    introductionBackground.classList.add ("fadein");

    sign.classList.add("fall_in");

    sign.addEventListener("animationend", ()=>{startButton2.style.display = "block"; startButton2.classList.add("pulse");});

    startButton2.addEventListener("click", clickStartGame);

}

function clickStartGame () {

    introductionBackground.classList.remove("fadein");
    sign.classList.remove("fall_in");
    startButton2.classList.remove("pulse");

    startButton2.classList.add("click_button");

    introduction.classList.add("fadeout");

    introduction.addEventListener("animationend", almostStartGame);
}

function almostStartGame () {

    introduction.style.display = "none";
    startButton2.style.display = "none";
    introduction.classList.remove("fadeout");
    startButton2.classList.remove("click_button");

    setTimeout(startGame,1000);
}

function startGame() {


    life = 3;
    pointCount = 0;

    time = 25;

    document.querySelector("#time_count").innerHTML = ""+ time +" sec left";

    document.querySelector("#heart").classList.add("spinner");
    document.querySelector("#time_glass").classList.add("timer");

    dog_4.classList.add("bonusboi")

    gameTime =  setInterval(timer,1000);

    dog_1.addEventListener("click", clickDog);
    dog_2.addEventListener("click", clickDog);
    dog_3.addEventListener("click", clickDog);

    dog_4.addEventListener("click", clickBonusDog);

    cat_1.addEventListener("click", clickCat);
    cat_2.addEventListener("click", clickCat);
    cat_3.addEventListener("click", clickCat);

    resetAnimation (dog_1);
    resetAnimation (dog_2);
    resetAnimation (dog_3);

    resetAnimation (cat_1);
    resetAnimation (cat_2);
    resetAnimation (cat_3);

}

function timer () {

    time --;

    if (time < 0) {
        addClassToAllCats("freeze");
        addClassToAllDogs("freeze");
        document.querySelector("#heart").classList.add("freeze");
        document.querySelector("#time_glass").classList.add("freeze");

        if(life>0 && pointCount >=7) {
            levelComplete()
        }

        else{
            gameOver();
        }
    }

    else{

        document.querySelector("#time_count").innerHTML = ""+ time +" sec left";
        let specialBonus = Math.random();

        if (specialBonus < 0.3 && dog_4_displayed==false) {
        dog_4_displayed = true;
        dog_4.style.display = "block";
        dog_4.addEventListener("animationend",()=>{ dog_4.classList.add("freeze"); dog_4.style.display = "none";});
    }

    }
}

function clickBonusDog() {

    if(life<3){
        life++;

        document.querySelector("#life_bar_" +life).classList.add("life_up");
        document.querySelector("#alice_health_"+life).classList.add("spin_in");
    }

};

function addClassToAllDogs (classToAdd) {

    dog_1.classList.add (classToAdd);
    dog_2.classList.add (classToAdd);
    dog_3.classList.add (classToAdd);

}

function addClassToAllCats (classToAdd) {

    cat_1.classList.add (classToAdd);
    cat_2.classList.add (classToAdd);
    cat_3.classList.add (classToAdd);

}

function clickDog (event) {
    this.style.left = ""+event.clientX+"px";
    this.style.top = ""+event.clientY+"px";

   // this.classList.add("freeze");

    this.classList.remove("position_1");
    this.classList.remove("position_2");
    this.classList.remove("position_3");
    this.classList.remove("position_4");
    this.classList.remove("position_5");
    this.classList.remove("position_6");

    this.classList.remove("runToLeft");
    this.classList.remove("runToRight");

    this.classList.add ("bye_doggo");


    pointCount++;

    pointLabel.innerHTML = ""+ pointCount +"/7"

    setTimeout(resetAnimation,2500,this);


}


function clickCat () {

    this.style.left = ""+event.clientX+"px";
    this.style.top = ""+event.clientY+"px";


    this.classList.remove("position_1");
    this.classList.remove("position_2");
    this.classList.remove("position_3");
    this.classList.remove("position_4");
    this.classList.remove("position_5");
    this.classList.remove("position_6");

    this.classList.remove("runToLeft");
    this.classList.remove("runToRight");

    this.classList.add ("be_gone_cat");


    document.querySelector("#life_bar_" +life).classList.add("life_down");
    document.querySelector("#alice_health_"+life).classList.add("spin_out");

    life--;

    if (life == 0) {
        gameOver()
    }

    else {

         setTimeout(resetAnimation,2500,this);

    }

}

function resetAnimation(element) {

    console.log(element);

    element.removeAttribute("style");

    element.classList.remove("bye_doggo");

    element.classList.remove("be_gone_cat");

    let newPosition = Math.floor(Math.random()*Math.floor(6))+1;

    element.classList.add("position_"+newPosition);

    if (newPosition <= 3){
        element.classList.add("runToLeft");
    }
    else{
        element.classList.add("runToRight");
    }


}

function gameOver (){

    clearInterval(gameTime);

    addClassToAllCats("freeze");
    addClassToAllDogs("freeze");
    dog_4.classList.add("freeze");

    document.querySelector("#heart").classList.add("freeze");
    document.querySelector("#time_glass").classList.add("freeze");

    gameOverScreen.style.display = "block";
    gameOverAlice.style.display ="none";
    gameOverBackground.classList.add("fade_in");
    gameOverSign.classList.add("fall_in");
    hospital.classList.add("fall_in");


    gameOverSign.addEventListener("animationend", ()=>{

        gameOverMenu.style.display = "block"; gameOverRestart.style.display = "block"; gameOverAlice.style.display = "block"; gameOverMenu.classList.add("game_over_pulse"); gameOverRestart.classList.add("game_over_pulse"); gameOverAlice.classList.add("pulse");

        });

    gameOverMenu.addEventListener("click", restartToStartScreen);

    gameOverRestart.addEventListener("click", restartToIntro);


};

function levelComplete (){


};

function restartToStartScreen () {

    gameOverScreen.style.display ="none";
    gameOverMenu.style.display ="none";
    gameOverRestart.style.display ="none";

    removeClassFromAllGameElements ("freeze");
    removeClassFromAllGameElements ("runToRight");
    removeClassFromAllGameElements ("runToLeft");
    removeClassFromAllGameElements ("bonusboi");

    for(let i=1;i<7; i++){

        removeClassFromAllGameElements("position_"+i);
    }


    document.querySelector("#heart").classList.remove("freeze");
    document.querySelector("#time_glass").classList.remove("freeze");
    gameOverMenu.classList.remove("game_over_pulse");
    gameOverRestart.classList.remove("game_over_pulse");
    gameOverBackground.classList.remove("fade_in");
    gameOverSign.classList.remove("fall_in");
    hospital.classList.remove("fall_in");
    gameOverAlice.classList.remove("pulse");

    for(let i=1; i<4; i++){
        document.querySelector("life_bar_"+i).classList.remove("life_down");
        document.querySelector("life_bar_"+i).classList.remove("life_up");
        document.querySelector("alice_health_"+i).classList.remove("spin_out");
        document.querySelector("alice_health_"+i).classList.remove("spin_in");
    }



    startScreen ();
}

function removeClassFromAllGameElements (classToRemove) {

    dog_1.classList.remove(classToRemove);
    dog_2.classList.remove(classToRemove);
    dog_3.classList.remove(classToRemove);
    dog_4.classList.remove(classToRemove);

    cat_1.classList.remove(classToRemove);
    cat_2.classList.remove(classToRemove);
    cat_3.classList.remove(classToRemove);



}
