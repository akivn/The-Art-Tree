addLayer("rein", {
    name: "Reincaranation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F5CCA0",
    requires: new Decimal(2.22222e5), // Can be a function that takes requirement increases into account
    resource: "Reincaranations", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.65, // Prestige currency exponent
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
        let effect = Decimal.max(new Decimal(1), (player[this.layer].points.add(1)).pow(1.6))
        if (hasUpgrade('art', 33)) effect = effect.times(3)
        effect = effect.times(tmp.chal.effect)
        effect = effect.pow(buyableEffect('art', 13))
        if (inChallenge('chal', 22)) effect = new Decimal(1)
        if (inChallenge('chal', 22)) effect = effect.times(tmp.chal.effect.pow(2))
        if (inChallenge('chal', 31)) effect = new Decimal(1)
        if (inChallenge('chal', 31)) effect = effect.times(tmp.chal.effect)
        if (hasChallenge('chal', 22)) effect = effect.pow(2)
        return effect
    },
    effectDescription(){
        return "boosting skill and Art point gain by x" + format(tmp[this.layer].effect)        
    },
    milestones: {
        0: {requirementDescription: "7 Reincaranations",
            done() {return player[this.layer].best.gte(7)}, // Used to determine when to give the milestone
            effectDescription: "Unlock autobuyer for Art Machines 1 and 2, and unlock 4 new upgrades.",
            toggles: [
                ["art", "auto_am12"]
            ],

        },
        1: {requirementDescription: "10 Reincaranations",
            done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
            effectDescription: "Keep all Art Upgrades while being reincaranated.",

        },
        2: {requirementDescription: "15 Reincaranations",
            done() {return player[this.layer].best.gte(15)}, // Used to determine when to give the milestone
            effectDescription: "Passively gain 50% of pending Art point per second.",

        },
        3: {requirementDescription: "30 Reincaranations",
            done() {return player[this.layer].best.gte(30)}, // Used to determine when to give the milestone
            effectDescription: "Unlock autobuyer for Art Machine 3, bundled with the previous autobuyer for #1 and #2.",

        },
        4: {requirementDescription: "36 Reincaranations",
            done() {return player[this.layer].best.gte(36)}, // Used to determine when to give the milestone
            effectDescription: "Keep Art Machines on reincaranation and competition resets.",

        },
    },

    layerShown(){return hasUpgrade('art', 24) || player[this.layer].points.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
                "milestones",
            ],
        },
        
    },

})