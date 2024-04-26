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
    switch (heroLevel) {
        case 1:
            i = 0;
            makeMob(i);
            break;
        case 2:
            switch (true) {
                case (random < 0.60):
                    i = 0;
                    makeMob(i);
                    break;
                default:
                    i = 1;
                    makeMob(i);
            }
            break;
        default:
            switch (true) {
                case (random < 0.20):
                    i = 0;
                    makeMob(i);
                    break;
                case (random >= 0.20 && random < 0.60):
                    i = 1;
                    makeMob(i);
                    break;
                default:
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