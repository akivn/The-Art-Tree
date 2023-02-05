addLayer("art", {
    name: "Art", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        auto1: true,
    }},
    color: "#739DBF",
    branches: [
        ["boo", function() { return player.boo.unlocked ? "#a028f6" : "#303030" }, 25],
        ["en", function() { return player.en.unlocked ? "#a028f6" : "#303030" }, 25],
        ["c", function() { return player.c.unlocked ? "#a028f6" : "#303030" }, 25],

	],
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Art points", // Name of prestige currency
    baseResource: "Skills", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.42, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.boo.effect)
        if (hasUpgrade('art', 21)) mult = mult.times(upgradeEffect('art', 21))
        if (hasUpgrade('art', 22)) mult = mult.times(upgradeEffect('art', 22))
        if (hasUpgrade('art', 23)) mult = mult.times(upgradeEffect('art', 23))
        if (hasUpgrade('boo', 14)) mult = mult.times(upgradeEffect('boo', 14))
        mult = mult.times(tmp.art.buyables[13].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Art points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), player[this.layer].points.add(1).pow(0.5))
        effect = effect.times(tmp.art.buyables[12].effect)
        if (hasUpgrade('en', 11))effect = effect.pow(upgradeEffect('en', 11))
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
            title: "Motivation 1",
            description: "Boost Skill gain even more from your Art Points.",
            cost: new Decimal(2500),
            effect() {
                let power = new Decimal(player.art.points.add(5).log(5))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        12: {
            title: "Motivation 2",
            description: "Boost Skill gain even more from your Skills (Self-dependent).",
            cost: new Decimal(12500),
            effect() {
                let power = new Decimal(player.points.add(4.4).log(4.4))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        13: {
            title: "Motivation 3",
            description: "Boost Skill gain even more from your Art Machine 1's amount",
            cost: new Decimal(1e6),
            effect() {
                let power = getBuyableAmount('art', 11).times(2).add(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        14: {
            title: "Anrokku! 1",
            description: "Unlock Art Machine 3",
            cost: new Decimal(5e12),
            unlocked(){
                return (true)
            },
        },
        21: {
            title: "Art Booster 1",
            description: "Boost Art Point gain even more from your Art Points (Self-dependent).",
            cost: new Decimal(25000),
            effect() {
                let power = new Decimal(player.art.points.add(3.8).log(3.8))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        22: {
            title: "Art Booster 2",
            description: "Boost Art Point gain even more from your Skills.",
            cost: new Decimal(2.5e8),
            effect() {
                let power = new Decimal(player.points.add(6.2).log(6.2))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        23: {
            title: "Art Booster 3",
            description: "Boost Art Point gain even more from your Art Machine 3's amount",
            cost: new Decimal(1e18),
            effect() {
                let power = getBuyableAmount('art', 12).times(3).add(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (true)
            },
        },
        24: {
            title: "Anrokku! 2",
            description: "Unlock Art Machine 4",
            cost: new Decimal(1e83),
            unlocked(){
                return (true)
            },
        },
        31: {
            title: "Booster Booster 1",
            description: "Booster scaling is reduced based on your Art Points.",
            cost: new Decimal(1e80),
            effect() {
                let power = player.art.points.add(10).log(10).div(825).add(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (player.boo.unlocked)
            },
        },
        32: {
            title: "Booster Strength",
            description: "Booster effect is boosted based on your Skills.",
            cost: new Decimal(1e205),
            effect() {
                let power = player.points.add(1).log(10).times(3.2).add(1)
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (player.boo.unlocked)
            },
        },
        33: {
            title: "Booster Booster 2",
            description: "Booster effect is boosted based on your unspent Enhancers.",
            cost: new Decimal(1e225),
            effect() {
                let power = player.en.points.add(1).pow(7)
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (player.en.unlocked)
            },
        },
        34: {
            title: "Anrokku! 3",
            description: "Unlock Art Machine 5.\n\ Requires 1e20 total Capsules.",
            cost: new Decimal('1e1680'),
            canAfford(){
                return (player.art.points.gte('1e1680') && player.c.total.gte(1e20))
            },
            unlocked(){
                return (player.boo.unlocked)
            },
        },
        41: {
            title: "Anrokku! 4",
            description: "Unlock Art Enhancer 3.\n\ Requires 10 total Capsules.",
            cost: new Decimal('1e474'),
            canAfford(){
                return (player.art.points.gte('1e474') && player.c.total.gte(10))
            },
            unlocked(){
                return (player.en.unlocked)
            },
        },
        42: {
            title: "Anrokku! 5",
            description: "Unlock Art Enhancer 4.",
            cost: new Decimal('1e9999'),
            unlocked(){
                return (player.en.unlocked)
            },
        },
        43: {
            title: "Anrokku! 6",
            description: "Unlock Art Enhancer 5.",
            cost: new Decimal('1e999999'),
            unlocked(){
                return (player.en.unlocked)
            },
        },

    },
    buyables: {
        11: {
            title: "Art Machine 1",
            cost(x) { 
                let cost = new Decimal(6).pow(x)
                cost = softcap(cost, new Decimal(1e8), new Decimal(1.02).pow(x.minus(10)))
                cost = cost.div(tmp.art.buyables[21].effect)
                return cost 
            },
            effect(x){
                let power = new Decimal(2).pow(x)
                if (hasUpgrade('boo', 11)) power = new Decimal(upgradeEffect('boo', 11)).pow(x)
                power = power.times(tmp.en.buyables[12].effect)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Raising skill gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Art Machine 2",
            cost(x) { 
                let cost = new Decimal(225).times(new Decimal(7).pow(x))
                cost = softcap(cost, new Decimal(1e18), new Decimal(1.013).pow(x.minus(18)))
                cost = cost.div(tmp.art.buyables[21].effect)
                return cost 
            },
            effect(x){
                let power = new Decimal(3).pow(x)
                if (hasUpgrade('boo', 12)) power = new Decimal(upgradeEffect('boo', 12)).pow(x)
                power = power.times(tmp.en.buyables[12].effect)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Raising Art Point effect by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (player.art.best.gte(100) || player.boo.best.gte(5))
            },
        },
        13: {
            title: "Art Machine 3",
            cost(x) { 
                let cost = new Decimal(5e12).times(new Decimal(10).pow(x))
                cost = softcap(cost, new Decimal(1e28), new Decimal(1.012).pow(x.minus(15)))
                cost = cost.div(tmp.art.buyables[21].effect)
                return cost 
            },
            effect(x){
                let power = new Decimal(2.25).pow(x)
                if (hasUpgrade('boo', 13)) power = new Decimal(upgradeEffect('boo', 13)).pow(x)
                power = power.times(tmp.en.buyables[12].effect)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Raising Art Point gain by x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 14))
            },
        },
        21: {
            title: "Art Machine 4",
            cost(x) { 
                let cost = new Decimal(1e83).times(new Decimal(1e10).pow(x))
                cost = softcap(cost, new Decimal(1e163), new Decimal(1.024).pow(x.minus(8)))
                return cost 
            },
            effect(x){
                let power = new Decimal(1e8).pow(x)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Reduce all of the previous Machine's prices by /" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 24))
            },
        },
        22: {
            title: "Art Machine 5",
            cost(x) { 
                let cost = new Decimal('1e1680').times(new Decimal(1e100).pow(x))
                cost = softcap(cost, new Decimal('1e2400'), new Decimal(1.08).pow(x.minus(9)))
                return cost 
            },
            effect(x){
                let power = new Decimal(1).add(new Decimal(0.3).times(x.pow(0.9)))
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + " \n\
                Boost Miki's Capsule effect by ^" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost())},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (hasUpgrade('art', 34))
            },
        },

    },
    clickables :{
    },
    layerShown(){return true},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "buyables"
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "upgrades"
            ],
            unlocked() {
                return (player.art.best.gte(1000) || player.boo.best.gte(1) || player.en.best.gte(1))
            }

        },
    },
    canBuyMax (){
        return (true)
    },
    automate() {
        if (player.art.auto1 == true && hasMilestone('boo', 0)) {
            buyBuyable('art', 11)
            buyBuyable('art', 12)
            buyBuyable('art', 13)
        }
        if (player.art.auto1 == true && hasMilestone('en', 0)) {
            buyBuyable('art', 21)
        }
    },
    passiveGeneration() {
        return hasMilestone("boo", 1) ? 1:0
        },

    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('boo', 2)) keep.push("upgrades")
        if (hasMilestone('boo', 2)) keep.push("buyables")
        if (layers[resettingLayer].row > this.row) layerDataReset("art", keep)
    },
    resetsNothing(){
        hasMilestone('c', 5)
    }

})

