addLayer("art", {
    name: "Art", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            auto: true,
        }
    },
    color: "#739DBF",
    branches: [
        ["rein", function () { return player.rein.unlocked ? "#606060" : "#d0d0d0" }, 18],
        ["en", function () { return player.en.unlocked ? "#606060" : "#d0d0d0" }, 18],
    ],
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Art points", // Name of prestige currency
    baseResource: "Skills", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.rein.effect)
        mult = mult.times(tmp.art.buyables[12].effect)
        if (hasUpgrade('art', 12)) mult = mult.times(upgradeEffect('art', 12))
        if (hasUpgrade('en', 23)) mult = mult.times(upgradeEffect('en', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "a", description: "A: Reset for Art points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), player[this.layer].points.add(1).pow(0.5))
        if (hasUpgrade('art', 21)) effect = Decimal.max(new Decimal(1), player[this.layer].points.add(1).pow(upgradeEffect('art', 21)))
        return effect
    },
    effectDescription() {
        return "boosting skill gain by x" + format(tmp[this.layer].effect)
    },
    canReset() {
        return !player.art.points.gte('1.79e308') && player.points.gte(10)
    },
    upgrades: {
        11: {
            title: "Start",
            description: "Double your skill gain per second.",
            cost: new Decimal(3),
            unlocked() {
                return (true)
            },
        },
        12: {
            title: "Initialize!",
            description: "Gain more Art Points based on your skill.",
            cost: new Decimal(15),
            effect() {
                let power = new Decimal(player.points.add(4).log(4))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (hasUpgrade('art', 11))
            },
        },
        13: {
            title: "Draw!",
            description: "Skill gain is boosted by itself.",
            cost: new Decimal(100),
            effect() {
                let power = new Decimal(player.points.add(3.2).log(3.2))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (hasUpgrade('art', 12))
            },
        },
        14: {
            title: "Start your Career!",
            description: "Unlock Art Machines.",
            cost: new Decimal(500),
            unlocked() {
                return (hasUpgrade('art', 13))
            },
        },
        21: {
            title: "Reinforcement",
            description: "Art Point effect is boosted by Art Machine 2's amount.",
            cost: new Decimal(1e11),
            effect() {
                let power = new Decimal(0.5).add((getBuyableAmount(this.layer, 12).add(1.4).log(1.4)).times(0.02))
                if (hasUpgrade('en', 13)) power = power.add(0.06)
                if (power.gte(0.9)) power = new Decimal(0.9)
                return power
            },
            effectDisplay() { return "^0.5 -> ^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasUpgrade('art', 14))
            },
        },
        22: {
            title: "Unlock!",
            description: "Unlock the next layer.",
            cost: new Decimal(1e15),
            unlocked() {
                return (hasUpgrade('art', 14))
            },
        },
        23: {
            title: "Reinforcement",
            description: "Your Skills boost Art Machine 1's effect base.",
            cost: new Decimal(3e28),
            effect() {
                let power = new Decimal(2).add((player.points.add(10).log(10)).times(0.015))
                return power
            },
            effectDisplay() { return "Base 2 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('rein', 0))
            },
        },
        24: {
            title: "New Friends!",
            description: "Unlock Art Machine 3.",
            cost: new Decimal(1e50),
            unlocked() {
                return (hasMilestone('rein', 0))
            },
        },

    },
    buyables: {
        11: {
            title: "Art Machine 1",
            cost(x) {
                let cost = new Decimal(500).times(new Decimal(2).pow(x))
                cost = softcap(cost, new Decimal(1000), new Decimal(1.01).pow(x))
                return cost
            },
            effect(x) {
                let power = new Decimal(2).pow(x)
                if (hasUpgrade('art', 23)) power = upgradeEffect('art', 23).pow(x)
                power = power.times(tmp.art.buyables[13].effect)
                power = power.times(tmp.en.energy.effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Art points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting skill gain by x" + format(buyableEffect(this.layer, this.id))
                return text
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Art Machine 2",
            cost(x) {
                let cost = new Decimal(10).add(new Decimal(5.4).times(x))
                cost = softcap(cost, new Decimal(10), new Decimal(1.01).pow(x)).floor()
                return cost
            },
            effect(x) {
                let power = new Decimal(4).pow(x)
                if (hasUpgrade('rein', 12)) power = upgradeEffect('rein', 12).pow(x)
                power = power.times(tmp.art.buyables[13].effect)
                power = power.times(tmp.en.energy.effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Art machine 1s\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Point gain by x" + format(buyableEffect(this.layer, this.id))
                if (hasMilestone('rein', 0)) text = "Requires: " + format(data.cost) + " Art machine 1s\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Art Point gain by x" + format(buyableEffect(this.layer, this.id))
                return text
            },
            canAfford() { return getBuyableAmount('art', 11).gte(this.cost()) },
            buy() {
                if (!hasMilestone('rein', 0)) setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (true)
            }
        },
        13: {
            title: "Art Machine 3",
            cost(x) {
                let cost = new Decimal(10).add(new Decimal(2).times(x))
                cost = softcap(cost, new Decimal(10), new Decimal(1.01).pow(x)).floor()
                return cost
            },
            effect(x) {
                let power = new Decimal(100).pow(x)
                if (hasUpgrade('rein', 13)) power = power.pow(upgradeEffect('rein', 13))
                power = power.times(tmp.en.energy.effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Art machine 2s\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting The Previous Upgrades gain by x" + format(buyableEffect(this.layer, this.id))
                if (hasMilestone('rein', 0)) text = "Requires: " + format(data.cost) + " Art machine 1s\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting The Previous Upgrades by x" + format(buyableEffect(this.layer, this.id))
                return text
            },
            canAfford() { return getBuyableAmount('art', 12).gte(this.cost()) },
            buy() {
                if (!hasMilestone('rein', 0)) setBuyableAmount(this.layer, 11, getBuyableAmount(this.layer, 11).sub(this.cost()))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('art', 24))
            }
        },

    },
    clickables: {
    },
    layerShown() { return true },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "upgrades"
            ],
        },
        "Art Machines": {
            content: [
                "main-display",
                "prestige-button",
                "clickables",
                "buyables"
            ],
            unlocked() {
                return (hasUpgrade('art', 14))
            }

        },
    },
    automate() {
        if (hasMilestone('rein', 4) && player.art.auto){
            buyBuyable('art', 11)
            buyBuyable('art', 12)
            buyBuyable('art', 13)
        }
    },
    passiveGeneration() {
        return hasMilestone('rein', 3)? 1:0
    },

    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('rein', 1)) keep.push("upgrades")
        if (hasMilestone('rein', 1)) keep.push("buyables")
        if (layers[resettingLayer].row > this.row) layerDataReset("art", keep)
    },
    resetsNothing() {

    }

})

