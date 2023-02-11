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
    effect() {
        let effect = Decimal.max(new Decimal(1), new Decimal(1.075).pow(player[this.layer].points))
        return effect
    },
    effectDescription(){
        return "boosting skill gain by x" + format(tmp[this.layer].effect)        
    },          

    type: "none",                                                

    layerShown() { return true },
    achievements: {
        111: {
            name: "Start",
            tooltip: "Get 1 Art Point.",
            done() {
                return player.art.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        112: {
            name: "First Step",
            tooltip: "Get an Art Upgrade.",
            done() {
                return hasUpgrade('art', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        113: {
            name: "An Additional Help",
            tooltip: "Get an Art Machine.",
            done() {
                return getBuyableAmount('art', 11).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        114: {
            name: "Dimensional Sacrifice?!",
            tooltip: "Get an Art Machine 2.",
            done() {
                return getBuyableAmount('art', 12).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        121: {
            name: "Restart!",
            tooltip: "Rebirth.",
            done() {
                return player.rein.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        122: {
            name: "Sacrifice? No More!",
            tooltip: "Get Reincarnation Milestone 1.",
            done() {
                return hasMilestone('rein', 0)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        123: {
            name: "Gogol is not a lot",
            tooltip: "Get 1e50 Art Points.",
            done() {
                return player.art.best.gte(1e50)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        124: {
            name: "Reincarnation isn't that bad now",
            tooltip: "Buy a Reincarnation Upgrade.",
            done() {
                return hasUpgrade('rein', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        125: {
            name: "Time Dependency",
            tooltip: "Buy Reincarnation Upgrade 2, which is based on time.",
            done() {
                return hasUpgrade('rein', 12)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        131: {
            name: "Enhance!",
            tooltip: "Gain an Enhance Point.",
            done() {
                return player.en.total.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        132: {
            name: "It's not Antimatter Dimensions.",
            tooltip: "Get Enhancer 2.",
            done() {
                return getBuyableAmount('en', 12).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        133: {
            name: "THIS ACHIEVEMENT DOESN'T EXIST",
            tooltip: "Get 9.99999e999 Skills. Reward: Rein. Upgrades 2 and 3 charges 10% faster.",
            done() {
                return player.points.gte('9.99999e999')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        134: {
            name: "It's Inflation.",
            tooltip: "Get 1e50 Enhance Points.",
            done() {
                return player.en.points.gte(1e50)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        135: {
            name: "Suited Up",
            tooltip: "Get an Enhance Upgrade. Reward: Gain 2x more Enhanced Energy.",
            done() {
                return hasUpgrade('en', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        145: {
            name: "THIS ACHIEVEMENT DOESN'T EXIST 2",
            tooltip: "Get 9.9999e9999 Art Points. Reward: Enhanced Energy Gain is raised to ^1.01.",
            done() {
                return player.art.points.gte('9.9999e9999')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
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