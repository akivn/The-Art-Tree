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
            tooltip: "Reincarnate once.",
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
                return getBuyableAmount('art', 11).gte(20)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        115: {
            name: "Full House",
            tooltip: "Buy 12 Art Upgrades.",
            done() {
                return hasUpgrade('art', 34)
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
            name: "To Infinity!",
            tooltip: "Reach infinite skill.",
            done() {
                return player.points.gte('1.79e308')
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
            tooltip: "Infinity once. Reward: The boost by Reincarnations are raised to the power of ^1.01.",
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
            tooltip: "Reach 1000 Reincarnations.",
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
        144: {
            name: "Half a 9000",
            tooltip: "Gain 1e4500 Skills.",
            done() {
                return player.points.gte('1e4500')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        142: {
<<<<<<< Updated upstream
            name: "Get rid of all gods",
            tooltip: "Reach 1e480 Skill and Art Points in Hinamori Amu Challenge.\n\ Reward: Infinite Generator 1 is 50% stronger.",
=======
            name: "It's not Infinity, is it?",
            tooltip: "Get 1.8e308 Enhance Points. Reward: Keep Enhance Upgrades on Infinity, and start with 1 Enhance Point on the start of each Infinity.",
>>>>>>> Stashed changes
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
            name: "Skip it! My Rhythm!",
            tooltip: "Reach Infinite Enhance Energy without any Reincarnations.",
            done() {
                return player.en.energy.gte(Decimal.pow(2, 1024)) && player.rein.points.eq(0)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        145: {
            name: "Denying everything",
            tooltip: "Reach 1e850 Skill and Art Points in Fujisaki Nadeshiko Challenge.\n\ Reward: Extra +^0.1 boost to Art Machine 3's effect.",
            done() {
                return player.points.gte('1e850') && inChallenge('chal', 21)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(0.1)
                return effect
            },
        },
        143: {
            name: "Rebirth Madness II",
            tooltip: "Reach 1,000,000 Reincarnations. \n\ Reward: Art Machine 3 is 5% stronger.",
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
        151: {
            name: "Reincarnation of Reincarnations",
            tooltip: "Perform a Super-Reincarnation.",
            done() {
                return player.srein.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        152: {
            name: "Yet an gogol Reference",
            tooltip: "Reach 1e50 Infinity Points.",
            done() {
                return player.inf.points.gte(1e50)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        153: {
            name: "Stronger than a Magic^10",
            tooltip: "Get 1e3080 Magic.\n\ Reward: Another 1e10x boost to Magic Effect.",
            done() {
                return player.chal.points.gte('1e3080')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        154: {
            name: "THIS ACHIEVEMENT DOESN'T EXIST",
            tooltip: "Get 9.999e9999 Skill.\n\ Reward: Super-Reincarnation boost is +^0.02 stronger.",
            done() {
                return player.points.gte('9.999e9999')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        155: {
            name: "ITS OVER 9000",
            tooltip: "Get 1e9000 Art Points in Yuiki Yaya Challenge.\n\ Reward: Additional +^0.02 boost for Infinity Power boost.",
            done() {
                return player.art.points.gte('1e9000') && inChallenge('chal', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        161: {
            name: "Real Artists",
            tooltip: "Beat a Super-Competition Challenge.",
            done() {
                return hasChallenge('schal', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        162: {
            name: "Alright Angel Number for progress",
            tooltip: "Get 4.44e13 Reincarnations.",
            done() {
                return player.rein.points.gte(4.44e13)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        163: {
            name: "Now this is what I call 'Cool and Spicy' x1.1136",
            tooltip: "Get 1e14,200 skill in Hinamori Amu Challenge. \n\ Reward: Boost the base reincarnation effect by 40,000x (before any additional powers)",
            done() {
                return player.points.gte('1e14200') && inChallenge('chal', 31)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        171: {
            name: "Now that's what I'm talking about.",
            tooltip: "Get 1e12,000 Magic. \n\ Reward: The boost from Super-Magic is 1.5x stronger.",
            done() {
                return player.chal.points.gte('1e12000')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        164: {
            name: "ERROR 666: DEVIL DOES NOT EXIST",
            tooltip: "Get 6.66e666x multiplier from Art Machine 4. \n\ Reward: Gain 1e150x more Magic.",
            done() {
                return buyableEffect('art', 21).gte('6.66e666')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        172: {
            name: "Denying EVERYTHING!!!",
            tooltip: "Reach 1e18000 Skill in Fujisaki Nadeshiko Challenge while inside Vermeer Challenge.\n\ Reward: IG1 Produces 10% more Reincarnations.",
            done() {
                return player.points.gte('1e18000') && inChallenge('chal', 21) && inChallenge('schal', 21)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
            achievementEffect() {
                let effect = new Decimal(0.1)
                return effect
            },
        },
        165: {
            name: "THIS ACHIEVEMENT DOESN'T EXIST II",
            tooltip: "Get 9.9999e999 IP.\n\ Reward: Infinity Power boost is 2% stronger.",
            done() {
                return player.inf.points.gte('9.999e999')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        173: {
            name: "Incredible work",
            tooltip: "Have your AP surpassing your skill amount with over 1e50,000 of them.\n\ Reward: Art Machine 6 uses a better formula.",
            done() {
                return player.points.gte('1e50000') && player.art.points.gte(player.points)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        174: {
            name: "I don't have enough fuel!",
            tooltip: "Maxout all 4 Infinite Generator (999 each)",
            done() {
                return getBuyableAmount('inf', 11).gte(999) && getBuyableAmount('inf', 12).gte(999) && getBuyableAmount('inf', 21).gte(999) && getBuyableAmount('inf', 22).gte(999)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        175: {
            name: "IT'S REALLY OVER 9000",
            tooltip: "Reach 1e90000 Art Points.",
            done() {
                return player.art.best.gte('1e90000')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        181: {
            name: "Nadeshiko is relative.",
            tooltip: "Go Eternal.",
            done() {
                return player.eter.best.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        182: {
            name: "Incredible.",
            tooltip: "Finish Yuiki Yaya Challenge with no Art Points. (Must be after Eternity due to a bug)\n\ Reward: Get a respec upgrades button for Art Upgrades for more achievements.",
            done() {
                return hasChallenge('chal', 11) && player.art.points.lt(1) && player.eter.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            },
        },
        183: {
            name: "この実績は存在しない3",
            tooltip: "Get 9.999e99999 Skill.\n\ Reward: Additional 1% boost to Magic Effect.",
            done() {
                return player.points.gte('9.999e99999')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
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