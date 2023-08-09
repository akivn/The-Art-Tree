addLayer("rein", {
    name: "Reincarnation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: [
		["srein", function() { return player.srein.best.gte(1) ? "#ffffff" : "#505050" }, 20],


	],
    color: "#F5CCA0",
    requires: new Decimal(3e8), // Can be a function that takes requirement increases into account
    resource: "Reincarnations", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.04, // Prestige currency exponent
    softcap: new Decimal(100),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for 'Reins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), (player[this.layer].points.add(1)).pow(1.8))
        if (hasAchievement('ac', 163)) effect = effect.times(40000)
        if (hasUpgrade('inf', 12)) effect = Decimal.max(new Decimal(1), new Decimal(10).pow(player[this.layer].points.add(1).log(1.21)))
        if (hasUpgrade('art', 33)) effect = effect.times(3)
        effect = effect.times(tmp.chal.effect)
        effect = effect.pow(buyableEffect('art', 13))
        if (inChallenge('chal', 22)) effect = new Decimal(1)
        if (inChallenge('chal', 22)) effect = effect.times(tmp.chal.effect.pow(2))
        if (inChallenge('chal', 31)) effect = new Decimal(1)
        if (inChallenge('chal', 31)) effect = effect.times(tmp.chal.effect)
        if (hasChallenge('chal', 22)) effect = effect.pow(2)
        if (hasAchievement('ac', 131)) effect = effect.pow(1.01)
        effect = softcap(effect, new Decimal(1e50), new Decimal(1).div(effect.add(10).log(10).log(10).div(0.6)))
        effect = effect.pow(tmp.srein.effect)
        if (hasUpgrade('schal', 22)) effect = effect.pow(1.70)
        if (inChallenge('schal', 31)) effect = new Decimal(1)
        return effect
    },
    effectDescription(){
        return "boosting skill and Art point gain by x" + format(tmp[this.layer].effect)        
    },
