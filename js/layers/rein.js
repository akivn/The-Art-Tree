addLayer("rein", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),         // "points" is the internal name for the main resource of the layer.
        }
    },
    name: "Reincarnation",
    symbol: "R",
    color: "#ffcf9c",                       // The color for this layer, which affects many elements.
    resource: "Reincarnations",            // The name of this layer's main prestige resource.
    row: 1,
    position: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "Art Points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.art.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(2e15),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 2.61,
    hotkeys: [
        {
            key: "r", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "R: Reset for Reincarnations", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player[this.layer].unlocked) doReset("rein") }, // Determines if you can use the hotkey, optional
        }
    ],                        // "normal" prestige gain is (currency^exponent).

    gainMult() {
        let mult = new Decimal(1)                          // Returns your multiplier to your gain of the prestige resource.
        return mult              // Factor in any bonuses multiplying gain here.
    },
    gainExp() {
        let exp = new Decimal(1)
        if (hasUpgrade('en', 14)) exp = exp.times(1.2)
        if (hasUpgrade('en', 32)) exp = exp.times(upgradeEffect('en', 32))
        if (hasUpgrade('inf', 22)) exp = exp.times(new Decimal(1).div(upgradeEffect('inf', 22)))
        if (hasUpgrade('inf', 42)) exp = exp.times(new Decimal(1).div(upgradeEffect('inf', 42)))                             // Returns the exponent to your gain of the prestige resource.
        return exp
    },

    layerShown() { return hasUpgrade('art', 22) || player[this.layer].total.gte(1) || player.inf.total.gte(1) },
    passiveGeneration() {
    },
    effect() {
        let effect = new Decimal(3).pow(player[this.layer].points)
        if (hasUpgrade('rein', 11)) effect = (new Decimal(3).add(upgradeEffect('rein', 11))).pow(player[this.layer].points)
        if (hasUpgrade('inf', 12)) effect = effect.pow(2)
        effect = softcap(effect, new Decimal('1.8e308'), new Decimal(1).div(effect.add(10).log(10).div(308).pow(0.7)))
        return effect
    },
    effectDescription() {
        return "boosting Skill and Art Point gain by x" + format(tmp[this.layer].effect)
    },
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
            requirementDescription: "10,000 Reincarnations",
            unlocked() { return true },
            done() { return player[this.layer].best.gte(1e4) },
            effectDescription: "Reincarnation reset nothing.",
        },

    },
    upgrades: {
        11: {
            title: "Boost!!",
            description: "Gain +0.4 base for Reincarnation effect for every Reincarnation point you got.",
            cost: new Decimal(8),
            effect() {
                let power = new Decimal(3).add(new Decimal(0.4).times(player.rein.points))
                return power
            },
            effectDisplay() { return "Base 3 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('rein', 2))
            },
        },
        12: {
            title: "Overlord of Art",
            description: "The base of Art Machine 2 is exponentially stronger over time based on your time spent on this Reincarnation (capped at 200).",
            cost: new Decimal(10),
            effect() {
                let power = new Decimal(4).add(new Decimal(15).times(player[this.layer].resetTime).pow(0.612))
                if (hasUpgrade('en', 11)) power = new Decimal(4).add(new Decimal(15).times(upgradeEffect('en', 11)).times(player[this.layer].resetTime).pow(0.612))
                if (hasAchievement('ac', 133)) power = power.times(1.1)
                if (power.gte(200)) power = new Decimal(200)
                return power
            },
            effectDisplay() { return "Base 4 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('rein', 2))
            },
        },
        13: {
            title: "Overlord of Art Mk.II",
            description: "Art Machine 3 is exponentially stronger over time based on your time spent on this Reincarnation (capped at ^5).",
            cost: new Decimal(12),
            effect() {
                let power = new Decimal(1).add(new Decimal(0.02).times(player[this.layer].resetTime).pow(0.65))
                if (hasUpgrade('en', 11)) power = new Decimal(1).add(new Decimal(0.02).times(upgradeEffect('en', 11)).times(player[this.layer].resetTime).pow(0.65))
                if (hasAchievement('ac', 133)) power = power.times(1.1)
                if (hasUpgrade('en', 24)) power = power.times(5)
                if (hasUpgrade('inf', 32)) power = power.times(upgradeEffect('inf', 32))
                if (!hasUpgrade('en', 21)) if ((power.gte(5))) power = new Decimal(5)
                if (hasUpgrade('en', 21)) if ((power.gte(upgradeEffect('en', 21)))) power = new Decimal(upgradeEffect('en', 21))
                return power
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() {
                return (hasMilestone('rein', 2))
            },
        },
        14: {
            title: "Enhance Thee Art!",
            description: "Unlock Enhancers.",
            cost: new Decimal(14),
            unlocked() {
                return (hasMilestone('rein', 2))
            },
        },
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasUpgrade('inf', 14)) keep.push("milestones")
        if (hasUpgrade('inf', 14)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("rein", keep)
    },
    autoPrestige(){
        return (hasUpgrade('inf', 34))
    },
    canBuyMax(){
        return (hasMilestone('rein', 5))
    },
    resetsNothing () {return (hasMilestone('rein', 6))}

})
