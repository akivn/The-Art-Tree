let modInfo = {
	name: "The Art Tree",
	id: "ormc",
	author: "akivn, the President of Origin Railway",
	pointsName: "skill",
	modFiles: ["layers/art.js", "layers/rein.js", "layers/ipow.js", "layers/eter.js", "layers/srein.js", "layers/chal.js", "layers/schal.js", "layers/inf.js", "layers/achievement.js", "tree.js"],

	discordName: "neuro sama your reality (X)",
	discordLink: "https://discord.gg/h6TFgujqtN",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 4,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "A0.3",
	name: "INFINITY^INFINITY",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.3</h3><br>
		- Added 4 new prestige layers!<br>
		- Reincaranation upgrades!<br>
		- 2 new Infinity Upgrades!<br>
		- 6 new Challenges!<br>
		- 17 new Achievements!<br>
		- Endgame increased to 1 ???.<br>
	<h3>v0.2</h3><br>
		- Added Infinity!<br>
		- Reach 1.797e308 Art Points to prestige for Infinity points, and use it in Generators which generates Reincaranations, or in upgrades!<br>
		- Endgame increased to 1e15 Infinity Points.`

let winText = `Congratulations! You have became the new King of Art and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.15)
	gain = gain.times(tmp.art.effect)
	gain = gain.times(tmp.rein.effect)
	gain = gain.times(buyableEffect('art', 12))
	if (hasUpgrade('art', 11)) gain = gain.times(upgradeEffect('art', 11))
	if (hasUpgrade('art', 13)) gain = gain.times(upgradeEffect('art', 13))
	if (inChallenge('chal', 21) || inChallenge('schal', 31)) gain = gain.pow(0.5)
	if (hasUpgrade('inf', 11)) gain = gain.times(upgradeEffect('inf', 11))
	if (hasUpgrade('art', 35)) gain = gain.times(upgradeEffect('art', 35))
	gain = softcap(gain, new Decimal('1e2000'), new Decimal(0.999).pow(player.points.add(1).log(10).div(100)))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.eter.points.gte(1)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}