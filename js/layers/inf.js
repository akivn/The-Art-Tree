addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
<<<<<<< Updated upstream
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
=======
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            auto: true,
            pageNumber: new Decimal(1),
        }
    },
    color: "#FF9852",
    branches: [
    ],
    softcap: new Decimal(150),
    softcapPower: new Decimal(0.1),
    requires: new Decimal(2).pow(1024), // Can be a function that takes requirement increases into account
    resource: "Infinity points", // Name of prestige currency
    baseResource: "Enhanced Energy", // Name of resource prestige is based on
    baseAmount() { return player.en.energy }, // Get the current amount of baseResource
>>>>>>> Stashed changes
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0105, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
<<<<<<< Updated upstream
        if (hasUpgrade('art', 45)) mult = mult.times(upgradeEffect('art', 45))
        if (hasUpgrade('rein', 13)) mult = mult.times(upgradeEffect('rein', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        pow = new Decimal(1).times(tmp.ipow.effect)
        return pow
=======
        if (hasUpgrade('inf', 41)) mult = mult.times(upgradeEffect('inf', 41))
        return mult
    },
    directMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.inf.buyables[51].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    effect() {
        let effect = new Decimal(1).add(player.inf.total)
        effect = softcap(effect, new Decimal(1000), Decimal.pow(0.65, effect.add(10).log(10).pow(0.3)))
        return effect
    },
    effectDescription() {
        return "based on your total points (" + format(player[this.layer].total) + "), they are boosting Enhanced Energy and Enhance Point gain by x" + format(tmp[this.layer].effect)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
            cost: new Decimal(2),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 21))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        41: {
            title: "Art 4",
            description: "Gain more Infinity Points based on Art Points.",
            cost: new Decimal(40),
            effect() {
                let power = player.art.points.add(10).log(10).div(10000).ceil().add(1)
                power = softcap(power, new Decimal(10), 0.8)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 31))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        12: {
            title: "Rein 1",
            description: "Reincarnation effect is squared.",
            cost: new Decimal(1),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        22: {
            title: "Rein 2",
            description: "Reincarnation scaling is reduced based on Infinity Points.",
            cost: new Decimal(4),
            effect() {
                let power = new Decimal(1).div(player.inf.points.add(11).log(10).pow(2))
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 12))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        32: {
            title: "Rein 3",
            description: "Reincarnation upgrade 3's charging speed is boosted by Infinity Points.",
            cost: new Decimal(25),
            effect() {
                let power = new Decimal(1).times(player.inf.points.add(1.25).pow(2))
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 22))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        42: {
            title: "Rein 4",
            description: "Reincarnation scaling is reduced based on Art Points.",
            cost: new Decimal(150),
            effect() {
                let power = new Decimal(1).div(player.art.points.add(11).log(10).div(400000).add(1))
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 32))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        13: {
            title: "Enh 1",
            description: "Gain a ^1.01 boost to all Enhancers, and Enhancers are now autobought.",
            cost: new Decimal(1),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost))
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
            title: "Enh 2",
            description: "Enhanced Energy Effect is boosted by Infinity Points (Softcaps after ^2.25), and start with 1 Enhance Point after crunching.",
            cost: new Decimal(20),
            effect() {
                let power = player.inf.points.add(1).pow(0.5).div(10).add(1)
                power = softcap(power, new Decimal(2.25), Decimal.pow(0.4, power.pow(0.2).minus(1)))
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 13))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        33: {
            title: "Enh 3",
            description: "The Passive gain of Enhance Point is 100x stronger.",
            cost: new Decimal(25),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 23))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        43: {
            title: "Enh 4",
            description: "Enhance point gain is boosted by IP (Softcaps at 1e40x).",
            cost: new Decimal(300),
            effect() {
                let power = player.inf.points.add(1)
                power = softcap(power, new Decimal(1e40), 0.4)
                return power
            },
            effectDisplay() { return "x" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 33))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        14: {
            title: "Unl 1",
            description: "Keep all Reincarnation Milestones and Upgrades when crunching.",
            cost: new Decimal(1),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        44: {
            title: "Unl 4",
            description: "Unlock Scalings.",
            cost: new Decimal(1e8),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 34))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        34: {
            title: "Unl 3",
            description: "Unlock 2x IP Upgrade, and Autobuy Reincarnation.",
            cost: new Decimal(50000),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 24))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        24: {
            title: "Unl 2",
            description: "BREAK Infinity.",
            cost: new Decimal(625),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 14))
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        11: {
            title: "Infinite Generator 1",
            cost(x) { 
                let cost = new Decimal(1).times(new Decimal(2).pow(x))
                return cost 
=======
        51: {
            title: "2x IP",
            cost(x) {
                let cost = new Decimal(1e2).times(Decimal.pow(10, (x.add(2))))
                return cost
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            unlocked(){
                return (true)
=======
        },
    },
    challenges: {
        11: {
            name: "Yuiki Yaya",
            challengeDescription: "Enhance point boost to Enhanced Energy is disabled, and Enhance Upgrade 4's boost is raised to ^0.06.",
            goalDescription: "1e195,000 skills",
            rewardDescription: "Gain a ^1.03 boost to Enhance point gain.",
            canComplete: function () {
                return player.points.gte('1e195000')
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

    layerShown(){return hasUpgrade('art', 51) || player.inf.best.gte(1) || player.eter.best.gte(1)},
=======
    clickables: {
    },
    layerShown() { return player.en.energy.gte(new Decimal(2).pow(900)) || player.inf.total.gte(1) },
>>>>>>> Stashed changes
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
        },
<<<<<<< Updated upstream
        "Generators": {
            content: [
                "main-display",
                "buyables",
            ]
=======
        "Challenges & Others": {
            content: [
                "main-display",
                "prestige-button",
                ['display-text', function () { return `Buyables` }, { 'font-size': '32.4px', 'color': 'silver' }],
                "buyables",
                ['display-text', function () { return `Challenges` }, { 'font-size': '32.4px', 'color': 'silver' }],
                "challenges"
            ],
            unlocked() {
                return (hasUpgrade('inf', 34))
            }

>>>>>>> Stashed changes
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