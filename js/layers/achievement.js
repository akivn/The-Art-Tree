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
            tooltip: "Beat all 5 challenges.",
            done() {
                return player.art.points.gte(1e1000)
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