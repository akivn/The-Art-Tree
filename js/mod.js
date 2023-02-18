let modInfo = {
	name: "The Art Tree 2",
	id: "ormc2",
	author: "akivn, the President of Origin Railway",
	pointsName: "Skill",
	modFiles: ["layers/art.js", "layers/achievement.js", "tree.js", "layers/rein.js", "layers/en.js", "layers/inf.js"],

	discordName: "neuro sama your reality (X)",
	discordLink: "https://discord.gg/h6TFgujqtN",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 4,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "RW2-B0.1",
	name: "A new beginning.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>vB0.1</h3><br>
		- Added Infinity!<br>
		- `

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

	let gain = new Decimal(1)
	gain = gain.times(tmp.ac.effect)
	gain = gain.times(tmp.art.effect)
	gain = gain.times(tmp.rein.effect)
	gain = gain.times(tmp.art.buyables[11].effect)
	if (hasUpgrade('art', 11)) gain = gain.times(2)
	if (hasUpgrade('art', 13)) gain = gain.times(upgradeEffect('art', 13))
	if (hasAchievement('ac', 141)) gain = gain.times(5)
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
	return player.en.energy.gte(Decimal.pow(2, 1024))
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