// const mobJS = require('./mob.js')
// console.log(mobJS);
const hHP = document.querySelector('#hHP');
const hAC = document.querySelector('#hAC');
const hLvl = document.querySelector('#hLvl');
const hExp = document.querySelector('#hExp');
const hGold = document.querySelector('#hGold');
const hStr = document.querySelector('#hStr');
const hDex = document.querySelector('#hDex');
const hCon = document.querySelector('#hCon');
const mName = document.querySelector('#mName');
const mHP = document.querySelector('#mHP');
const hAnnounce = document.querySelector('#hAnnounce');
const mAnnounce = document.querySelector('#mAnnounce');
const levAnnounce = document.querySelector('#levAnnounce');
const levList = document.querySelector('#levList');
const statList = document.querySelector('#statList');

const hero = {
    MaxHP: 10,
    HP: 10,
    AC: 12,
    Damage: 8,
    Level: 1,
    Exp: 0,
    Gold: 10,
    Str: 1,
    Dex: 1,
    Con: 1,
}
let heroMaxHP = hero.MaxHP;
let heroHP = hero.HP;
let heroLevel = hero.Level;
let heroExp = hero.Exp;
let heroGold = hero.Gold;
let heroStr = hero.Str;
let atkBonus = parseInt(heroStr/2);
let heroDex = hero.Dex;
let acBonus = parseInt(heroDex/2);
let heroAC = (hero.AC + acBonus);
let heroCon = hero.Con;
let hpBonus = parseInt(heroCon/2);
hHP.textContent = heroHP;
hAC.textContent = heroAC;
hLvl.textContent = heroLevel;
hExp.textContent = heroExp;
hGold.textContent = heroGold;
hStr.textContent = heroStr;
hDex.textContent = heroDex;
hCon.textContent = heroCon;
let heroDamage = hero.Damage;

function mobGenerator(Name, HP, AC, Exp, Gold, Damage) {
    this.Name = Name;
    this.HP = HP;
    this.AC = AC;
    this.Exp = Exp;
    this.Gold = Gold;
    this.Damage = Damage;
}

const goblin = new mobGenerator('Goblin','8', '10', '5', '5', '6');
const hobgoblin = new mobGenerator('Hobgoblin', '10', '12', '10', '10', '6' )
const orc = new mobGenerator('Orc', '12', '12', '15', '15', '8')
const mobs = [goblin, hobgoblin, orc];

let i;
let mob;
let mobName;
let mobHP;
let mobAC;
let mobExp;
let mobGold;
let mobDamage;

function selectMob() {
    let random = Math.random();
    if (heroLevel === 1) {
        i = 0;
        makeMob(i);
    } else if (heroLevel === 2) {
        if (random < 0.60) {
            i = 0;
            makeMob(i);
        } else {
            i = 1;
            makeMob(i);
        }
    } else {
        if (random < 0.20) {
            i = 0;
            makeMob(i);
        } else if ((random >= 0.20) && (random < 0.60)) {
            i = 1;
            makeMob(i);
        } else {
            i = 2;
            makeMob(i);            
        }
    }
}

function makeMob(i) {
mob = new mobGenerator(mobs[i].Name, mobs[i].HP, mobs[i].AC, mobs[i].Exp, mobs[i].Gold, mobs[i].Damage)
console.log(mob);
mobName = mob.Name;
mobHP = parseInt(mob.HP);
mobAC = parseInt(mob.AC);
mobExp = parseInt(mob.Exp);
mobGold = parseInt(mob.Gold);
mobDamage = parseInt(mob.Damage);
console.log(mobHP, mobAC, mobExp, mobGold, mobDamage);
mName.textContent = mobName;
mHP.textContent = mobHP;
}

selectMob();

function heroAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = 20 //(attempt + 1);
    console.log(`Hero attacks with ${attempt} vs ${mobName}'s AC of ${mobAC}`);
    mAnnounce.textContent = ""
    hAnnounce.textContent = "Hero attacks..."
    if ((attempt + atkBonus) >= mobAC && attempt < 20) {
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
    let damage = ((Math.floor(Math.random() * heroDamage)) + atkBonus + 1);
    // damage = (damage + atkBonus + 1);
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
    let damage = (((Math.floor(Math.random() * heroDamage)) + atkBonus + 1) * 2);
    // damage = ((damage + atkBonus + 1) * 2);
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
    console.log(`Hero kills the ${mobName}!`);
    mAnnounce.textContent = "";
    hAnnounce.textContent = `Hero kills the ${mobName}!`;
    setTimeout(heroReward, 2000);
}

