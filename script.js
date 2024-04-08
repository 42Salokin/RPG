const hHP = document.querySelector('#hHP')
const hAC = document.querySelector('#hAC')
const hLvl = document.querySelector('#hLvl')
const hExp = document.querySelector('#hExp')
const hGold = document.querySelector('#hGold')
const mHP = document.querySelector('#mHP')
const hAnnounce = document.querySelector('#hAnnounce')
const mAnnounce = document.querySelector('#mAnnounce')

const hero = {
    HP: 10,
    AC: 12,
    Level: 1,
    Exp: 0,
    Gold: 10,
}
let heroHP = hero.HP
let heroAC = hero.AC
let heroLevel = hero.Level
let heroExp = hero.Exp
let heroGold = hero.Gold
hHP.textContent = heroHP
hAC.textContent = heroAC
hLvl.textContent = heroLevel
hExp.textContent = heroExp
hGold.textContent = heroGold
let heroDamage = [1, 2, 3, 4, 5, 6, 7, 8]

const mob = {
    HP: 8,
    AC: 10,
}
let mobHP = mob.HP
let mobAC = mob.AC
mHP.textContent = mobHP
let mobDamage = [1, 2, 3, 4, 5, 6]


function heroAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = (attempt + 1);
    console.log(`Hero attacks with ${attempt} vs creature's AC of ${mobAC}`);
    mAnnounce.textContent = ""
    hAnnounce.textContent = "Hero attacks..."
    if (attempt >= mobAC && attempt < 20) {
        setTimeout(heroHits, 1500)
    } else if (attempt == 20) {
        setTimeout(heroCrit, 1500)       
    } else {
        setTimeout(heroMiss, 1500)
    }
}

function heroHits() {
    console.log("It hits!");
    hAnnounce.textContent = "It hits!";
    setTimeout(heroDeals, 1000);
}

function heroCrit() {
    console.log("Critical hit!");
    hAnnounce.textContent = "Critical hit!";
    setTimeout(heroCritDeals, 1000);
}

function heroMiss() {
    console.log("It misses");
    hAnnounce.textContent = "It misses"
    setTimeout(mobAttack, 2500)
}

function heroDeals() {
    let damage = Math.floor(Math.random() * (heroDamage.length));
    damage = (damage + 1);
    console.log(`And deals ${damage} damage`);
    hAnnounce.textContent = '';
    mAnnounce.textContent = `And deals ${damage} damage`;
    mobHP = (mobHP-damage);
    mHP.textContent = mobHP;
    if (mobHP <= 0) {  
        setTimeout(mobDeath, 2500);
     } else {
        setTimeout(mobUpdate, 1500);
     }
}

function heroCritDeals() {
    let damage = Math.floor(Math.random() * (heroDamage.length));
    damage = ((damage + 1) * 2);
    console.log(`And deals ${damage} damage`);
    hAnnounce.textContent = '';
    mAnnounce.textContent = `And deals ${damage} damage`;
    mobHP = (mobHP-damage)
    mHP.textContent = mobHP
    if (mobHP <= 0) {  
        setTimeout(mobDeath, 2500);
     } else {
        setTimeout(mobUpdate, 1500);
     }
}

function mobDeath() {
    console.log(`Hero kills the creature!`);
    mAnnounce.textContent = "";
    hAnnounce.textContent = "Hero kills the creature!";
    setTimeout(mobRefresh, 3000);
}

function mobRefresh() {
    mobHP = mob.HP
    console.log(`A new foe appears! Hero has ${heroHP} HP`);
    hAnnounce.textContent = "";
    mAnnounce.textContent = `A new foe appears! Hero has ${heroHP} HP`
    mHP.textContent = mobHP
}

function mobUpdate() {
    console.log(`Creature is down to ${mobHP} HP`);
    mAnnounce.textContent = `Creature is down to ${mobHP} HP`
    setTimeout(mobAttack, 3000)
}

function mobAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = (attempt + 1);
    console.log(`Creature attacks with ${attempt} vs hero's AC of ${heroAC}`);
    hAnnounce.textContent = ""
    mAnnounce.textContent = "Creature attacks..."
    if (attempt >= heroAC && attempt < 20) {
        setTimeout(mobHits, 1500)
    } else if (attempt == 20) {
        setTimeout(mobCrit, 1500)       
    } else {
        setTimeout(mobMiss, 1500)
    }
}

function mobHits() {
    console.log("It hits!");
    mAnnounce.textContent = "It hits!";
    setTimeout(mobDeals, 1000);
}

function mobCrit() {
    console.log("Critical hit!");
    mAnnounce.textContent = "Critical hit!";
    setTimeout(mobCritDeals, 1000);
}

function mobMiss() {
    console.log("It misses");
    mAnnounce.textContent = "It misses"
}

function mobDeals() {
    let damage = Math.floor(Math.random() * (mobDamage.length));
    damage = (damage + 1);
    console.log(`And deals ${damage} damage`);
    mAnnounce.textContent = '';
    hAnnounce.textContent = `And deals ${damage} damage`;
    heroHP = (heroHP-damage);
    hHP.textContent = heroHP;
    if (heroHP <= 0) {  
        setTimeout(heroDeath, 1500);
     } else {
        setTimeout(heroUpdate, 1500)
     }
}

function mobCritDeals() {
    let damage = Math.floor(Math.random() * (mobDamage.length));
    damage = ((damage + 1) * 2);
    console.log(`And deals ${damage} damage`);
    mAnnounce.textContent = '';
    hAnnounce.textContent = `And deals ${damage} damage`;
    heroHP = (heroHP-damage);
    hHP.textContent = heroHP;
    if (heroHP <= 0) {  
        setTimeout(heroDeath, 1500);
     } else {
        setTimeout(heroUpdate, 1500)
     }
}

function heroDeath() {
    console.log(`The hero has died! Game over`);
    mAnnounce.textContent = "";
    hAnnounce.textContent = "The hero has died! Game over";
}

function heroUpdate() {
    console.log(`Hero is down to ${heroHP} HP`);
    mAnnounce.textContent = ""
    hAnnounce.textContent = `Hero is down to ${heroHP} HP`
}