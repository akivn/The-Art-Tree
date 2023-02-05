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
            tooltip: "Get 1 Art Machine.",
            done() {
                return getBuyableAmount('art', 11).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        112: {
            name: "100 Art Points is a lot",
            tooltip: "Get 100 Art Points.",
            done() {
                return player.art.best.gte(100)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        113: {
            name: "One Miki",
            tooltip: "Get an Upgrade.",
            done() {
                return hasUpgrade('art', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        114: {
            name: "The Powerful 3",
            tooltip: "Get an Art Machine 3.",
            done() {
                return getBuyableAmount('art', 13).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        115: {
            name: "Inflation",
            tooltip: "Get Art Upgrade 7.",
            done() {
                return hasUpgrade('art', 23)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        121: {
            name: "All My Progress are GONE!",
            tooltip: "Get a Booster.",
            done() {
                return player.boo.best.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        122: {
            name: "Gogol is not big, bro",
            tooltip: "Get 1e50 Art Points.",
            done() {
                return player.art.best.gte(1e50)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        123: {
            name: "I Want MORE!",
            tooltip: "Get Art Upgrade 9.",
            done() {
                return hasUpgrade('art', 31)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        124: {
            name: "Inflation-kute Gomen",
            tooltip: "Get your Art Machine 3's base to over 4.",
            done() {
                return upgradeEffect('boo', 13).gte(4)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        125: {
            name: "All My Progress are not gone!",
            tooltip: "Get Booster Milestone 3.",
            done() {
                return hasMilestone('boo', 2)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        131: {
            name: "Enhance!",
            tooltip: "Get an Enhancer.",
            done() {
                return player.en.best.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        132: {
            name: "To INFINITY!",
            tooltip: "Get 1.80e308 Skills.",
            done() {
                return player.points.gte('1.8e308')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        133: {
            name: "Enhance More!",
            tooltip: "Get Art Enhancer 2.",
            done() {
                return getBuyableAmount('en', 12).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        134: {
            name: "Enhance Swarm!!",
            tooltip: "Get 15 total Enhancers from Art Enhancers 1 and 2.",
            done() {
                return getBuyableAmount('en', 12).add(getBuyableAmount('en', 11)).gte(15)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        135: {
            name: "I already told you, Gogol is not big, bro",
            tooltip: "Get 1e50 Enhancers.",
            done() {
                return player.en.best.gte(1e50)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        141: {
            name: "Strategy!",
            tooltip: "Get any Art Capsule.",
            done() {
                return getBuyableAmount('c', 11).gte(1) || getBuyableAmount('c', 12).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        142: {
            name: "Only Child make choices!",
            tooltip: "Get one for both Art Capsules 1 and 2.",
            done() {
                return getBuyableAmount('c', 11).gte(1) && getBuyableAmount('c', 12).gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        143: {
            name: "One million is quite A LOT",
            tooltip: "Get 1e6 Capsules.",
            done() {
                return player.c.total.gte(1e6)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        144: {
            name: "Heheheh ONLY CHILD MAKE CHOICES!!!",
            tooltip: "Disable the cost multiplier for Capsules.",
            done() {
                return hasMilestone('c', 4)
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