function heroReward() {
    console.log(`Hero collects ${mobGold} gold and receives ${mobExp} exp`);
    hAnnounce.textContent = `Hero collects ${mobGold} gold and receives ${mobExp} exp`;
    heroExp = (heroExp + mobExp);
    if ((heroExp >= 15) && (heroLevel === 1)) {
        setTimeout(levelUp, 500)
    } else if ((heroExp >= 50) && (heroLevel === 2)) {
        setTimeout(levelUp, 500)
    } else if ((heroExp >= 200) && (heroLevel === 3)) {
        setTimeout(levelUp, 500)
    } else if ((heroExp >= 750) && (heroLevel === 4)) {
        setTimeout(levelUp, 500)
    }
    heroGold = (heroGold + mobGold);
    hExp.textContent = heroExp;
    hGold.textContent = heroGold;
    setTimeout(mobRefresh, 3000)
}

function heroRun() {
    if (heroHP < heroMaxHP) {
        // const heal = (heroLevel + hpBonus)
    //     console.log(`Hero retreats and recovers ${heal} hp`);
    //    mAnnounce.textContent = '';
    //    hAnnounce.textContent = `Hero retreats and recovers ${heal} HP`;
    //    heroHP = (heroHP + heal);
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
    // mobName = mob.Name
    // mobHP = mob.HP
    selectMob();
    console.log(`A new foe appears! Hero has ${heroHP} HP`);
    hAnnounce.textContent = "";
    mAnnounce.textContent = `A new foe appears! Hero has ${heroHP} HP`
    // mName.textContent = mobName
    // mHP.textContent = mobHP
}

function mobUpdate() {
    console.log(`${mobName} is down to ${mobHP} HP`);
    mAnnounce.textContent = `${mobName} is down to ${mobHP} HP`
    setTimeout(mobAttack, 3000)
}

function mobAttack() {
    let attempt = ((Math.floor(Math.random() * 20)) + 1);
    // attempt = (attempt + 1);
    console.log(`${mobName} attacks with ${attempt} vs hero's AC of ${heroAC}`);
    hAnnounce.textContent = ""
    mAnnounce.textContent = `${mobName} attacks...` 
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
    let damage = ((Math.floor(Math.random() * mobDamage)) + 1);
    // damage = (damage + 1);
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
    let damage = (((Math.floor(Math.random() * mobDamage)) + 1) * 2);
    // damage = ((damage + 1) * 2);
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
    empty(levList);
    // pop up message over screen announcing level up
    levAnnounce.style.visibility = "visible";
    // display new level
    heroLevel++;
    hLvl.textContent = heroLevel;
    // reset HP to max, add new HP, make new max
    let newHP = Math.floor(Math.random() * 5);
    newHP = (newHP + hpBonus + 6);
    heroMaxHP = (heroMaxHP + newHP);
    heroHP = (heroHP + newHP);
    // display new HP
    hHP.textContent = heroHP;
    console.log(`Level Up! Hero has reached Level ${heroLevel}!`);
    console.log(`Hero gains ${newHP} more HP`);

    const levText1 = document.createElement("li");
    const levText2 = document.createElement("li");
    const levText3 = document.createElement("li");
    
    levText1.setAttribute("class", "levText");
    levText2.setAttribute("class", "levText");
    levText3.setAttribute("class", "levText");
    
    levText1.textContent = `Level Up!`;
    levText2.textContent = `Hero has reached Level ${heroLevel}!`;
    levText3.textContent = `Hero gains ${newHP} more HP`;
    levList.append(levText1, levText2, levText3);
}

function empty(element) {
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

statList.addEventListener('click', (event) => {
    levAnnounce.style.visibility = "hidden";
    const selectedStat = event.target.textContent;
    statUpgrade(selectedStat);
})

function statUpgrade(selectedStat) {
    switch (selectedStat) {
        case "Dex +1 Adds to Armor Class":
            heroDex = (heroDex + 1);
            acBonus = parseInt(heroDex/2);
            heroAC = (heroAC + acBonus);
            hDex.textContent = heroDex;
            hAC.textContent = heroAC
            console.log(`Hero's new Dex is ${heroDex}`);
            console.log(`Hero's new AC bonus is ${acBonus}, for a new AC of ${heroAC}`);
            break;
    
        case "Con +1 Adds to Hit Points":
            heroCon = (heroCon + 1);
            hpBonus = parseInt(heroCon/2);
            hCon.textContent = heroCon;
            heroMaxHP = (heroMaxHP + hpBonus);
            heroHP = heroMaxHP;
            hHP.textContent = heroHP;
            console.log(`Hero's new Con is ${heroCon}`);
            console.log(`Hero's new HP bonus is ${hpBonus}, for a new HP total of ${heroHP}`);
            break;

        default:
            heroStr = (heroStr + 1);
            atkBonus = parseInt(heroStr/2);
            hStr.textContent = heroStr
            console.log(`Hero's new Str is ${heroStr}`);
            console.log(`Hero gets a +${atkBonus} to attack and damage`);
            break;
    }
}

// levelUp();