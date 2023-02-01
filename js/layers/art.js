addLayer("art", {
    name: "Art", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        auto_am12: true,
    }},
    color: "#4BDC13",
    branches: [
		["rein", function() { return player.rein.best.gte(1) ? "#ffffff" : "#505050" }, 20],
        ["chal", function() { return player.chal.best.gte(1) ? "#ffffff" : "#505050" }, 20],
        ["inf", function() { return player.inf.best.gte(1) ? "#ffffff" : "#505050" }, 20],


	],
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Art points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.42, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.rein.effect)
        if (hasUpgrade('art', 11)) mult = mult.times(upgradeEffect('art', 11))
        if (hasUpgrade('art', 12)) mult = mult.times(upgradeEffect('art', 12))
        if (hasUpgrade('art', 22)) mult = mult.times(upgradeEffect('art', 22))
        if (hasUpgrade('art', 32)) mult = mult.times(buyableEffect('art', 12))
        if (hasChallenge('chal', 21)) mult = mult.times(new Decimal(1e5))
        if (hasUpgrade('inf', 11)) mult = mult.times(upgradeEffect('inf', 11))
        if (hasUpgrade('art', 53)) mult = mult.times(upgradeEffect('art', 53))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        if (inChallenge('chal', 21) || inChallenge('schal', 31)) pow = pow.pow(0.5)
        if (inChallenge('schal', 21)) pow = new Decimal(0.25)
        return new Decimal(pow)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Art points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), player[this.layer].points.pow(0.25))
        if (hasUpgrade('art', 14)) effect = effect.pow(upgradeEffect('art', 14))
        effect = effect.pow(buyableEffect('art', 11))
        if (hasUpgrade('art', 33)) effect = effect.times(10)
        if (inChallenge('schal', 12)) power = new Decimal(1)
        return effect
    },
    effectDescription(){
        return "boosting skill gain by x" + format(tmp[this.layer].effect)        
    },
    canReset() {
        return !player.art.points.gte('1.79e308') && player.points.gte(1)
    },
    upgrades: {
        11: {
            title: "Start",
            description: "Gain more for both Art points and skills based on your point amount.",
            cost: new Decimal(3),
            effect() {
                let power = new Decimal(player.points.add(2).log(2))
                if (hasUpgrade('art', 21)) power = power.pow(upgradeEffect('art', 21))
                if (hasUpgrade('art', 34)) power = power.pow(1.5)
                softcap(power, new Decimal(10), new Decimal(1).div(new Decimal(1).add(power.div(50))))
                if (hasChallenge('chal', 12)) power = new Decimal(player.points.add(1).pow(0.225))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (player.art.points.max(1) || player.eter.best.gte(1))
            },
        },
        12: {
            title: "Motivation",
            description: "Art point gain is boosted by itself.",
            cost: new Decimal(12),
            effect() {
                let power = new Decimal(player[this.layer].points.add(2).log(2))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                power = power.times(buyableEffect('art', 21))
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('art', 11) || player.eter.best.gte(1))
            },
        },
        13: {
            title: "Motivation II",
            description: "Skill gain boosts itself.",
            cost: new Decimal(100),
            effect() {
                let power = new Decimal(player.points.pow(0.168).add(1))
                softcap(power, new Decimal(100), new Decimal(0.6))
                softcap(power, new Decimal(1e72), new Decimal(0.5))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                power = power.times(buyableEffect('art', 21))
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('art', 12) || player.eter.best.gte(1))
            },
        },
        14: {
            title: "Amplify!",
            description: "Art point effect is boosted to ^1.3.",
            cost: new Decimal(1000),
            effect() {
                let power = new Decimal(1.3)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (hasUpgrade('art', 13) || player.eter.best.gte(1))
            },
        },
        21: {
            title: "Optimization",
            description: "Art Upgrade 1 is boosted to ^1.75",
            cost: new Decimal(5000),
            effect() {
                let power = new Decimal(1.75)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (hasUpgrade('art', 14) || player.eter.best.gte(1))
            },
        },
        22: {
            title: "Motivation III",
            description: "Gain 2x more Art points.",
            cost: new Decimal(5e5),
            effect() {
                let power = new Decimal(2)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            unlocked(){
                return (hasUpgrade('art', 21) || player.eter.best.gte(1))
            },
        },
        23: {
            title: "Motivation IV",
            description: "Unlock Art Machines.",
            cost: new Decimal(1.3e6),
            unlocked(){
                return (hasUpgrade('art', 22) || player.eter.best.gte(1))
            },
        },
        24: {
            title: "Watashi no Kokoro, Anrokku! I",
            description: "Unlock the next layer.",
            cost: new Decimal(3e8),
            unlocked(){
                return (hasUpgrade('art', 23) || player.eter.best.gte(1))
            },
        },
        31: {
            title: "Motivation V",
            description: "Art Machine 1 is 1.2x stronger.",
            cost: new Decimal(1e13),
            unlocked(){
                return (hasMilestone('rein', 0) || player.eter.best.gte(1))
            },
        },
        32: {
            title: "Multi-Purpose",
            description: "Art Machine 2 now also applies to Art Point gain.",
            cost: new Decimal(5e14),
            unlocked(){
                return (hasMilestone('rein', 0) || player.eter.best.gte(1))
            },
        },
        33: {
            title: "Mastery of Amplification",
            description: "The Art point effect is 10x stronger, and Reincaranation effect is boosted by 3x.",
            cost: new Decimal(1e17),
            unlocked(){
                return (hasMilestone('rein', 0) || player.eter.best.gte(1))
            },
        },
        34: {
            title: "Mastery of Optimization",
            description: "Art Upgrade 1 is boosted by a further ^1.5 (Affected by softcaps), and unlock challenges.",
            cost: new Decimal(4e19),
            unlocked(){
                return (hasMilestone('rein', 0) || player.eter.best.gte(1))
            },
        },
        41: {
            title: "Experience",
            description: "Boost Magic effect based on your Reincaranation point.",
            cost: new Decimal(1e190),
            effect() {
                let power = new Decimal(2).pow(player.rein.points.times(0.09))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                power = power.times(buyableEffect('art', 21))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (hasChallenge('chal', 22) || player.eter.best.gte(1))
            },
        },
        42: {
            title: "Pump up, player!",
            description: "Another +^0.10 boost on Art Machine 1.",
            cost: new Decimal(1e207),
            unlocked(){
                return (hasChallenge('chal', 22) || player.eter.best.gte(1))
            },
        },
        43: {
            title: "Magic Egg",
            description: "Magic Effect formula is changed ( log_2(Magic + 2) > (Magic + 1)^0.048 )",
            cost: new Decimal(1e295),
            unlocked(){
                return (hasChallenge('chal', 31) || player.eter.best.gte(1))
            },
        },
        44: {
            title: "Access",
            description: "Unlock Art Machine 4.",
            cost: new Decimal(1e243),
            unlocked(){
                return (hasChallenge('chal', 22) || player.eter.best.gte(1))
            },
        },
        51: {
            title: "Watashi no Kokoro, Unlock AGAIN!",
            description: "Unlock the next layer.",
            cost: new Decimal('1e300'),
            unlocked(){
                return (hasChallenge('chal', 22) || player.eter.best.gte(1))
            },
        },
        15: {
            title: "Van Gogh",
            description: "Unlock Art Machine 5.",
            cost: new Decimal('1e8400'),
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        25: {
            title: "Ascension",
            description: "Super-Reincaranation point base is 69% higher.",
            cost: new Decimal('1e10000'),
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        35: {
            title: "NEW DIMENSIONS???",
            description: "Unlock Infinite Generator 4, and boost skill gain based on your Infinity Power.",
            cost: new Decimal('1e11000'),
            effect() {
                let power = new Decimal(1e40).pow(player.ipow.points)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        45: {
            title: "Multi-Purpose II",
            description: "Reincaranations boost Infinity Point gain at a reduced rate.",
            cost: new Decimal('1e15750'),
            effect() {
                let power = new Decimal(2).pow(player.rein.points.log(10))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        52: {
            title: "Final Stretch",
            description: "Art Machine 5's effect is added based on your Magics.",
            cost: new Decimal('1e17600'),
            effect() {
                let power = new Decimal(player.chal.points.add(1).log(10).div(100000))
                if (hasUpgrade('rein', 32)) power = power.add(upgradeEffect('rein', 32))
                return power
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        53: {
            title: "Bring it into Life!",
            description: "Your Achievement point boost art point gain.",
            cost: new Decimal('1e20610'),
            effect() {
                let power = new Decimal(1e12).pow(player.ac.points)
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        54: {
            title: "RE:Vive",
            description: "Art Machine 1's boost is another +^0.05 higher.",
            cost: new Decimal('1e22700'),
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
        55: {
            title: "This World is just One of the Worlds",
            description: "Unlock Super-Competitions.",
            cost: new Decimal('1e25500'),
            unlocked(){
                return (hasUpgrade('inf', 25) || player.eter.best.gte(1))
            },
        },
    },
    buyables: {
        11: {
            title: "Art Machine 1",
            cost(x) { 
                let cost = new Decimal(1e6).times(new Decimal(3).pow(x.div(2)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(0.09).times(x))
                power = softcap(power, new Decimal(1.45), new Decimal(0.9).div(x.div(5)))
                if (hasUpgrade('art', 31)) power = power.times(1.2)
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (hasUpgrade('art', 42)) power = power.add(0.1)
                if (hasAchievement('ac', 134)) power = power.add(0.05)
                if (hasUpgrade('inf', 21)) power = power.add(upgradeEffect('inf', 21))
                if (hasUpgrade('art', 54)) power = power.add(0.05)
                if (hasChallenge('schal', 31)) power = power.add(0.15)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/20\n\
                Raising Art point effect to the power of ^" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('art', 11) < 20},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Art Machine 2",
            cost(x) { 
                let cost = new Decimal(1e7).times(new Decimal(10).pow(x.div(1.75)))
                cost = softcap(cost, new Decimal(1e40), new Decimal(1).mul(cost.log(10).div(40).pow(1.41)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1.3).pow(x)
                if (!hasChallenge('chal', 21)) power = softcap(power, new Decimal(5), new Decimal(1).div(power.log(5)))
                if (hasChallenge('chal', 21)) power = new Decimal(1.1).pow(x)
                if (getBuyableAmount('art', 23) > 0 && hasUpgrade('rein', 31)) power = Decimal.pow(new Decimal(1.1).add(buyableEffect('art', 23)), x)
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies skill gain by x" + format(buyableEffect(this.layer, this.id))
                if (hasUpgrade('art', 32)) sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplying skill and Art point gain by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },

        },
        13: {
            title: "Art Machine 3",
            cost(x) { 
                let cost = new Decimal(1e25).times(new Decimal(10).pow(x))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(x.div(10))
                power = softcap(power, new Decimal(1.2), new Decimal(1).div(power.add(0.215).log(2).times(2)))
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (hasAchievement('ac', 143)) power = power.times(1.05)
                if (hasAchievement('ac', 145)) power = power.add(0.1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/25\n\
                Raising the Reincaranation point effect to the power of ^" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('art', 13) < 25},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasChallenge('chal', 11))
            },

        },
        21: {
            title: "Art Machine 4",
            cost(x) { 
                let cost = new Decimal(1e243).times(new Decimal(1e6).pow(x))
                cost = softcap(cost, new Decimal('1e273'), new Decimal(1).mul(cost.log(10).div(90).min(3)))
                cost = softcap(cost, new Decimal('1e16000'), new Decimal(1).mul(cost.log(10).div(2000).min(6)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = Decimal.pow(1.6, x)
                if (hasUpgrade('inf', 22)) power = Decimal.pow(2.5, x)
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (getBuyableAmount('art', 23) > 0) power = Decimal.pow(new Decimal(3).add(buyableEffect('art', 23)), x)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Upgrade 2, 3 and 13 by " + format(buyableEffect(this.layer, this.id)) + "x"
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 44))
            },

        },
        22: {
            title: "Art Machine 5",
            cost(x) { 
                let cost = new Decimal('1e8400').times(new Decimal(1e300).pow(x))
                cost = softcap(cost, new Decimal('1e20000'), new Decimal(1.8))
                cost = softcap(cost, new Decimal('1e40000'), new Decimal(1).mul(cost.add(10).log(10).div(10000).min(3)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(0.015).times(x))
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (hasUpgrade('art', 52)) power = power.add(upgradeEffect('art', 52))
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Infinity Upgrade 1 by ^" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 15))
            },

        },
        23: {
            title: "Art Machine 6",
            cost(x) { 
                let cost = new Decimal('1e28000').times(new Decimal('1e650').pow(x))
                cost = softcap(cost, new Decimal('1e40000'), new Decimal(2))
                cost = softcap(cost, new Decimal('1e60000'), new Decimal(1).mul(cost.log(10).div(20000).min(3)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                if (inChallenge('schal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(0).add(new Decimal(0.055).times(x))
                if (hasAchievement('ac', 173)) power = new Decimal(1.03).pow(x).minus(1)
                if (!hasAchievement('ac', 173)) power = softcap(power, new Decimal(0.25), new Decimal(0.4))
                if (!hasAchievement('ac', 173)) power = softcap(power, new Decimal(0.75), new Decimal(1).mul(x.div(100)))
                if (hasUpgrade('rein', 14) && !inChallenge('schal', 22)) power = power.times(3)
                if (hasUpgrade('rein', 33)) power = power.times(upgradeEffect('rein', 33))
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (inChallenge('schal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Machine 4's base by +" + format(buyableEffect(this.layer, this.id))
                if (hasUpgrade('rein', 31)) sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Machine 2 & 4's base by +" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasChallenge('schal', 11))
            },

        },

    },
    clickables :{
        11: {
            display() {return "Respec Art Upgrades"},
            unlocked() {return hasAchievement('ac', 182)},
            canClick() {
                return player.art.upgrades != []
            },
            onClick() {
                player.points = new Decimal(0)
                player.art.upgrades = []
            }
            // etc...
        }
        // etc... 
    },
    layerShown(){return true},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "upgrades",
            ],
        },
        "Art Machines": {
            content: [
                "main-display",
                "prestige-button",
                "buyables"
            ],
            unlocked() {
                return (hasUpgrade('art', 23))
            }

        },
    },
    automate() {
        if (hasMilestone('rein', 0) && player[this.layer].auto_am12 ) {
            buyBuyable('art', 11)
            buyBuyable('art', 12)
        }
        if (hasMilestone('rein', 3) && player[this.layer].auto_am12 ) {
            buyBuyable('art', 13)
        }
        if (hasMilestone('inf', 1) && player[this.layer].auto_am12 ) {
            buyBuyable('art', 21)
        }
        if (hasChallenge('schal', 11) && player[this.layer].auto_am12 ) {
            buyBuyable('art', 22)
        }
        if (hasMilestone('inf', 5) && player[this.layer].auto_am12 ) {
            buyBuyable('art', 23)
        }
    },
    passiveGeneration() {
        return hasMilestone("rein", 2) ? 0.5:0
        },

    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("rein", 0)) keep.push("auto_am12")
        if (hasMilestone("rein", 1) || hasMilestone('inf', 0)) keep.push("upgrades")
        if (hasMilestone("rein", 4)) keep.push("buyables")
        if (layers[resettingLayer].row > this.row) layerDataReset("art", keep)
    },

})