<<<<<<< Updated upstream
    upgrades:{
=======
    milestones: {
        0: {
            requirementDescription: "5 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(5) },
            effectDescription: "Art Machines that cost previous Art Machines no longer resets the previous Art Machines,\n\ and unlock 2 new Art Upgrades.",
        },
        1: {
            requirementDescription: "7 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(7) },
            effectDescription: "Reincarnation no longer resets your upgrades and Art Machines.",
        },
        2: {
            requirementDescription: "8 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(8) },
            effectDescription: "Unlock 4 new Reincarnation Upgrades.",
        },
        3: {
            requirementDescription: "10 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(10) },
            effectDescription: "Passively gain 100% of the pending Art Points per second.",
        },
        4: {
            requirementDescription: "12 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(12) },
            effectDescription: "Get an autobuyer for Art Machines 1, 2 and 3.",
            toggles: [
                ["art", "auto"]
            ],

        },
        5: {
            requirementDescription: "17 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(17) },
            effectDescription: "You can buy max Reincrnations.",
        },
        6: {
            requirementDescription: "100 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(100) },
            effectDescription: "Reincarnation reset nothing.",
        },

    },
    upgrades: {
>>>>>>> Stashed changes
        11: {
            title: "Self-Reproduction",
            description: "Infinite Generator 1's production boost itself.",
            cost: new Decimal(1e14),
            effect() {
                let power = new Decimal(1).add(buyableEffect('inf', 11).add(1).log(7.5))
                if (inChallenge('schal', 22)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        12: {
            title: "Reinforcement",
            description: "Increase the base of the Super-Reincarnation based on your Reincarnations.",
            cost: new Decimal(1.7e15),
            effect() {
                let power = new Decimal(1.169).add(player.rein.points.log(10).div(306))
                if (inChallenge('schal', 22)) power = new Decimal(1.14)
                return power
            },
            effectDisplay() { return "Base 1.169 >> " + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        13: {
            title: "Multi-Purpose III",
            description: "IG1 base production boost Infinity Point gain.",
            cost: new Decimal(1e17),
            effect() {
                let power = buyableEffect('inf', 11)
                if (inChallenge('schal', 22)) power = new Decimal(1)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        14: {
            title: "Motivation VI",
            description: "Art Machine 6 is 3x stronger.",
            cost: new Decimal(1e18),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        21: {
            title: "Multi-Purpose IV",
            description: "Boost IG1's base production based on your Infinity Points.",
            cost: new Decimal(1.6e18),
            effect() {
                let power = new Decimal(1.005).pow(player.inf.points.log(10))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        22: {
            title: "Ultimate Magic",
            description: "Magic Effect is another 45% stronger (^1.45).",
            cost: new Decimal(1e20),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        23: {
            title: "Talia Mar",
            description: "Looks like you're getting helped by someone! Gain a 100% boost to all IGs (16x total to IG1).",
            cost: new Decimal(2.5e20),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        24: {
            title: "Ultimate Magic II",
            description: "Super-Magic effect is 22% stronger.",
            cost: new Decimal(1e22),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        31: {
            title: "Multi-Purpose V",
            description: "Art Machine 6 now also boost Art Machine 2's base.",
            cost: new Decimal(2e22),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        32: {
            title: "Reinforcement II",
            description: "Boost the effect of Art Upgrade 22 based on your Infinity Points.",
            cost: new Decimal(1.2e23),
            effect() {
                let power = new Decimal(1.001).pow(player.inf.points.add(10).log(4e5)).minus(1)
                power = softcap(power, new Decimal(0.2), new Decimal(1).div(power.add(1)))
                return power
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id))},
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        33: {
            title: "Reinforcement III",
            description: "Boost the base addition of Art Machine 6 based on your Super-Reincarnation Points.",
            cost: new Decimal(5e24),
            effect() {
                let power = new Decimal(1.1).pow(player.srein.points.add(1).log(2))
                power = softcap(power, new Decimal(1.6), new Decimal(1).div(power.add(-0.6)))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"},
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
        34: {
            title: "Other Times Await...",
            description: "I need to go eternal.",
            cost: new Decimal(5e26),
            unlocked(){
                return (hasChallenge('schal', 12))
            },
        },
    },
    milestones: {
        0: {requirementDescription: "5 Reincarnations",
            done() {return player[this.layer].best.gte(5)}, // Used to determine when to give the milestone
            effectDescription: "Unlock autobuyer for Art Machines 1 and 2, and unlock 4 new upgrades.",
            toggles: [
                ["art", "auto_am12"]
            ],

        },
        1: {requirementDescription: "7 Reincarnations",
            done() {return player[this.layer].best.gte(7)}, // Used to determine when to give the milestone
            effectDescription: "Keep all Art Upgrades while being reincaranated.",

        },
        2: {requirementDescription: "9 Reincarnations",
            done() {return player[this.layer].best.gte(9)}, // Used to determine when to give the milestone
            effectDescription: "Passively gain 50% of pending Art points per second.",

        },
        3: {requirementDescription: "19 Reincarnations",
            done() {return player[this.layer].best.gte(19)}, // Used to determine when to give the milestone
            effectDescription: "Unlock autobuyer for Art Machine 3, bundled with the previous autobuyer for #1 and #2.",
            unlocked() {
                return player.chal.points.gte(1) || player.inf.best.gte(1)
            },
        },
        4: {requirementDescription: "24 Reincarnations",
            done() {return player[this.layer].best.gte(24)}, // Used to determine when to give the milestone
            effectDescription: "Keep Art Machines on reincarnation and competition resets.",
            unlocked() {
                return player.chal.points.gte(1) || player.inf.best.gte(1)
            },
        },
        5: {requirementDescription: "30 Reincarnations",
           done() {return player[this.layer].best.gte(30)}, // Used to determine when to give the milestone
            effectDescription: "Passively generate 100% of pending Magics per second.",
            unlocked() {
            return player.chal.points.gte(1) || player.inf.best.gte(1)
            },
        },
        6: {requirementDescription: "10,000 Reincarnations",
           done() {return player[this.layer].best.gte(1e4)}, // Used to determine when to give the milestone
            effectDescription: "Passively generate 10% of pending Infinity Points per second.",
            unlocked() {
            return player.inf.best.gte(1)
            },
        },
        7: {requirementDescription: "1e15 Reincarnations",
           done() {return player[this.layer].best.gte(1e15)}, // Used to determine when to give the milestone
            effectDescription: "Keep Reincarnation upgrades when doing Row 3 resets.",
            unlocked() {
            return hasChallenge('schal', 12)
            },
        },
        
},

    layerShown(){return hasUpgrade('art', 24) || player[this.layer].points.gte(1) || player.inf.best.gte(1) || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "milestones",
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
            unlocked() {
                return (hasChallenge('schal', 12))
            }
        },
        
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('inf', 2)) keep.push("milestones")
        if (hasMilestone('rein', 7)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("rein", keep)
    },

})