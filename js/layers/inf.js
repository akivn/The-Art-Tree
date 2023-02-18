addLayer("inf", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    softcap: new Decimal(1e4),
    softcapPower: new Decimal(0.22),
    requires: new Decimal(2).pow(1024), // Can be a function that takes requirement increases into account
    resource: "Infinity points", // Name of prestige currency
    baseResource: "Enhanced Energy", // Name of resource prestige is based on
    baseAmount() { return player.en.energy }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.009, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('inf', 41)) mult = mult.times(upgradeEffect('inf', 41))
        mult = mult.times(tmp.inf.buyables[51].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    effect() {
        let effect = new Decimal(1).add(player.inf.total)
        return effect
    },
    effectDescription() {
        return "based on your total points (" + format(player[this.layer].total) + "), they are boosting Enhanced Energy and Enhance Point gain by x" + format(tmp[this.layer].effect)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "C: Crunch for Infinity Points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    canReset() {
        return !player.inf.points.gte('1.79e308') && player.en.energy.gte(Decimal.pow(2, 1024))
    },
    upgrades: {
        11: {
            title: "Art 1",
            description: "Art Machine 1's price is 30% cheaper logarithmically.",
            cost: new Decimal(1),
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        21: {
            title: "Art 2",
            description: "Art Machine 2's power is boosted based on Reincarnation effect.",
            cost: new Decimal(1),
            effect() {
                let power = new Decimal(tmp.rein.effect.add(10).log(10).div(135)).add(1)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 11))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        31: {
            title: "Art 3",
            description: "Unspent Infinity Point boost Art Point gain.",
            effect() {
                let power = new Decimal(10).pow(player.inf.points.add(2).log(2).times(16))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
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
            cost: new Decimal(20),
            effect() {
                let power = player.art.points.add(10).log(10).div(10000).ceil()
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
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 11))
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
            cost: new Decimal(40),
            effect() {
                let power = new Decimal(1).div(player.art.points.add(11).log(10).div(10000).add(1))
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
            description: "Gain a ^1.04 boost to all Enhancers, and Enhancers are now autobought.",
            cost: new Decimal(1),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 12))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        23: {
            title: "Enh 2",
            description: "Enhanced Energy Effect is boosted by Infinity Points (Softcaps after ^10), and start with 1 Enhance Point after crunching.",
            cost: new Decimal(10),
            effect() {
                let power = player.inf.points.add(1).pow(0.5)
                power = softcap(power, new Decimal(10), 0.4)
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
            cost: new Decimal(75),
            effect() {
                let power = player.inf.points.add(1).pow(3)
                power = softcap(power, new Decimal(1e40), 0.4)
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
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
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 13))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        44: {
            title: "Unl 2",
            description: "Unlock Challenges.",
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
            cost: new Decimal(1e6),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 24))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
        24: {
            title: "WATASHI NO ENHANCE, ANROKKU!",
            description: "BREAK Infinity.",
            cost: new Decimal(1e4),
            canAfford() {
                return (player[this.layer].points.gte(tmp[this.layer].upgrades[this.id].cost) && hasUpgrade(this.layer, 14))
            },
            unlocked() {
                return (player.inf.total.gte(1) && player.inf.pageNumber.equals(1))
            },
        },
    },
    buyables: {
        51: {
            title: "2x IP",
            cost(x) {
                let cost = new Decimal(10).times(x.add(2))
                return cost
            },
            effect(x) {
                let power = new Decimal(2).pow(x)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Infinity Points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Currently: " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    challenges: {
        11: {
            name: "Yuiki Yaya",
            challengeDescription: "Enhance point boost to Enhanced Energy is disabled, and Enhance Upgrade 4's boost is raised to ^0.06.",
            goalDescription: "Infinite Enhance Energy",
            rewardDescription: "Gain a ^1.1 boost to Enhance point boost, and unlock Enhance Upgrade Autobuyer.",
            canComplete: function() {
            return player.en.energy.gte(Decimal.pow(2, 1024))
            },
        },

    },
    clickables: {
    },
    layerShown() { return true },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "upgrades"
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "challenges"
            ],
            unlocked() {
                return (hasUpgrade('inf', 44))
            }

        },
    },
    automate() {
    },
    passiveGeneration() {
        return false
    },

    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("inf", keep)
    },
    resetsNothing() {

    }

})

