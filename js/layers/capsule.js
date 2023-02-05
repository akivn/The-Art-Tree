addLayer("c", {
    name: "Capsule", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            autoc: true
        }
    },
    color: "#20A020",
    branches: [

    ],
    requires: new Decimal('1e423'), // Can be a function that takes requirement increases into account
    resource: "Capsules", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() { return player.art.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.008, // Prestige currency exponent
    softcap: new Decimal(1e4),
    softcapPower: 0.51,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    directMult() {
        mult = new Decimal(1)
        if (hasUpgrade('en', 12)) mult = mult.times(upgradeEffect('en', 12))
        mult = mult.times(tmp.en.buyables[13].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "C: Reset for Capsules", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    effect() {
        let effect = new Decimal(1)
        if (hasMilestone('c', 1)) effect = (player.c.total).add(1).log(10).times(3)
        return effect
    },
    effectDescription() {
        let text = ""
        if (hasMilestone('c', 1)) text = "based on your total Capsules (" + format(player.c.total) + "), they are grinding +" + format(tmp[this.layer].effect) + " Free boosters"
        return text
    },

    canReset() {
        return !player.c.points.gte('1.79e308') && player.art.points.gte('1e423')
    },
    upgrades: {

    },
    buyables: {
        11: {
            title: "Capsule 1 - Miki",
            cost(x) {
                let cost = new Decimal(4).pow(x).times(new Decimal(3).pow(Decimal.add(getBuyableAmount('c', 13), getBuyableAmount('c', 12))))
                if (hasMilestone('c', 4)) cost = new Decimal(4).pow(x)
                cost = softcap(cost, new Decimal(1e40), new Decimal(1.03).pow(x.minus(35)))
                cost = softcap(cost, new Decimal(1e12), 3)
                return cost
            },
            effect(x) {
                let power = new Decimal(1e15).pow(x)
                power = power.pow(tmp.art.buyables[22].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Capsules\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies skill gain by " + format(buyableEffect(this.layer, this.id)) + "x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Capsule 2 - Kuuta",
            cost(x) {
                let cost = new Decimal(6).pow(x).times(new Decimal(3).pow(Decimal.add(getBuyableAmount('c', 11), getBuyableAmount('c', 13))))
                if (hasMilestone('c', 4)) cost = new Decimal(6).pow(x)
                cost = softcap(cost, new Decimal(1e12), 3)
                cost = softcap(cost, new Decimal(1e40), new Decimal(1.03).pow(x.minus(27)))
                return cost
            },
            effect(x) {
                let power = new Decimal(1).add(new Decimal(0.15).times(x))
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Capsules\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Reduces Booster scaling by " + format(buyableEffect(this.layer, this.id)) + "x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            title: "Capsule 3 - Kanata",
            cost(x) {
                let cost = new Decimal(10).times(new Decimal(8).pow(x).times(new Decimal(3).pow(Decimal.add(getBuyableAmount('c', 11), getBuyableAmount('c', 12)))))
                if (hasMilestone('c', 4)) cost = new Decimal(10).times(new Decimal(8).pow(x))
                cost = softcap(cost, new Decimal(1e12), 3)
                cost = softcap(cost, new Decimal(1e40), new Decimal(1.03).pow(x.minus(23)))
                return cost
            },
            effect(x) {
                let power = new Decimal(10).pow((x).pow(0.92))
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Capsules\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Gain " + format(buyableEffect(this.layer, this.id)) + "x more Enhancers"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasMilestone('c', 3)
            }
        },
        respec() {
            setBuyableAmount(this.layer, 11, new Decimal(0))
            setBuyableAmount(this.layer, 12, new Decimal(0))
            setBuyableAmount(this.layer, 13, new Decimal(0))
            player.c.points = player.c.total
        }
    },
    clickables: {

    },
    milestones: {
        0: {
            requirementDescription: "1 Total Capsule",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(1) },
            effectDescription: "Reduce the requirement of Booster Milestone 1 to 1, and get 100x more Art Points.",

        },
        1: {
            requirementDescription: "3 Total Capsule",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(3) },
            effectDescription: "Capsules gains a new effect.",

        },
        2: {
            requirementDescription: "4 Total Capsules",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(4) },
            effectDescription: "Keep All Booster Milestone and Art Upgrades on Row-3 Resets",

        },
        3: {
            requirementDescription: "50 Total Capsules",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(50) },
            effectDescription: "Keep All Booster upgrades and Enhancers on Row-3 Resets, and unlock a new Capsule.",

        },
        4: {
            requirementDescription: "1e10 Total Capsules",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(1e10) },
            effectDescription: "Time Capsule cost increase multiplier is disabled, and unlock 8 new upgrades in Enhancers.",

        },
        5: {
            requirementDescription: "1e14 Total Capsules",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(1e14) },
            effectDescription: "Row 3 resets reset nothing in Row 1.",

        },
        6: {
            requirementDescription: "1e24 Total Capsules",
            unlocked() { return true },
            done() { return player[this.layer].total.gte(1e24) },
            effectDescription: "Keep all Enhancer Milestones on Row-3 Reset, and unlock Capsule Autobuyer.",
            toggles: [
                ["c", "autoc"]
            ],


        },
    },
    layerShown() { return player.art.best.gte('1e400') || player.c.best.gte(1) },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                ['display-text', function () { return `Every purchase of a Capsule makes every capsules cost 3x more.` }, { 'font-size': '16.2px', 'color': 'white' }],
                "buyables"
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "milestones"
            ],
        },
    },
    automate() {
        if (hasMilestone('c', 6) && player.c.autoc == true) {
            buyBuyable('c', 11)
            buyBuyable('c', 12)
            buyBuyable('c', 13)
        }
    },
    passiveGeneration() {
    },

    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("c", keep)
    },

})