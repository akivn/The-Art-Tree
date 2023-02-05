addLayer("en", {
    name: "Enhancer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#7A2189",
    branches: [

    ],
    requires: new Decimal(1e216), // Can be a function that takes requirement increases into account
    resource: "Enhancers", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() { return player.art.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.018, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.c.buyables[13].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "e", description: "E: Reset for Enhancers", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), new Decimal(1))
        return effect
    },
    canReset() {
        return !player.en.points.gte('1.79e308') && player.art.points.gte(1e216)
    },
    upgrades: {
        11: {
            title: "Exponentiation 1",
            description: "Boost Art point effect even more from your Enhancers.",
            cost: new Decimal(1e24),
            effect() {
                let power = new Decimal(1).add(player.en.points.add(5).log(5).add(4).log(5).div(12))
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('c', 4))
            },
        },
        12: {
            title: "Multiplication 1",
            description: "Boost Capsule gain even more based on your Skills.",
            cost: new Decimal(1e38),
            effect() {
                let power = new Decimal(2).pow(player.points.add(10).log(10).div(300))
                power = softcap(power, new Decimal(1e6), 0.351)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (hasMilestone('c', 4))
            },
        },
        13: {
            title: "Addition 1",
            description: "Boost Booster Upgrade 3's effect based your Capsule Amount.",
            cost: new Decimal(1e91),
            effect() {
                let power = (player.c.points.add(10).log(10).div(13))
                return power
            },
            effectDisplay() { return "+" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('c', 4))
            },

        },
    },
    milestones: {
        0: {
            requirementDescription: "3 Enhancers",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(3) },
            effectDescription: "Unlock the autobuyer for Art Machine 4 (Bundled into the Previous Art Machine ABs).",

        },
        1: {
            requirementDescription: "1e42 Enhancers",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(1e42) },
            effectDescription: "Keep Enhancer upgrades after Row-3 Resets.",

        },
        2: {
            requirementDescription: "1e91 Enhancers",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(1e91) },
            effectDescription: "Automatically prestige Boosters.",
            toggles: [
                ["boo", "auto2"]
            ],
        },
    },
    buyables: {
        11: {
            title: "Art Enhancer 1",
            cost(x) {
                let cost = new Decimal(5).pow(x)
                cost = softcap(cost, new Decimal(1e15), new Decimal(1.025).pow(x.minus(15)))
                return cost
            },
            effect(x) {
                let power = x.pow(0.8)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Enhancers\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Raising Booster Base by +" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Art Enhancer 2",
            cost(x) {
                let cost = new Decimal(12000).times(new Decimal(25).pow(x))
                cost = softcap(cost, new Decimal(1e15), new Decimal(1.12).pow(x.minus(9)))
                return cost
            },
            effect(x) {
                let power = new Decimal(3.1627766e4).pow(x)
                power = softcap(power, new Decimal(1e40), new Decimal(1).div(x.div(9)))
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Enhancers\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Machines 1-3's effect x" + format(buyableEffect(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 11).gte(5) || getBuyableAmount(this.layer, this.id).gte(1))
            }
        },
        13: {
            title: "Art Enhancer 3",
            cost(x) {
                let cost = new Decimal(500000).times(new Decimal(40).pow(x))
                cost = softcap(cost, new Decimal(1e15), new Decimal(1.016).pow(x.minus(6)))
                return cost
            },
            effect(x) {
                let power = new Decimal(3.6).pow(x)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " Enhancers\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Gain " + format(buyableEffect(this.layer, this.id)) + "x more Capsules"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('art', 41) || getBuyableAmount(this.layer, this.id).gte(1))
            }
        },

    },
    clickables: {
    },
    layerShown() { return player.art.best.gte(1e200) || player.c.best.gte(1) || player.en.best.gte(1) },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "buyables"
            ],
        },
        "Upgrades & Misc": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "milestones",
                "upgrades"
            ],
        },
    },
    canBuyMax() {
        return (true)
    },
    automate() {
    },
    passiveGeneration() {
    },

    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("c", 3)) keep.push("buyables")
        if (hasMilestone("en", 1)) keep.push("upgrades")
        if (hasMilestone('c', 6)) keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset("en", keep)
    },

})