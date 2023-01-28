addLayer("eter", {
    name: "Eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        power: new Decimal(0),
        auto: true
    }},
    branches: [


	],
    color: "#B341E0",
    requires: (new Decimal(2).pow(1024)).pow(308.25471555991674), // Can be a function that takes requirement increases into account
    resource: "Eternity Points", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000378, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let pow = new Decimal(1)
        return pow
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for Eternity Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update() {
    },
    upgrades:{
    },
    milestones: {
    },
    buyables: {
    },

    layerShown(){return player.art.best.gte('1e80000') || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
        },
        "Milestones": {
            content: [
                "main-display",
                "milestones",
            ]
        },
        
    },
    automate() {
    },
    passiveGeneration() {
        },
    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("eter", keep)
    },

})