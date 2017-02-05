// //------------------------------------------------------
// // SOLDIER
// //------------------------------------------------------
// function Soldier() {}
//
// //------------------------------------------------------
// // GENERAL
// //------------------------------------------------------
// function General() {}
//
// //------------------------------------------------------
// // FOOTVIKING
// //------------------------------------------------------
// function FootViking() {}
//
// module.exports = {
//   Soldier:    Soldier,
//   General:    General,
//   FootViking: FootViking
// };


function getRandomIndex (array) {
  var randomNumber = Math.random() * array.length;
  return Math.floor(randomNumber);
}



function Soldier (healthParams, strengthParams) {
  this.health = healthParams;
  this.strength = strengthParams;
}

Soldier.prototype.attack = function () {
  return this.strength;
};

Soldier.prototype.receiveDamage = function (damage) {
  this.health -= damage;
};



function Viking (nameParam, healthParam, strengthParam) {
  Soldier.call(this, healthParam, strengthParam);
  this.name = nameParam;
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
  this.health -= damage;

  if (this.health <= 0) {
    return this.name + ' has died in act of combat';
  }

  return this.name + ' has received ' + damage + ' points of damage';
};

Viking.prototype.battleCry = function () {
  return 'Odin Owns You All!';
};



function Saxon (healthParam, strengthParam) {
  Soldier.call(this, healthParam, strengthParam);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
  this.health -= damage;

  if (this.health <= 0) {
    return 'A Saxon has died in combat';
  }

  return 'A Saxon has received ' + damage + ' points of damage';
};



function War () {
  this.vikingsArmy = [];
  this.saxonsArmy = [];
}

War.prototype.addViking = function (theViking) {
  this.vikingsArmy.push(theViking);
};

War.prototype.addSaxon = function (theSaxon) {
  this.saxonsArmy.push(theSaxon);
};

War.prototype.vikingAttack = function () {
  var vikI = getRandomIndex(this.vikingsArmy);
  var saxI = getRandomIndex(this.saxonsArmy);
  var theViking = this.vikingsArmy[vikI];
  var theSaxon = this.saxonsArmy[saxI];

  var result = theSaxon.receiveDamage(theViking.attack());

  if (theSaxon.health <= 0) {
    this.saxonsArmy.splice(saxI, 1);
  }

  return result;
};

War.prototype.saxonAttack = function () {
  var vikI = getRandomIndex(this.vikingsArmy);
  var saxI = getRandomIndex(this.saxonsArmy);
  var theViking = this.vikingsArmy[vikI];
  var theSaxon = this.saxonsArmy[saxI];

  var result = theViking.receiveDamage(theSaxon.attack());

  if (theViking.health <= 0) {
    this.vikingsArmy.splice(vikI, 1);
  }

  return result;
};

War.prototype.fight = function () {
  this.saxonAttack();
  this.vikingAttack();
};

War.prototype.showStats = function () {
  return 'Vikings have won the war of the century!';
};



module.exports = {
  Soldier: Soldier,
  Viking:  Viking,
  Saxon:   Saxon,
  War:     War
};
