/*
IDEAS
  -play a sound when the monster is defeated -> could extend to everything 
  
*/

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["butterKnife"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "butterKnife",
    power: 30
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "spikedMace",
    power: 50
  },
  {
    name: "longSword",
    power: 100
  }
];

const monsters = [
  {
    name: "Anis",
    level: 2,
    health: 15
  },
  {
    name: "Swimsuit Anis",
    level: 8,
    health: 60
  },
  {
    name: "angryAnis",
    level: 20,
    health: 300
  }
]

const locations = [
  {
    name: "Town Square",
    "Button Text": ["Go to STORE", "Go to CAVE", "Fight angryAnis"],
    "Button Functions": [goToStore, goToCave, fightAngryAnis],
    text: "You find yourself in the town square. Where would you like to go?"
  },
  {
    name: "store",
    "Button Text": ["Buy 10 HEALTH? [10 GOLD]", "Buy WEAPON? [30 GOLD]", "Return to TOWN SQUARE"],
    "Button Functions": [buyHealth, buyWeapon, returnToTownSquare],
    text: "Welcome to the store! How can I be of service today?"
  },
  {
    name: "cave",
    "Button Text": ["Fight ANIS", "Fight SUMMER SWIMSUIT ANIS", "return to TOWN SQUARE"],
    "Button Functions": [fightAnis, fightSwimsuitAnis, returnToTownSquare],
    text: "You chose to venture into the dark depths of the cave...you spot some monsters"
  },
  {
    name: "fight",
    "Button Text": ["Attack", "Dodge", "Run"],
  "Button Functions": [attack, dodge, returnToTownSquare],
  text: "You are fighting a monster"
  },
  {
    name: "monsterDefeated",
    "Button Text": ["Return to TOWN SQUARE", "<----", "<----"],
    "Button Functions": [returnToTownSquare, returnToTownSquare, easterEgg],
    text: "You successfully defeated the monster!!"
  },
  {
    name:"you'reDefeated",
    "Button Text": ["Play Again?", "<----",  "<----"],
    "Button Functions": [restart, restart, restart],
    text: "The monster delivers the final blow...will you play again?"
  },
  {
    name:"endGame",
    "Button Text": ["Another Round?", "Another Round?", "Another Round?"],
    "Button Functions": [restart, restart, restart],
    text: "Your revel in victory as the final boss lies dead before you. Congratulations!"
  },
  {
    name: "easterEgg",
    "Button Text": ["2", "8", "return to TOWN SQUARE"],
    "Button Functions": [pick2, pick8, returnToTownSquare],
    text: "You found the easteregg! Choose one of the numbers above. If your chosen number matches a randomly chosen number between 0 and 10, you will win the game!!!"
  }
]

// initialise buttons
button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightAngryAnis;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["Button Text"][0];
  button2.innerText = location["Button Text"][1];
  button3.innerText = location["Button Text"][2];
  button1.onclick = location["Button Functions"][0];
  button2.onclick = location["Button Functions"][1];
  button3.onclick = location["Button Functions"][2];
  text.innerText = location.text;
}

function returnToTownSquare() {
  update(locations[0]);
}

function goToStore() {
  update(locations[1]);
}

function goToCave() {
 update(locations[2]);
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1){
    if (gold >= 30){
      gold -= 30
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Here is your '" + newWeapon + "'\n" + " Thank you for your business.";
      inventory.push(newWeapon)
      text.innerText += "\n" + " Your inventory now contains: " + inventory;
    }
    else {
      text.innerText = "\n" + "your schmeckles are insufficient"
    }
  }
  else{
    text.innerText = "\n" + "It appears you already behold my finest weaponary!"
    button2.innerText = "Would you like to sell a weapon back to me? [15 GOLD]"
    button2.onclick = sellWeapon;
  }
}

function buyHealth() {
  if (gold >= 10){
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "your schmeckles are insufficient";
  }
  
}

function sellWeapon(){
  if (inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Say goodbye to " + currentWeapon + " . Here is your Gold.";
    text.innerText += " Your inventory now contains: " + inventory;
  }
  else{
    text.innerText = " I can't buy this. How will you fend for yourself if you sell your only weapon!"
  }
}

function fightAnis() {
  fighting = 0;
  goFight();
}

function fightSwimsuitAnis() {
  fighting = 1;
  goFight();
}

function fightAngryAnis() {
  fighting = 2;
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterName = monsters[fighting].name;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsterName;
  monsterHealthText.innerText = monsterHealth;
  
}

function attack(){
  monsterName = monsters[fighting].name
  text.innerText += "\n" + "The wild " + monsterName + " attacked you!";
  text.innerText += "\n" + "You striked the wild " + monsterName + " with your " + weapons[currentWeapon].name + "!";
  if (attackSuccessful()){
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else {
    text.innerText += " The monster read your move and dodged...";
  }
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0){
    lose();
  }
  else if (monsterHealth <= 0){
    fighting === 2 ? winGame() : win(); //one line if else statement
  }

  if (Math.random() <= .1 && inventory.length != 1){
    text.innerText += "\n" + "Your " + inventory.pop() + " shattered rendering it useless. You discard the weapon";
    currentWeapon--;
  }
}

function dodge(){
  text.innerText += "\n" + "You predicted the wild " + monsters[fighting].name + " attack and dodged accordingly";
} 

function lose(){
  update(locations[5]);
}

function win(){
  gold += Math.floor(monsters[fighting].level * 6.9);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function winGame(){
  update(locations[6]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["butterKnife"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  returnToTownSquare();
}

function getMonsterAttackValue(monsterLevel){
  let attackPower = (monsterLevel * 5) - (Math.floor(Math.random() * xp));
  return attackPower;
}

function attackSuccessful(){
  return Math.random() > .20 || health < 20;
}

function easterEgg(){
  update(locations[7]);
}

function pick2(){
  pick(2);
}

function pick8(){
  pick(8);
}

function pick(number){
  let numbers = [];
  while (numbers.length < 10){
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Your chosen number was " + number + ". Here are the randomised numbers:\n";

  for (let i = 0; i <= 10; i++){
      text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(number) !== -1){
    text.innerText += "YOU ARE RIGHT! [GAIN 30 GOLD]";
    gold+=30;
    goldText.innerText = gold;
  }
  else {
    text.innerText += "Incorrect";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0){
      text.innerText += "a trap door opens and you fall to your death";
      lose();
    }
    else{
      text.innerText += "an evil entity appears and punishes you for guessing wrong [LOSE 10 HEALTH]";
    }
  }
  
}
