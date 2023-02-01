addLayer("eter", {
    name: "Eternity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        power: new Decimal(0),
        auto: true,
        eternalpower: new Decimal(0)
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
    power: {
        perSecond() {
            let base = tmp.eter.buyables[11].effect;
            return base;
        },
        effect() {
            let pow = (player.eter.power.add(1)).pow(player.inf.points.add(10).log(10).add(1))
            return pow
        }
    },
    update(delta) {
        player.eter.power = player.eter.power.plus(Decimal.times(tmp.eter.power.perSecond, delta));
    },
    upgrades:{
    },
    milestones: {
    },
    buyables: {
        11: {
            title: "Eternal Booster 1",
            cost(x) { 
                let cost = new Decimal(1).times(new Decimal(10).pow(x.add(1).pow(2).minus(1)))
                return cost 
            },
            effect(x){
                let power = Decimal.pow(2, x).minus(1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                let sent = "Cost: " + format(data.cost) + " Eternity points\n\
                Amount: " + player[this.layer].buyables[this.id] + "/999\n\
                Gain " + format(buyableEffect(this.layer, this.id)) + " Eternal power per second"
                return sent
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) && getBuyableAmount('eter', 11) < 999},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){
                return (true)
            },

        },
    },

    layerShown(){return hasUpgrade('rein', 34) || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                ['display-text', function() { return `You have ${format(player.eter.power)} Eternal Power,\n\ boosting Skill gain by ${format(tmp.eter.power.effect)}x based on your Infinity Points` }, { 'font-size': '19.8px', 'color': 'silver' }],
                ['display-text', function() { return `Eternal Power Gain: ${format(tmp.eter.power.perSecond)} / sec` }, { 'font-size': '14.4px', 'color': 'silver' }],
                "buyables",
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
        player.inf.points = new Decimal(0)
        player.ipow.points = new Decimal(0)
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("eter", keep)
    },

})