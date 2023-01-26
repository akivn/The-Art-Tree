addLayer("ac", {
    startData() { return {                 
        unlocked: true,                     
        points: new Decimal(0),             
    }},
    name: "Achievement",
    symbol: "A",
    color: "#ffff00",                      
    resource: "Achievements",           
    row: "side",                               

    baseResource: "points",                
    baseAmount() { return player.points },  

    requires: new Decimal(0),              

    type: "none",                                                

    layerShown() { return true },
    achievements: {
        111: {
            name: "Start",
            tooltip: "Get 1 Art Point.",
            done() {
                return player.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        112: {
            name: "Art Automation?!",
            tooltip: "Get an Art Machine.",
            done() {
                return getBuyableAmount('art', 11).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        113: {
            name: "Rebirth",
            tooltip: "Reincaranate once.",
            done() {
                return player.rein.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        114: {
            name: "Formula Broken!",
            tooltip: "Maxout Art Machine 1.",
            done() {
                return getBuyableAmount('art', 11).gte(60)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        115: {
            name: "Entering Seiyo Elementary",
            tooltip: "Unlock Competitions.",
            done() {
                return player.chal.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        121: {
            name: "Beating someone!",
            tooltip: "Beat Yuiki Yaya.",
            done() {
                return hasChallenge('chal', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        122: {
            name: "Sportsmanship",
            tooltip: "Beat Somma Kukai.",
            done() {
                return hasChallenge('chal', 12)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        123: {
            name: "Mopemope",
            tooltip: "Beat Fujisaki Nadeshiko.",
            done() {
                return hasChallenge('chal', 21)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        124: {
            name: "A Google Reference",
            tooltip: "Reach 1e100 Art Points.",
            done() {
                return player.art.points.gte(1e100)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        125: {
            name: "New Seiyo King",
            tooltip: "Beat Hinamori Amu. Reward: Gain a 20% boost to Magic Effect.",
            done() {
                return hasChallenge('chal', 31)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(1.2)
                return effect
            },
        },
        131: {
            name: "Big Crunch",
            tooltip: "Infinity once. Reward: The boost by Reincaranations are raised to the power of ^1.01.",
            done() {
                return player.inf.best.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(1.01)
                return effect
            },
        },
        132: {
            name: "New Universe",
            tooltip: "Get an Infinite Generator",
            done() {
                return getBuyableAmount('inf', 11).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(1.2)
                return effect
            },
        },
        133: {
            name: "I'm not Childish!",
            tooltip: "Gain 1e140 Skill in Yuiki Yaya Challenge.\n\ Reward: Magic Effect is raised to another ^1.01.",
            done() {
                return player.points.gte('1e140') && inChallenge('chal', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(1.01)
                return effect
            },
        },
        134: {
            name: "Yet another Infinity Reference",
            tooltip: "Gain infinite magic. \n\ Reward: Art Machine 1 boost is +^0.05 stronger.",
            done() {
                return player.chal.points.gte('1.797e308')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(0.05)
                return effect
            },
        },
        135: {
            name: "Rebirth Madness",
            tooltip: "Reach 1000 Reincaranations.",
            done() {
                return player.rein.points.gte(1000)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        141: {
            name: "Better than D377/D378",
            tooltip: "Get your Art Upgrade 1's initial power to over 1e378x.",
            done() {
                return upgradeEffect('art', 11).gte('1e378')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        142: {
            name: "Get rid of all gods",
            tooltip: "Reach 1e480 Skill and Art Points in Hinamori Amu Challenge.\n\ Reward: Infinite Generator 1 is 50% stronger.",
            done() {
                return player.points.gte('1e480') && player.art.points.gte('1e480') && inChallenge('chal', 31)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(0.5)
                return effect
            },
        },
        143: {
            name: "Rebirth Madness II",
            tooltip: "Reach 1,000,000 Reincaranations. \n\ Reward: Art Machine 3 is 5% stronger.",
            done() {
                return player.rein.points.gte(1000000)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(0.05)
                return effect
            },
        },
    },

    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "achievements",
            ],
        },
    },
 
    
})