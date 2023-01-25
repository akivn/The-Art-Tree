addLayer("art", {
    name: "Art", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        auto_am12: false,
    }},
    color: "#4BDC13",
    branches: [
		["rein", function() { return player.rein.points.gte(1) ? "#ffffff" : "#505050" }, 20],
        ["chal", function() { return player.chal.points.gte(1) ? "#ffffff" : "#505050" }, 20],
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        if (inChallenge('chal', 21)) pow = new Decimal(0.5)
        return new Decimal(pow)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Art points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), player[this.layer].points.pow(0.25))
        if (hasUpgrade('art', 14)) effect = effect.pow(1.3)
        effect = effect.pow(buyableEffect('art', 11))
        if (hasUpgrade('art', 33)) effect = effect.times(10)
        return effect
    },
    effectDescription(){
        return "boosting skill gain by x" + format(tmp[this.layer].effect)        
    },
    upgrades: {
        11: {
            title: "Start",
            description: "Gain more for both Art points and skills based on your point amount.",
            cost: new Decimal(5),
            effect() {
                let power = new Decimal(player.points.add(3).log(3))
                if (hasUpgrade('art', 21)) power = power.pow(1.5)
                if (hasUpgrade('art', 34)) power = power.pow(1.5)
                softcap(power, new Decimal(10), new Decimal(1).div(new Decimal(1).add(power.div(50))))
                if (hasChallenge('chal', 12)) power = new Decimal(player.points.add(1).pow(0.15))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (player.art.points.max(1))
            },
        },
        12: {
            title: "Motivation",
            description: "Art point gain is boosted by itself.",
            cost: new Decimal(8),
            effect() {
                let power = new Decimal(player[this.layer].points.add(2).log(2))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('art', 11))
            },
        },
        13: {
            title: "Motivation II",
            description: "Skill gain boosts itself.",
            cost: new Decimal(36),
            effect() {
                let power = new Decimal(player.points.pow(0.144).add(1))
                softcap(power, new Decimal(100), new Decimal(0.6))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('art', 12))
            },
        },
        14: {
            title: "Amplify!",
            description: "Art point effect is boosted to ^1.3.",
            cost: new Decimal(200),
            effect() {
                let power = new Decimal(1.3)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (hasUpgrade('art', 13))
            },
        },
        21: {
            title: "Optimization",
            description: "Art Upgrade 1 is boosted to ^1.5",
            cost: new Decimal(320),
            effect() {
                let power = new Decimal(1.5)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (hasUpgrade('art', 14))
            },
        },
        22: {
            title: "Motivation III",
            description: "Gain 2x more Art points.",
            cost: new Decimal(5000),
            effect() {
                let power = new Decimal(2)
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            unlocked(){
                return (hasUpgrade('art', 21))
            },
        },
        23: {
            title: "Motivation IV",
            description: "Unlock Art Machines.",
            cost: new Decimal(20000),
            unlocked(){
                return (hasUpgrade('art', 22))
            },
        },
        24: {
            title: "Watashi no Kokoro, Anrokku! I",
            description: "Unlock the next layer.",
            cost: new Decimal(150000),
            unlocked(){
                return (hasUpgrade('art', 23))
            },
        },
        31: {
            title: "Motivation V",
            description: "Art Machine 1 is 1.2x stronger.",
            cost: new Decimal(1e11),
            unlocked(){
                return (hasMilestone('rein', 0))
            },
        },
        32: {
            title: "Multi-Purpose",
            description: "Art Machine 2 now also applies to skill gain.",
            cost: new Decimal(2e13),
            unlocked(){
                return (hasMilestone('rein', 0))
            },
        },
        33: {
            title: "Mastery of Amplification",
            description: "The Art point effect is 10x stronger, and Reincaranation effect is boosted by 3x.",
            cost: new Decimal(1e17),
            unlocked(){
                return (hasMilestone('rein', 0))
            },
        },
        34: {
            title: "Mastery of Optimization",
            description: "Art Upgrade 1 is boosted by a further ^1.5 (Affected by softcaps), and unlock challenges.",
            cost: new Decimal(1e19),
            unlocked(){
                return (hasMilestone('rein', 0))
            },
        },
        41: {
            title: "Experience",
            description: "Boost reducer effect based on your Reincaranation point.",
            cost: new Decimal(1e142),
            effect() {
                let power = new Decimal(2).pow(player.rein.points.times(0.09))
                if (inChallenge('chal', 12)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (hasChallenge('chal', 22))
            },
        },
        42: {
            title: "Pump up, player!",
            description: "Another +^0.10 boost on Art Machine 1.",
            cost: new Decimal(1e163),
            unlocked(){
                return (hasChallenge('chal', 22))
            },
        },
    },
    buyables: {
        11: {
            title: "Art Machine 1",
            cost(x) { 
                let cost = new Decimal(20000).times(new Decimal(3).pow(x.div(2)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(0.05).times(x))
                power = softcap(power, new Decimal(1.45), new Decimal(0.8).div(power.div(1.4)))
                if (hasUpgrade('art', 31)) power = power.times(1.2)
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                if (hasUpgrade('art', 42)) power = power.add(0.1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/60\n\
                Raises Art point effect to the power of ^" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('art', 11) < 60},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Art Machine 2",
            cost(x) { 
                let cost = new Decimal(1e5).times(new Decimal(4).pow(x.div(1.75)))
                cost = softcap(cost, new Decimal(1e40), new Decimal(1).mul(cost.log(10).div(40).pow(1.41)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1.3).pow(x)
                if (!hasChallenge('chal', 21)) power = softcap(power, new Decimal(5), new Decimal(1).div(power.log(5)))
                if (hasChallenge('chal', 21)) power = new Decimal(1.1).pow(x)
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies skill gain by x" + format(buyableEffect(this.layer, this.id))
                if (hasUpgrade('art', 32)) sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies skill and Art point gain by x" + format(buyableEffect(this.layer, this.id))
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
                let cost = new Decimal(1e23).times(new Decimal(10).pow(x.div(2)))
                if (inChallenge('chal', 11)) cost = new Decimal(1e309)
                if (inChallenge('chal', 31)) cost = new Decimal(1e309)
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(x.div(10))
                power = softcap(power, new Decimal(1.2), new Decimal(1).div(power.add(0.215).log(2).times(2)))
                if (inChallenge('chal', 11)) power = new Decimal(1)
                if (inChallenge('chal', 31)) power = new Decimal(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/25\n\
                Raises the Reincaranation point effect to the power of ^" + format(buyableEffect(this.layer, this.id))
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

    },
    layerShown(){return true},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
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
    },
    passiveGeneration() {
        return hasMilestone("rein", 2) ? 0.5:0
        },

    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("rein", 1)) keep.push("upgrades")
        if (hasMilestone("rein", 2)) keep.push("auto_am12")
        if (hasMilestone("rein", 4)) keep.push("buyables")
        if (layers[resettingLayer].row > this.row) layerDataReset("art", keep)
    },

})
