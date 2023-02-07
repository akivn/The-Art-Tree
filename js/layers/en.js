addLayer("en", {
    name: "Enhancers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            auto: true,
            energy: new Decimal(0),
        }
    },
    color: "#A933C9",
    branches: [
    ],
    requires: new Decimal('1e350'), // Can be a function that takes requirement increases into account
    resource: "Enhance Points", // Name of prestige currency
    baseResource: "Skills", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.009, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
    canReset() {
        return !player[this.layer].points.gte('1.79e308') && player.points.gte('1e350')
    },
    energy: {
        perSecond() {
            let base = tmp.en.buyables[11].effect
            if (player.en.energy.gte(Decimal.pow(2,1024))) base = new Decimal(0)
            return base;
        },
        effect() {
            let pow = (player.en.energy.add(1)).pow(3.75)
            if (hasUpgrade('en', 14)) pow = pow.pow(2)
            return pow
        }
    },
    update(delta) {
        player.en.energy = player.en.energy.plus(Decimal.times(tmp.en.energy.perSecond, delta));
        if (player.en.energy.gte(Decimal.pow(2, 1024))) player.en.energy = Decimal.pow(2, 1024)
    },
    upgrades: {
        11: {
            title: "Shoot Up the Sky!",
            description: "The effect of Rein. Upgrades 2 and 3 are gained faster based on your Art Points.",
            cost: new Decimal(1e3),
            effect() {
                let power = new Decimal(player.art.points.add(10).log(10).div(275).add(1))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        12: {
            title: "Enpower!",
            description: "Gain more Enhanced Energy based on your Reincarnations.",
            cost: new Decimal(1e4),
            effect() {
                let power = new Decimal(player.rein.points.pow(3))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        13: {
            title: "More Enpower!",
            description: "Gain more Enhanced Energy based on your skills.",
            cost: new Decimal(5e5),
            effect() {
                let power = new Decimal(player.points.add(10).log(10).div(25).add(1)).pow(3)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        14: {
            title: "Enhance the Enhance!",
            description: "Enhance Energy effect is squared, and unlock Enhancer 4.",
            cost: new Decimal(1e7),
            unlocked() {
                return (true)
            },
        },
        21: {
            title: "More Enpower!",
            description: "Enhance Points boost skill gain.",
            cost: new Decimal(1e13),
            effect() {
                let power = new Decimal(player.en.points.pow(6))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        22: {
            title: "Passive Gain",
            description: "Enhanced Energy gain is boosted based on the time you spent in this Reincarnation and your Art Points (The effect from time caps at ~20s).",
            cost: new Decimal(2.5e14),
            effect() {
                let power = new Decimal(player.rein.resetTime).times(10)
                if (power.gte(400)) power = new Decimal(400)
                power = power.times(player.art.points.add(10).log(10).div(225).add(1).pow(3))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        23: {
            title: "Hardcap, ANROKKU!",
            description: "Rein. Upgrade 3's hardcap is increased based on your Enhance Points.",
            cost: new Decimal(7e18),
            effect() {
                let power = new Decimal(5).add(player.en.points.add(10).log(10))
                return power
            },
            effectDisplay() { return "Caps at ^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (true)
            },
        },
        24: {
            title: "Even more ANROKKU!",
            description: "Rein. Upgrade 3's charging speed is increased based on your Enhanced Energy, and unlock Enhancers 5-8.",
            cost: new Decimal(1e24),
            effect() {
                let power = new Decimal(1).add(player.en.energy.add(10).log(10).div(3))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        31: {
            title: "Energy Rejuvenator",
            description: "Enhance Points boost Enhanced Energy gain at a reduced rate.",
            cost: new Decimal(1e60),
            effect() {
                let power = new Decimal(1).add(player.en.energy.pow(0.13))
                power = softcap(power, new Decimal(1e10), 0.729)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        32: {
            title: "Overpowered",
            description: "Add ^0.03 to the effect of Art Points.",
            cost: new Decimal(1e180),
            effect() {
                let power = new Decimal(0.03)
                return power
            },
            unlocked() {
                return (true)
            },
        },
    },
    buyables: {
        11: {
            title: "Enhancer 1",
            cost(x) {
                let cost = new Decimal(1).times(new Decimal(100).pow(x))
                cost = softcap(cost, new Decimal(100), new Decimal(1.01).pow(x))
                return cost
            },
            effect(x) {
                let power = new Decimal(2).pow(x).minus(1)
                if (hasUpgrade('en', 12)) power = power.times(upgradeEffect('en', 12))
                if (hasUpgrade('en', 13)) power = power.times(upgradeEffect('en', 13))
                if (hasUpgrade('en', 22)) power = power.times(upgradeEffect('en', 22))
                if (hasUpgrade('en', 31)) power = power.times(upgradeEffect('en', 31))
                power = power.times(tmp.en.buyables[12].effect)
                power = power.times(tmp.en.buyables[13].effect)
                power = power.times(tmp.en.buyables[14].effect)
                power = power.times(tmp.en.buyables[21].effect)
                power = power.times(tmp.en.buyables[22].effect)
                power = power.times(tmp.en.buyables[23].effect)
                if (hasAchievement('ac', 135)) power = power.pow(1.01)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhance points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Gaining " + format(buyableEffect(this.layer, this.id)) + " Enhanced Energy per second"
                return text
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Enhancer 2",
            cost(x) {
                let cost = new Decimal(10).times(new Decimal(10000).pow(x))
                cost = softcap(cost, new Decimal(100000), new Decimal(1.01).pow(x))
                return cost
            },
            effect(x) {
                let power = new Decimal(x).add(1).pow(3)
                power = power.times(tmp.en.buyables[13].effect)
                power = power.times(tmp.en.buyables[14].effect)
                power = power.times(tmp.en.buyables[21].effect)
                power = power.times(tmp.en.buyables[22].effect)
                power = power.times(tmp.en.buyables[23].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhance points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 1's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 11).gte(1))
            }
        },
        13: {
            title: "Enhancer 3",
            cost(x) {
                let cost = new Decimal(1e8).times(new Decimal(1e6).pow(x))
                cost = softcap(cost, new Decimal(1e14), new Decimal(1.01).pow(x))
                return cost
            },

            effect(x) {
                let power = new Decimal(2).pow(x)
                power = power.times(tmp.en.buyables[14].effect)
                power = power.times(tmp.en.buyables[21].effect)
                power = power.times(tmp.en.buyables[22].effect)
                power = power.times(tmp.en.buyables[23].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting All previous Enhancers' effect by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 12).gte(1))
            }
        },
        14: {
            title: "Enhancer 4",
            cost(x) {
                let cost = new Decimal(1e15).times(new Decimal(1e9).pow(x))
                cost = softcap(cost, new Decimal(1e24), new Decimal(1.01).pow(x))
                return cost
            },

            effect(x) {
                let power = new Decimal(2.5).pow(x)
                power = power.times(tmp.en.buyables[21].effect)
                power = power.times(tmp.en.buyables[22].effect)
                power = power.times(tmp.en.buyables[23].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting All previous Enhancers' effect by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('en', 14))
            }
        },
        21: {
            title: "Enhancer 5",
            cost(x) {
                let cost = new Decimal(1e38).times(new Decimal(1e9).pow(x))
                cost = softcap(cost, new Decimal(1e47), new Decimal(1.01).pow(x))
                return cost
            },

            effect(x) {
                let power = new Decimal(3).pow(x)
                power = power.times(tmp.en.buyables[22].effect)
                power = power.times(tmp.en.buyables[23].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting All previous Enhancers' effect by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('en', 24))
            }
        },
        22: {
            title: "Enhancer 6",
            cost(x) {
                let cost = new Decimal(1e100).times(new Decimal(1e35).pow(x))
                cost = softcap(cost, new Decimal(1e135), new Decimal(1.01).pow(x))
                return cost
            },

            effect(x) {
                let power = new Decimal(3.3).pow(x)
                power = power.times(tmp.en.buyables[23].effect)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting All previous Enhancers' effect by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('en', 24))
            }
        },
        23: {
            title: "Enhancer 7",
            cost(x) {
                let cost = new Decimal(1e200).times(new Decimal(1e50).pow(x))
                cost = softcap(cost, new Decimal(1e250), new Decimal(1.01).pow(x))
                return cost
            },

            effect(x) {
                let power = new Decimal(1.6).pow(x)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting All previous Enhancers' effect by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (hasUpgrade('en', 24))
            }
        },

    },
    clickables: {
    },
    layerShown() { return hasUpgrade('rein', 14) || player[this.layer].total.gte(1) },
    tabFormat: {
        "Energy": {
            content: [
                "main-display",
                "prestige-button",
                ['display-text', function() { return `You have ${format(player.en.energy)} Enhanced Energy,\n\ boosting Art Machines 1-3's effect by ${format(tmp.en.energy.effect)}x` }, { 'font-size': '21.6px', 'color': 'silver' }],
                ['display-text', function() { return `You are gaining ${format(tmp.en.energy.perSecond)} Enhanced Energy per second` }, { 'font-size': '14.4px', 'color': 'silver' }],
                "buyables"
            ],
        },
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades"
            ],

        },
    },
    automate() {
    },
    passiveGeneration() {
        return hasMilestone('rein', 6)? 1:0
    },


    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("en", keep)
    },
    resetsNothing() {

    }

})