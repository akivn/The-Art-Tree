addLayer("schal", {
    name: "Super-Competitions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: [
        ["eter", function() { return player.ipow.best.gte(1) ? "#ffffff" : "#505050" }, 20],
    ],
    color: "#990000",
    requires: new Decimal('1e25500'), // Can be a function that takes requirement increases into account
    resource: "Super-Magics", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0004, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "Shift+C: Reset for Super-Magics", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = new Decimal(1).add(player.schal.points.add(1).log(10).times(0.11))
        if (hasAchievement('ac', 171)) effect = new Decimal(1).add(player.schal.points.add(1).log(10).times(0.165))
        effect = softcap(effect, new Decimal(1.55), new Decimal(0.225))
        effect = softcap(effect, new Decimal(2.61), new Decimal(0.5).div(effect.div(2.61)))
        if (hasUpgrade('rein', 24)) effect = effect.times(1.22)
        return effect
    },
    effectDescription(){
        return "Boosting Magic Effect by ^" + format(tmp[this.layer].effect)     
    },
    challenges: {
        11: {
            name: "Eugene Delacroix",
            challengeDescription: "Super-Reincarnation and Infinity Power boost is disabled.",
            rewardDescription: "Unlock Art Machine 6, and the autobuyer for Art Machine 5, bundled with the previous 4.",
            goalDescription: "1e30,000 Skill",
            canComplete: function() {
                let goal = new Decimal('1e30000')
                return player.points.gte(goal)
            },
        },
        12: {
            name: "Jean-Antoine Watteau",
            challengeDescription: "Infinity Upgrade 1, Magic effect and Art Point effect are disabled.",
            rewardDescription: "Unlock 12 new upgrades for Reincarnations.",
            goalDescription: "1e10,300 Skill",
            canComplete: function() {
                let goal = new Decimal('1e10300')
                return player.points.gte(goal)
            },
        },
        21: {
            name: "Vermeer",
            challengeDescription: "Rows 1 and 2 resource production is reduced to ^0.25. (Reincarnation production for IG1 will also get affected)",
            rewardDescription: "IG1 produce more Reincarnations based on your Art Points.",
            rewardEffect() {
                let effect = new Decimal(1.1).pow(player.art.points.add(10).log(10).div(704))
                return effect
            },
            rewardDisplay() {
                return format(challengeEffect(this.layer, this.id)) + "x"
            },
            goalDescription: "1e14,600 Skill",
            canComplete: function() {
                let goal = new Decimal('1e14600')
                return player.points.gte(goal)
            },
        },
        22: {
            name: "Rembrandt",
            challengeDescription: "Reincarnation production is capped at 1/s, and Reincarnation upgrades are useless.",
            rewardDescription: "Reincarnation boost is raised to ^1.7.",
            goalDescription: "1e40,800 Skill",
            canComplete: function() {
                let goal = new Decimal('1e40800')
                return player.points.gte(goal)
            },
        },
        31: {
            name: "Michelangelo",
            challengeDescription: "All Normal Competition Challenges at once (For repeated effects, the lower one will be used.)",
            rewardDescription: "Further +^0.15 boost to Art Machine 1 Effect.",
            goalDescription: "1e5800 Skill",
            canComplete: function() {
                let goal = new Decimal('1e5800')
                return player.points.gte(goal)
            },
        },
        32: {
            name: "Leonardo da Vinci",
            challengeDescription: "Infinity Upgrades 1 & 4, Infinity Power and Magic Boost are useless.",
            rewardDescription: "IG1 also produces Super-Reincarnations, but in a severely reduced rate.",
            goalDescription: "1e30,300 Skill",
            canComplete: function() {
                let goal = new Decimal('1e30300')
                return player.points.gte(goal)
            },
            rewardEffect() {
                let effect = buyableEffect('inf', 11).add(10).log(10).div(300)
                return effect
            },
            rewardDisplay() {
                return format(challengeEffect(this.layer, this.id)) + "/s"
            },
        },
    },

    layerShown(){return hasUpgrade('art', 55) || player.eter.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "challenges",
            ],
        },
        
    },
    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row > this.row) layerDataReset("schal", keep)
    },
})