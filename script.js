let heroHP = 10
let heroAC = 12
let mobHP = 6
let mobAC = 10
let heroDamage = [1, 2, 3, 4, 5, 6, 7, 8]
let mobDamage = [1, 2, 3, 4, 5, 6]

function heroAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = (attempt + 1);
    console.log(`Hero attacks with ${attempt} vs creature's AC of ${mobAC}`);
    if (attempt >= mobAC) {
        console.log("It hits!");
        let damage = Math.floor(Math.random() * (heroDamage.length));
        damage = (damage + 1);
        console.log(`And deals ${damage} damage`);
        mobHP = (mobHP-damage)
        console.log(`Creature is down to ${mobHP} HP`);
    } else {
        console.log("It misses");
    }
    if (mobHP <= 0) {  
       console.log(`Hero kills the creature!`);
    } else {
        mobAttack()
    }
}

function mobAttack() {
    let attempt = Math.floor(Math.random() * 20);
    attempt = (attempt + 1);
    console.log(`Creature attacks with ${attempt} vs hero's AC of ${heroAC}`);
    if (attempt >= heroAC) {
        console.log("It hits!");
        let damage = Math.floor(Math.random() * (mobDamage.length + 1));
        damage = (damage + 1);
        console.log(`And deals ${damage} damage`);
        heroHP = (heroHP-damage)
        console.log(`Hero is down to ${heroHP}`);
    } else {
        console.log("It misses");
    }
    if (heroHP <= 0) {
        console.log("Hero dies");
    }
}

heroAttack()
// mobAttack()