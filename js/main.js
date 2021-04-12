//BUTTON VALUES
const ATTACK_VALUE = 10;
const HEAVY_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

//PLAYER TO CHOOSE LIFE, 1X BONUS LIFE
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

// RESET
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// END-ROUND FUNCTION
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("you would be dead but bonus life saved you");
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("you won!");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("you lost");
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("it's a draw");
    }

    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

// ATTACKING & HEALING MODES
function attackMonster (mode) {
    let maxDamage;
    if(mode === "Attack") {
        maxDamage = ATTACK_VALUE;
    } else if(mode === "Heavy Attack") {
        maxDamage = HEAVY_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster("Attack");
}
function heavyAttackHandler () {
    attackMonster("Heavy Attack");
}
function healPlayerHandler () {
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("you can't heal more than your max health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}



// BUTTON EVENTS
attackBtn.addEventListener('click', attackHandler);
heavyAttackBtn.addEventListener('click', heavyAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);