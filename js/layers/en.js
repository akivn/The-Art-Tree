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
        ["inf", function () { return player.inf.unlocked ? "#606060" : "#d0d0d0" }, 18],
    ],
    requires: new Decimal('1e350'), // Can be a function that takes requirement increases into account
    resource: "Enhance Points", // Name of prestige currency
    baseResource: "Skills", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.009, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(tmp.inf.effect)
        if (hasUpgrade('en', 31)) mult = mult.times(upgradeEffect('en', 31))
        if (hasUpgrade('inf', 43)) mult = mult.times(upgradeEffect('inf', 43))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return new Decimal(pow)
    },
    effect() {
        let effect = player.en.points.pow(0.475)
        if (hasChallenge('inf', 11)) effect = effect.pow(1.1)
        effect = softcap(effect, Decimal.pow(2, 1024), new Decimal(1).div(effect.add(10).log(10).minus(308).pow(0.5)))
        if (inChallenge('inf', 11)) effect = new Decimal(1)
        return effect
    },
    effectDescription() {
        return "boosting Enhanced Energy gain by x" + format(tmp[this.layer].effect)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "e", description: "E: Reset for Enhancers", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    canReset() {
        return !player[this.layer].points.gte(1) && player.points.gte('1e350')
    },
    energy: {
        perSecond() {
            let base = tmp.en.buyables[11].effect
            if (getBuyableAmount('en', 11).lt(1) && player.en.total.gte(1)) base = new Decimal(1)
            base = base.times(tmp.en.effect)
            base = base.times(tmp.inf.effect)
            return base;
        },
        effect() {
            let pow = (player.en.energy.add(1)).pow(3)
            if (hasUpgrade('inf', 23)) pow = pow.pow(upgradeEffect('inf', 23))
            return pow
        }
    },
    update(delta) {
        player.en.energy = player.en.energy.plus(Decimal.times(tmp.en.energy.perSecond, delta));
        if (!hasUpgrade('inf', 24) && player.en.energy.gte(Decimal.pow(2, 1024))) player.en.energy = Decimal.pow(2, 1024)
    },
    upgrades: {
        11: {
            title: "Charge Up the Sky!",
            description: "The effect of Rein. Upgrades 2 and 3 are gained faster based on your Art Points.",
            cost: new Decimal(100),
            effect() {
                let power = new Decimal(player.art.points.add(10).log(10).div(240).add(1))
                if (hasUpgrade('en', 21)) power = power.pow(1.4)

                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        12: {
            title: "Enpower!",
            description: "Gain more Enhanced Energy based on your Art Points.",
            cost: new Decimal(1e4),
            effect() {
                let power = new Decimal(player.art.points.add(10).log(10).div(10).pow(0.7))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        13: {
            title: "Boosting to the MAX!",
            description: "Art Point effect is +^0.065 stronger (added to Art Upgrade 5's effect).",
            cost: new Decimal(2.5e5),
            unlocked() {
                return (true)
            },
        },
        14: {
            title: "Enhance the Enhance!",
            description: "Reincarnation scales 20% slower, and Reincarnation effect boost Enhance Energy Gain at a massively reduced rate.",
            effect() {
                let power = new Decimal(tmp.rein.effect.pow(0.0525))
                if (inChallenge('inf', 11)) power = power.pow(0.06)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(1e6),
            unlocked() {
                return (true)
            },
        },
        21: {
            title: "More Multis!",
            description: "Increase the cap of Rein. Upgrade 3 based on AP, and 'Charge Up The Sky!' is ^1.4 stronger.",
            cost: new Decimal(1e9),
            effect() {
                let power = new Decimal(5).add(player.art.points.add(10).log(10).div(222))
                power = softcap(power, new Decimal(25), new Decimal(1).div(power.add(10).log(10)))
                if (hasUpgrade('en', 32)) power = power.times(1.44)
                return power
            },
            effectDisplay() { return "Caps at ^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (true)
            },
        },
        22: {
            title: "Fame!",
            description: "Your Achievement boost Enhanced Energy Gain.",
            cost: new Decimal(1e14),
            effect() {
                let power = tmp.ac.effect.pow(5.5)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        23: {
            title: "RE:Trieve!",
            description: "Art Point gain is boosted by Enhance Points.",
            cost: new Decimal(1e24),
            effect() {
                let power = player.en.points.pow(5.25)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        24: {
            title: "Reducing to Extreme",
            description: "All Enhancers' cost are lowered based on your Enhance Points, and Rein. Upgrade 3 charges 5x faster.",
            cost: new Decimal(1e32),
            effect() {
                let power = new Decimal(1).times(player.en.points.pow(0.4))
                power = softcap(power, new Decimal(1e20), new Decimal(1).div(power.add(10).log(10).div(20).pow(0.075)))
                return power
            },
            effectDisplay() { return "/" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (true)
            },
        },
        31: {
            title: "Enhanced by Rebirth",
            description: "Enhance Point gain is boosted by Reincarnations.",
            cost: new Decimal(1e54),
            effect() {
                let power = new Decimal(2).pow(player.rein.points)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() {
                return (true)
            },
        },
        32: {
            title: "Enhanced by Enhanced",
            description: "Enhance Energy reduces Reincarnation Requirement, in logarithmic scale, and boost the Rein. Upgrade 3's cap by x1.44.",
            cost: new Decimal(1e85),
            effect() {
                let power = new Decimal(player.en.points).add(10).log(10).pow(0.0825)
                return power
            },
            effectDisplay() { return "/^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (true)
            },
        },
    },
    buyables: {
        11: {
            title: "Enhancer 1",
            cost(x) {
                let cost = new Decimal(10).times(new Decimal(1e3).pow(x))
                cost = softcap(cost, new Decimal(1e10), cost.add(10).log(10).div(10).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(85))))
                return cost
            },
            effect(x) {
                let power = new Decimal(2).pow(x)
                if (hasUpgrade('en', 12)) power = power.times(upgradeEffect('en', 12))
                if (hasUpgrade('en', 14)) power = power.times(upgradeEffect('en', 14))
                if (hasUpgrade('en', 22)) power = power.times(upgradeEffect('en', 14))
                if (hasAchievement('ac', 135)) power = power.times(2)
                power = power.times(tmp.en.buyables[12].effect)
                if (hasAchievement('ac', 145)) power = power.pow(1.01)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Gaining " + format(buyableEffect(this.layer, this.id)) + " Enhanced Energy per second"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            title: "Enhancer 2",
            cost(x) {
                let cost = new Decimal(100).times(new Decimal(1e4).pow(x))
                cost = softcap(cost, new Decimal(1e20), cost.add(10).log(10).div(20).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(68))))
                return cost
            },
            effect(x) {
                let power = new Decimal(3).pow(x)
                power = power.times(tmp.en.buyables[13].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 1's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 11).gte(1) || player.inf.total.gte(1))
            }
        },
        13: {
            title: "Enhancer 3",
            cost(x) {
                let cost = new Decimal(1e3).times(new Decimal(1e5).pow(x))
                cost = softcap(cost, new Decimal(1e30), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(56))))
                return cost
            },

            effect(x) {
                let power = new Decimal(4).pow(x)
                power = power.times(tmp.en.buyables[14].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 2's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 12).gte(1) || player.inf.total.gte(1))
            }
        },
        14: {
            title: "Enhancer 4",
            cost(x) {
                let cost = new Decimal(1e5).times(new Decimal(1e6).pow(x))
                cost = softcap(cost, new Decimal(1e40), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(47))))
                return cost
            },

            effect(x) {
                let power = new Decimal(5).pow(x)
                power = power.times(tmp.en.buyables[21].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 3's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 13).gte(1) || player.inf.total.gte(1))
            }
        },
        21: {
            title: "Enhancer 5",
            cost(x) {
                let cost = new Decimal(1e8).times(new Decimal(1e7).pow(x))
                cost = softcap(cost, new Decimal(1e50), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(40))))
                return cost
            },

            effect(x) {
                let power = new Decimal(6).pow(x)
                power = power.times(tmp.en.buyables[22].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 4's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 14).gte(1) || player.inf.total.gte(1))
            }
        },
        22: {
            title: "Enhancer 6",
            cost(x) {
                let cost = new Decimal(1e13).times(new Decimal(1e8).pow(x))
                cost = softcap(cost, new Decimal(1e60), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(35))))
                return cost
            },

            effect(x) {
                let power = new Decimal(7).pow(x)
                power = power.times(tmp.en.buyables[23].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 5's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 21).gte(1) || player.inf.total.gte(1))
            }
        },
        23: {
            title: "Enhancer 7",
            cost(x) {
                let cost = new Decimal(1e21).times(new Decimal(1e9).pow(x))
                cost = softcap(cost, new Decimal(1e70), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(30))))
                return cost
            },

            effect(x) {
                let power = new Decimal(8).pow(x)
                power = power.times(tmp.en.buyables[24].effect)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 6's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 22).gte(1) || player.inf.total.gte(1))
            }
        },
        24: {
            title: "Enhancer 8",
            cost(x) {
                let cost = new Decimal(1e34).times(new Decimal(1e10).pow(x))
                cost = softcap(cost, new Decimal(1e80), cost.add(10).log(10).div(30).pow(0.1))
                if (hasUpgrade('en', 24)) cost = cost.div(upgradeEffect('en', 24))
                cost = softcap(cost, Decimal.pow(2, 1024), new Decimal(1).add(new Decimal(0.3).times(x.minus(26))))
                return cost
            },

            effect(x) {
                let power = new Decimal(9).pow(x)
                if (hasUpgrade('inf', 13)) power = power.pow(1.04)
                return power
            },
            display() {
                let data = tmp[this.layer].buyables[this.id]
                let text = "Cost: " + format(data.cost) + " Enhanced Energy\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Boosting Enhancer 7's production by " + format(buyableEffect(this.layer, this.id)) + "x"
                return text
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buy() {
                player[this.layer].energy = player[this.layer].energy.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return (getBuyableAmount('en', 23).gte(1) || player.inf.total.gte(1))
            }
        },

    },
    clickables: {
    },
    layerShown() { return hasUpgrade('rein', 14) || player[this.layer].total.gte(1) || player.inf.total.gte(1) },
    tabFormat: {
        "Energy": {
            content: [
                "main-display",
                "prestige-button",
                ['display-text', function () { return `You have ${format(player.en.energy)} Enhanced Energy,\n\ boosting Art Machines 1-3's effect by ${format(tmp.en.energy.effect)}x` }, { 'font-size': '21.6px', 'color': 'silver' }],
                ['display-text', function () { return `You are gaining ${format(tmp.en.energy.perSecond)} Enhanced Energy per second` }, { 'font-size': '14.4px', 'color': 'silver' }],
                ['display-text', function () { return `When bought, each of the Enhancers have different multipliers. It's formula is (2+#(n-1)). After 10^(10n) and 1.8e308, the scaling of all Enhancers rises.` }, { 'font-size': '14.4px', 'color': 'silver' }],
                ['display-text', function () { return `You Automatically gain 10% of the Enhance point every second, once you've got the first point. You can only Enhance manually once.` }, { 'font-size': '14.4px', 'color': 'silver' }],

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
        if (hasUpgrade('inf', 13)) {
            for (let i = 0; i < 100; i++) {
                buyBuyable('en', 11)
                buyBuyable('en', 12)
                buyBuyable('en', 13)
                buyBuyable('en', 14)
                buyBuyable('en', 21)
                buyBuyable('en', 22)
                buyBuyable('en', 23)
                buyBuyable('en', 24)
            }
        }
    },
    autobuyUpgrades() {
        return hasChallenge('inf', 11)
    },
    passiveGeneration() {
        let gain = new Decimal(0)
        if (player.en.points.gte(1)) gain = new Decimal(0.1)
        if (hasUpgrade('inf', 33)) gain = gain.times(100)
        return gain
    },


    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("en", keep)
        if (hasUpgrade('inf', 23)) player.en.points = new Decimal(1)
    },
    resetsNothing() {

    }

})