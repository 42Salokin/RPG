const hHP = document.querySelector('#hHP')
const hAC = document.querySelector('#hAC')
const mHP = document.querySelector('#mHP')
const hAnnounce = document.querySelector('#hAnnounce')
const mAnnounce = document.querySelector('#mAnnounce')
let mobDamage = [1, 2, 3, 4, 5, 6]

const hero = {
    HP: 10,
    AC: 12,
}
let heroHP = hero.HP
let heroAC = hero.AC
hHP.textContent = heroHP
hAC.textContent = heroAC
let heroDamage = [1, 2, 3, 4, 5, 6, 7, 8]

const mob = {
    HP: 6,
    AC: 10,
}
let mobHP = mob.HP
let mobAC = mob.AC
mHP.textContent = mobHP


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
    setTimeout(mobAttack, 3000)
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
        setTimeout(mobDeath, 1500);
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
        setTimeout(mobDeath, 1500);
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

function mobUpdate() {
    console.log(`Creature is down to ${mobHP} HP`);
    mAnnounce.textContent = `Creature is down to ${mobHP} HP`
    setTimeout(mobAttack, 3000)
}

function mobAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = (attempt + 1);
    console.log(`Creature attacks with ${attempt} vs hero's AC of ${heroAC}`);
    if (attempt >= heroAC && attempt < 20) {
        console.log("It hits!");
        let damage = Math.floor(Math.random() * (mobDamage.length + 1));
        damage = (damage + 1);
        console.log(`And deals ${damage} damage`);
        heroHP = (heroHP-damage)
        console.log(`Hero is down to ${heroHP} HP`);
        hHP.textContent = heroHP
    } else if (attempt == 20) {
        console.log("Critical hit!");
        let damage = Math.floor(Math.random() * (mobDamage.length + 1));
        damage = ((damage + 1) * 2);
        console.log(`And deals ${damage} damage`);
        heroHP = (heroHP-damage)
        console.log(`Hero is down to ${heroHP} HP`); 
        hHP.textContent = heroHP       
    } 
    else {
        console.log("It misses");
    }
    if (heroHP <= 0) {
        console.log("Hero dies");
    }
}

function mobRefresh() {
    mobHP = mob.HP
    console.log(`A new foe appears! Hero has ${heroHP} HP`);
    mAnnounce.textContent = "";
    hAnnounce.textContent = `A new foe appears! Hero has ${heroHP} HP`
    mHP.textContent = mobHP
}
// heroAttack()
// mobAttack()