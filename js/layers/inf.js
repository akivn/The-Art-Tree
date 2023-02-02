addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        power: new Decimal(0),
        auto: true
    }},
    branches: [
        ["ipow", function() { return player.ipow.best.gte(1) ? "#ffffff" : "#505050" }, 20],
        ["eter", function() { return player.eter.best.gte(1) ? "#ffffff" : "#505050" }, 20],


	],
    color: "#FF9852",
    requires: new Decimal(2).pow(1536), // Can be a function that takes requirement increases into account
    resource: "Infinity Points", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0105, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('art', 45)) mult = mult.times(upgradeEffect('art', 45))
        if (hasUpgrade('rein', 13)) mult = mult.times(upgradeEffect('rein', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        pow = new Decimal(1).times(tmp.ipow.effect)
        return pow
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "I", description: "Shift+I: Reset for Infinity Powers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update() {
        let gain = buyableEffect('inf', 11)
        if (inChallenge('schal', 21)) gain = gain.pow(0.25)
        if (hasAchievement('ac', 172)) gain = gain.times(1.1)
        if (hasChallenge('schal', 21)) gain = gain.times(challengeEffect('schal', 21))
        if (inChallenge('schal', 22) && gain.gte(1)) gain = new Decimal(1)
        addPoints('rein', gain.div(20))
        if (hasChallenge('schal', 32)) addPoints('srein', challengeEffect('schal', 32).div(20))
    },
    upgrades:{
        11: {
            title: "Inflation",
            description: "Unspent Infinity Points boost skill and AP gain.",
            cost: new Decimal(10),
            effect() {
                let power = Decimal.pow(player.inf.points.add(1), 7)
                power = power.pow(buyableEffect('art', 22))
                if (inChallenge('schal', 12)) power = new Decimal(1)
                if (inChallenge('schal', 32)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (getBuyableAmount('inf', 11) > 0)
            },
        },
        12: {
            title: "Unstoppable",
            description: "Reincarnation Boost's formula is better.",
            cost: new Decimal(50),
            unlocked(){
                return (hasUpgrade('inf', 11))
            },
        },
        13: {
            title: "Road to Parallel Universe",
            description: "Magic Boost is powered to ^1.5 again.",
            cost: new Decimal(1e20),
            effect() {
                let power = new Decimal(2)
                return power
            },
            unlocked(){
                return (hasUpgrade('inf', 12))
            },
        },
        21: {
            title: "Microadjustment",
            description: "Art Machine 1 is stronger again based on your skill.",
            cost: new Decimal(1e26),
            effect() {
                let power = new Decimal(0.00016).times(player.points.add(1).log(1e10))
                if (power.gte(0.2)) power = new Decimal(0.2)
                if (inChallenge('schal', 32)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return "+^" + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        22: {
            title: "Microadjustment II",
            description: "Art Machine 4's power base is increase by 1 (1.6^x -> 2.5^x).",
            cost: new Decimal(1e47),
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        23: {
            title: "Progress",
            description: "Unlock Infinite Generator 3.",
            cost: new Decimal(1e62),
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        24: {
            title: "Power-Up!",
            description: "Unlock Infinity Power.",
            cost: new Decimal(1e63),
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        25: {
            title: "RETURN OF BASICS",
            description: "Unlock 8 new Art Upgrades",
            cost: new Decimal(1e100),
            unlocked(){
                return (hasUpgrade('inf', 24))
            },
        },
    },
    milestones: {
        0: {requirementDescription: "27 Infinity Points",
            done() {return player[this.layer].best.gte(27)}, // Used to determine when to give the milestone
            effectDescription: "Keep all Art Upgrades while Big Crunching (Gaining IP).",

        },
        1: {requirementDescription: "100,000 Infinity Points",
            done() {return player[this.layer].best.gte(100000)}, // Used to determine when to give the milestone
            effectDescription: "Unlock Art Machine 4 Autobuyer, bundled with the previous 3.",

        },
        2: {requirementDescription: "100,000,000 Infinity Points",
            done() {return player[this.layer].best.gte(1e8)}, // Used to determine when to give the milestone
            effectDescription: "Keep all competitions and Rein. Milestones when performing a Row-3 Reset.",

        },
        3: {requirementDescription: "1e10 Infinity Points",
            done() {return player[this.layer].best.gte(1e10)}, // Used to determine when to give the milestone
            effectDescription: "Unlock infinite generators 1/2 autobuyer.",
            toggles: [
                ["inf", "auto"]
            ],
        },
        4: {requirementDescription: "1e225 Infinity Points",
            done() {return player[this.layer].best.gte(1e225)}, // Used to determine when to give the milestone
            effectDescription: "Unlock infinite generators 3/4 autobuyer.",
        },
        5: {requirementDescription: "9.99e1999 Infinity Points",
            done() {return player[this.layer].best.gte('9.99e1999')}, // Used to determine when to give the milestone
            effectDescription: "Unlock Art Machine 6 Autobuyer.",
            unlocked(){
                return hasChallenge('schal', 11)
            }
        },
    },
    buyables: {
        11: {
            title: "Infinite Generator 1",
            cost(x) { 
                let cost = new Decimal(1).times(new Decimal(2).pow(x))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(-1).add(new Decimal(1).times(getBuyableAmount('inf', 11)))
                power = power.times(buyableEffect('inf', 12))
                if (hasAchievement('ac', 142)) power = power.times(1.5)
                if (hasUpgrade('rein', 11)) power = power.times(upgradeEffect('rein', 11))
                if (hasAchievement('ac', 172)) power = power.times(1.1)
                if (hasUpgrade('rein', 21)) power = power.times(upgradeEffect('rein', 21))
                if (hasUpgrade('rein', 23)) power = power.times(2)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/999\n\
                Generating " + format(buyableEffect(this.layer, this.id)) + " Reincarnations per second"
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('inf', 11) < 999},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (true)
            },

        },
        12: {
            title: "Infinite Generator 2",
            cost(x) { 
                let cost = new Decimal(1000).times(new Decimal(6).pow(x))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(2).times(getBuyableAmount('inf', 12)))
                power = power.times(buyableEffect('inf', 21))
                if (hasUpgrade('rein', 23)) power = power.times(2)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/999\n\
                Boosting IG1 by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('inf', 12) < 999},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (true)
            },

        },
        21: {
            title: "Infinite Generator 3",
            cost(x) { 
                let cost = new Decimal(1e62).times(new Decimal(16).pow(x))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(3).times(getBuyableAmount('inf', 21)))
                power = power.times(buyableEffect('inf', 22))
                if (hasUpgrade('rein', 23)) power = power.times(2)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/999\n\
                Boosting IG2 by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('inf', 21) < 999},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('inf', 23))
            },

        },
        22: {
            title: "Infinite Generator 4",
            cost(x) { 
                let cost = new Decimal(1e160).times(new Decimal(70).pow(x))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(5).times(getBuyableAmount('inf', 22)))
                if (hasUpgrade('rein', 23)) power = power.times(2)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/999\n\
                Boosting IG3 by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('inf', 22) < 999},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 35))
            },

        },
    },

    layerShown(){return hasUpgrade('art', 51) || player.inf.best.gte(1) || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
        },
        "Generators": {
            content: [
                "main-display",
                "buyables",
            ]
        },
        "Milestones": {
            content: [
                "main-display",
                "milestones",
            ]
        },
        
    },
    automate() {
        if (hasMilestone('inf', 3) && player[this.layer].auto ) {
            buyBuyable('inf', 11)
            buyBuyable('inf', 12)
        }
        if (hasMilestone('inf', 4) && player[this.layer].auto ) {
            buyBuyable('inf', 21)
            buyBuyable('inf', 22)
        }
    },
    passiveGeneration() {
        return hasMilestone("rein", 6) ? 0.1:0
        },
    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("inf", keep)
    },

})