addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        power: new Decimal(0),
        auto: true
    }},
    color: "#FF9852",
    requires: new Decimal(2).pow(1024), // Can be a function that takes requirement increases into account
    resource: "Infinity Points", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.008, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for Infinity Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update() {
        let gain = buyableEffect('inf', 11)
        addPoints('rein', gain.div(20))
    },
    upgrades:{
        11: {
            title: "Inflation",
            description: "Unspent Infinity Points boost skill and AP gain.",
            cost: new Decimal('1e378'),
            currencyDisplayName: "Art Points",
            currencyInternalName: "points",
            currencyLayer: "art",
            effect() {
                let power = Decimal.pow(player.inf.points.add(1), 7)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (getBuyableAmount('inf', 11) > 0)
            },
        },
        12: {
            title: "Unstoppable",
            description: "Reincaranation Boost's formula is better.",
            cost: new Decimal(50),
            unlocked(){
                return (hasUpgrade('inf', 11))
            },
        },
        13: {
            title: "Road to Parallel Universe",
            description: "Magic Boost is powered to ^1.5 again.",
            cost: new Decimal(1e6),
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
            cost: new Decimal(2.5e7),
            effect() {
                let power = new Decimal(0.00025).times(player.points.add(1).log(1e10))
                return power
            },
            effectDisplay() { return "+^" + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        22: {
            title: "Microadjustment II",
            description: "Art Machine 4's power base is increase by 1 (2^x -> 3^x).",
            cost: new Decimal(1e9),
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
        23: {
            title: "Progress",
            description: "Unlock Infinite Generator 3.",
            cost: new Decimal(1e12),
            unlocked(){
                return (hasUpgrade('inf', 13))
            },
        },
    },
    milestones: {
        0: {requirementDescription: "27 Infinity Points",
            done() {return player[this.layer].best.gte(27)}, // Used to determine when to give the milestone
            effectDescription: "Keep all Art Upgrades while Big Crunching (Gaining IP).",

        },
        1: {requirementDescription: "75 Infinity Points",
            done() {return player[this.layer].best.gte(75)}, // Used to determine when to give the milestone
            effectDescription: "Unlock Art Machine 4 Autobuyer, bundled with the previous 3.",

        },
        2: {requirementDescription: "225 Infinity Points",
            done() {return player[this.layer].best.gte(225)}, // Used to determine when to give the milestone
            effectDescription: "Keep all competitions and Rein. Milestones when Infinitying.",

        },
        3: {requirementDescription: "1e10 Infinity Points",
            done() {return player[this.layer].best.gte(1e10)}, // Used to determine when to give the milestone
            effectDescription: "Unlock infinite generator autobuyer.",
            toggles: [
                ["inf", "auto"]
            ],
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
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Generating " + format(buyableEffect(this.layer, this.id)) + " Reincaranations per second"
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
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
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting IG1 by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
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
                let cost = new Decimal(1e12).times(new Decimal(20).pow(x))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(3).times(getBuyableAmount('inf', 21)))
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Infinity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting IG2 by x" + format(buyableEffect(this.layer, this.id))
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('inf', 23))
            },

        },
    },

    layerShown(){return hasUpgrade('art', 51) || player.inf.best.gte(1)},
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
    },
    passiveGeneration() {
        return hasMilestone("rein", 6) ? 0.1:0
        },
    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("inf", keep)
    },

})