addLayer("chal", {
    name: "Competitions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#990000",
    requires: new Decimal(1e23), // Can be a function that takes requirement increases into account
    resource: "Magics", // Name of prestige currency
    baseResource: "Art Points", // Name of resource prestige is based on
    baseAmount() {return player.art.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for Magics", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {
        let effect = player[this.layer].points.add(2).log(2)
        if (hasUpgrade('art', 41)) effect = effect.times(upgradeEffect('art', 41))
        if (hasUpgrade('art', 43)) effect = player[this.layer].points.add(1).pow(0.07)
        if (hasAchievement('ac', 125)) effect = effect.times(1.2)
        if (hasAchievement('ac', 133)) effect = effect.pow(1.01)
        if (hasUpgrade('inf', 13)) effect = effect.pow(1.5)
        return effect
    },
    effectDescription(){
        return "boosting Reincaranation point effect by x" + format(tmp[this.layer].effect)     
    },
    challenges: {
        11: {
            name: "Yuiki Yaya",
            challengeDescription: "Ace of the Guardians, and she likes being childish. Art Machines are disabled.",
            rewardDescription: "Unlock Art Machine 3.",
            goalDescription: "1e14 Skill",
            canComplete: function() {
                return player.points.gte("1e14")
            },
        },
        12: {
            name: "Somma Kukai",
            challengeDescription: "Jack of the Guardians, and he likes challenging things. Art Upgrades 1-6 are disabled.",
            rewardDescription: "The formula of Art Upgrade 1 is much stronger ( log_3(Skill + 3) >> (Skill + 1) ^ 0.15 )",
            goalDescription: "1e13 Skill",
            canComplete: function() {
                return player.points.gte(1e13)
            },
        },
        21: {
            name: "Fujisaki Nadeshiko",
            challengeDescription: "Queen of the Guardians, and she likes peace and rest. Production of Skills and Art Points are Square Rooted.",
            rewardDescription: "Gain a x1e5 boost to the gain of AP, and remove the softcap of Art Machine 2's effect, despite the boost will become x1.1 instead of x1.3.",
            goalDescription: "1,000,000 Art Points",
            canComplete: function() {
                return player.art.points.gte(1e6)
            },
        },
        22: {
            name: "Hotori Tadase",
            challengeDescription: "King of the Guardians, and he likes being a king (kek). Reincaranation boost is always x1, apart from the Magic boost, which will be squared.",
            rewardDescription: "Unlock 2 new Art upgrades, and the effect of Reincaranation is squared.",
            goalDescription: "6.66e66 Art Points",
            canComplete: function() {
                return player.art.points.gte(6666666666666666666666666666666666666666666666666666666666666666666)
            },
        },
        31: {
            name: "Hinamori Amu",
            challengeDescription: "Joker of the Guardians, COOL AND SPICY. She 'loves' Art, and has a Shugo Chara called Miki, who is also proficient at arts. Art Machines are useless, and Reincaranation boost is always x1, apart from the Magic boost.",
            rewardDescription: "Unlock 3 more new upgrades.",
            goalDescription: "1.9940924e32 Art Points",
            canComplete: function() {
                return player.art.points.gte(1.9940924e32)
            },
        },
    },

    layerShown(){return hasUpgrade('art', 34) || player[this.layer].points.gte(1) || player.inf.best.gte(1)},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "challenges",
            ],
        },
        
    },
    passiveGeneration() {
        return hasMilestone("rein", 5) ? 1:0
        },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone("inf", 2)) keep.push("challenges")
        if (layers[resettingLayer].row > this.row) layerDataReset("chal", keep)
    },
})