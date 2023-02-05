addLayer("boo", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0), 
        auto2: true            // "points" is the internal name for the main resource of the layer.
    }},
    name: "Booster",
    symbol: "B",
    color: "#00b0ff",                       // The color for this layer, which affects many elements.
    resource: "Boosters",            // The name of this layer's main prestige resource.
    row: 1,                           // The row this layer is on (0 is the first row).
    softcap: new Decimal(69),
    softcapPower: new Decimal(0.4),
    baseResource: "Art Points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.art.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e35),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 2.625,  
    hotkeys: [
        {
            key: "b", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "B: reset your points for Boosters", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.boo.unlocked) doReset("boo") }, // Determines if you can use the hotkey, optional
        }
    ],                        // "normal" prestige gain is (currency^exponent).

    gainMult() {
        let mult = new Decimal(1)                       // Returns your multiplier to your gain of the prestige resource.
        return mult              // Factor in any bonuses multiplying gain here.
    },
    gainExp() {      
        let mult = new Decimal(1)
        if (hasUpgrade('art', 31)) mult = mult.times(upgradeEffect('art', 31))
        mult = mult.times(tmp.c.buyables[12].effect)                          // Returns the exponent to your gain of the prestige resource.
        return mult
    },

    layerShown() { return player.art.best.gte(1e30) || player.boo.best.gte(1) || player.c.best.gte(1)}, 
    passiveGeneration() {
    },
    effect() {
        let effect = Decimal.add(new Decimal(2), tmp.en.buyables[11].effect).pow(player.boo.points.add(tmp.c.effect))
        if (hasUpgrade('art', 32)) effect = effect.times(upgradeEffect('art', 32))
        if (hasUpgrade('art', 33)) effect = effect.times(upgradeEffect('art', 33))
        return effect
    },
    effectDescription(){
            return "boosting Art Point gain by x" + format(tmp[this.layer].effect)        
    },
    canBuyMax() {
        return (hasMilestone('boo', 3))
    },
    autoPrestige() {
        return (hasMilestone('en', 2) && player.boo.auto2 == true)
    },
    upgrades: {
        11: {
            title: "Reinforcement",
            description: "Art Machine 1's base is stronger based on your Skills, and the base gain is 7x stronger.",
            cost: new Decimal(4),
            effect() {
                let power = new Decimal(2).add(player.points.add(3.8).log(3.8).div(154))
                return power
            },
            effectDisplay() { return "Base 2 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (true)
            },
        },
        12: {
            title: "Reinforcement 2",
            description: "Art Machine 2's base is stronger based on your Art Points, and the base gain is another 7x stronger.",
            cost: new Decimal(6),
            effect() {
                let power = new Decimal(3).add(player.art.points.add(10).log(10).div(24))
                return power
            },
            effectDisplay() { return "Base 3 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (true)
            },
        },
        13: {
            title: "Multiplier^2!",
            description: "Art Machine 3's base is stronger based on your Boosters.",
            cost: new Decimal(9),
            effect() {
                let power = new Decimal(2.25).add(player.boo.points.pow(0.25))
                if (hasUpgrade('en', 13)) power = power.add(upgradeEffect('en', 13))
                return power
            },
            effectDisplay() { return "Base 2.25 -> Base " + format(upgradeEffect(this.layer, this.id)) },
            unlocked(){
                return (true)
            },
        },
        14: {
            title: "Ramp Up!",
            description: "Gain more Art Points based on your Art Machine 3's amount.",
            cost: new Decimal(15),
            effect() {
                let power = Decimal.pow(10, new Decimal(0).add(getBuyableAmount('art', 13).div(3.6)))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked(){
                return (true)
            },
        },
    },
    milestones: {
        0: {requirementDescription: "4 Boosters",
                unlocked() {return true},
                done() {
                    let cond = player[this.layer].best.gte(4)
                    if (hasMilestone('c', 0)) cond = player[this.layer].best.gte(1)
                    return cond
                },
                effectDescription: "Option for Automatically buying Art Machines 1-3.",
                toggles: [
                    ["art", "auto1"]
                ],
    
                },
        1: {requirementDescription: "5 Boosters",
                unlocked() {return true},
                done() {return player[this.layer].best.gte(5)},
                effectDescription: "Passively Gain 100% of the Pending Art Points per second.",
    
                },
        2: {requirementDescription: "7 Boosters",
                unlocked() {return true},
                done() {return player[this.layer].best.gte(7)},
                effectDescription: "Keep all Art upgrades and machines upon Row-2 resets.",
    
                },
        3: {requirementDescription: "20 Boosters",
                unlocked() {return true},
                done() {return player[this.layer].best.gte(20)},
                effectDescription: "You can now buy max boosters.",
    
                },

    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("c", 2)) keep.push("milestones")
        if (hasMilestone("c", 3)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("boo", keep)
       },

})
