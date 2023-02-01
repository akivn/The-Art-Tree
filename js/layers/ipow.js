addLayer("ipow", {
    name: "Infinity Power", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "IP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F5CCA0",
    requires: new Decimal(1e63), // Can be a function that takes requirement increases into account
    resource: "Infinity Powers", // Name of prestige currency
    baseResource: "Infinity Points", // Name of resource prestige is based on
    baseAmount() {return player.inf.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.5, // Prestige currency exponent
    softcap: new Decimal(100),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for 'Reins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = new Decimal(1).add(player[this.layer].points.times(0.05))
        if (hasAchievement('ac', 155)) effect = effect.add(0.02)
        if (inChallenge('schal', 11)) effect = new Decimal(1)
        effect = softcap(effect, new Decimal(1.25), new Decimal(1).div(effect.div(1.25)))
        if (hasAchievement('ac', 165)) effect = effect.times(1.02)
        return effect
    },
    effectDescription(){
        let text = "boosting Infinity Point gain by ^" + format(tmp[this.layer].effect)
        if (tmp.chal.effect.gte('1.25')) text = "boosting Infinity Point gain by ^" + format(tmp[this.layer].effect) + " (Neglecting softcap) (Softcapped)"
        return text           
    },
    update() {
    },
    milestones: {
        
},
buyables: {
},
    layerShown(){return hasUpgrade('inf', 24) || player[this.layer].points.gte(0.0001) || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "milestones",
            ],
        },
        
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('inf', 2)) keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset("rein", keep)
    },

})