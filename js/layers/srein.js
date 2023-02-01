addLayer("srein", {
    name: "Super-Reincarnation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFA882",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "Super-Reincarnations", // Name of prestige currency
    baseResource: "Reincarnations", // Name of resource prestige is based on
    baseAmount() {return player.rein.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 4, // Prestige currency exponent
    softcap: new Decimal(20),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "R", description: "Shift+R: Reset for Super 'Reins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = Decimal.max(new Decimal(1), new Decimal(1.1).pow(player[this.layer].points))
        if (hasUpgrade('art', 25)) effect = Decimal.max(new Decimal(1), new Decimal(1.169).pow(player[this.layer].points))
        if (hasAchievement('ac', 154)) effect = effect.add(0.02)
        if (inChallenge('schal', 11)) effect = new Decimal(1)
        if (hasUpgrade('rein', 12)) effect = Decimal.max(new Decimal(1), new Decimal(upgradeEffect('rein', 12)).pow(player[this.layer].points))
        effect = softcap(effect, new Decimal(1.85), new Decimal(0.5).div(effect.add(1.34).log(1.34)))
        return effect
    },
    effectDescription(){
        return "boosting reincarnation boost effect by ^" + format(tmp[this.layer].effect)        
    },
    milestones: {
    
    },

    layerShown(){return player.rein.points.gte(5e5) || player[this.layer].best.gte(1) || player.eter.best.gte(1)},
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
        keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset("srein", keep)
    },

})