const hHP = document.querySelector('#hHP')
const hAC = document.querySelector('#hAC')
const hLvl = document.querySelector('#hLvl')
const hExp = document.querySelector('#hExp')
const hGold = document.querySelector('#hGold')
const mHP = document.querySelector('#mHP')
const hAnnounce = document.querySelector('#hAnnounce')
const mAnnounce = document.querySelector('#mAnnounce')
const levAnnounce = document.querySelector('#levAnnounce')
const levText = document.querySelector('#levText')
const close = document.querySelector('#close')

const hero = {
    MaxHP: 10,
    HP: 10,
    AC: 12,
    Level: 1,
    Exp: 0,
    Gold: 10,
}
let heroMaxHP = hero.MaxHP
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
let levelHP = [1, 2, 3, 4, 5]

const mob = {
    HP: 8,
    AC: 10,
    Exp: 5,
    Gold: 5,
}
let mobHP = mob.HP
let mobAC = mob.AC
let mobExp = mob.Exp
let mobGold = mob.Gold
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
    setTimeout(heroReward, 2000);
}

function heroReward() {
    console.log(`Hero collects ${mobGold} gold and receives ${mobExp} exp`);
    hAnnounce.textContent = `Hero collects ${mobGold} gold and receives ${mobExp} exp`;
    heroExp = (heroExp + mobExp);
    if ((heroExp >= 15) && (heroLevel === 1)) {
        setTimeout(levelUp, 500)
    }
    heroGold = (heroGold + mobGold);
    hExp.textContent = heroExp;
    hGold.textContent = heroGold;
    setTimeout(mobRefresh, 3000)
}

function heroRun() {
    if (heroHP < 10) {
    //     console.log(`Hero retreats and recovers ${heroLevel} hp`);
    //    mAnnounce.textContent = '';
    //    hAnnounce.textContent = `Hero retreats and recovers ${heroLevel} HP`;
    //    heroHP = (heroHP + heroLevel);
       console.log(`Hero retreats and recovers full hp`);
       mAnnounce.textContent = '';
       hAnnounce.textContent = `Hero retreats and recovers full HP`;
       heroHP = heroMaxHP;
       hHP.textContent = heroHP;
       setTimeout(mobRefresh, 2000)
    } else {
        console.log("Hero retreats");
        mAnnounce.textContent = '';
        hAnnounce.textContent = "Hero retreats";
        setTimeout(mobRefresh, 2000)
    }    
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

function levelUp() {
    // pop up message over screen announcing level up
    levAnnounce.style.visibility = "visible";
    // display new level
    heroLevel++;
    hLvl.textContent = heroLevel;
    // reset HP to max, add new HP, make new max
    let newHP = Math.floor(Math.random() * (levelHP.length));
    newHP = (newHP +6);
    heroMaxHP = (heroMaxHP + newHP);
    heroHP = heroMaxHP;
    // display new HP
    hHP.textContent = heroHP;
    console.log(`Level Up! Hero has reached Level ${heroLevel}!`);
    console.log(`Hero gains ${newHP} more HP`);
    levText.textContent = `Level Up! Hero has reached Level ${heroLevel}! Hero gains ${newHP} more HP`;
}

close.onclick = function() {
    levAnnounce.style.visibility = "hidden";
}