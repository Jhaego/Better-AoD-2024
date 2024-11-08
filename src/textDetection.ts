import { getMinionFromInitial } from "./helpers"

/*
Transcript

English

GemEnter - "You enter the competiton."
GemStart - "The challenge gem competition has begun!"
GemEnd - "Challenge Gem competition results:"
GemWin - "12dragon162 won the competition with a score of 23,829!"
GemPlacement - "You came rank 1 with a score of 23,829."
WakeUp - "Nex:  Witness the true power of the elements. The pure power I have wrought into my will"
KillEnd - "Completion Time: 04:13"
PlayerDie - "Oh dear, you are dead!"

Enter instance - "Welcome to your session against: Nex - Angel of Death"
East smoke - "Nex begins to draw smoke from the east towards you!"
North smoke - "Nex begins to draw smoke from the north towards you!"
Pool - "Nex casts thick black smoke towards the centre of the arena."
Bomb - "Nex has marked you to take the full force of the elements."


German

GemEnter - "Du nimmst am Wettbewerb teil."
GemStart - "Der Rivalit  tsstein-Wettbewerb hat begonnen!"
GemEnd - "Ergebnisse des Rivalit  tsstein-Wettbewerbs:"
GemWin - "12dragon162 hat den Wettbewerb mit 4.447 Punkten gewonnen!"
GemPlacement - "Du hast Rang 1 mit 4.447 Punkten erreicht."
WakeUp - "Nex:  Werdet Zeuge der wahren Macht der Elemente. Der reinen Macht, die ich mir untertan gemacht habe."
KillEnd - "Abschlusszeit: 01:04"
PlayerDie - "Oje, du bist tot!"

Enter instance - "Willkommen zu deiner Runde gegen: Nex - Engel des Todes"
East smoke - "Nex zieht Rauch aus dem Osten zu dir hin!"
North smoke - "Nex zieht Rauch aus dem Norden zu dir hin!"
Pool - "Nex leitet dichten, schwarzen Rauch zur Mitte der Arena."
Bomb - "Nex hat dich markiert, um die gesamte Wucht der Elemente abzubekommen."


French

GemEnter - "Vous entrez dans la competition."
GemStart - "La competition de la gemme de defi a commence !"
GemEnd - "Resultats de la competition de la gemme de defi :"
GemWin - "12dragon162 mene la competition avec un score de 10 852 !"
GemPlacement - "Vous avez atteint la 1e place avec un score de 10 852."
WakeUp - "Nex :  Admirez la puissance ultime des elements. Le pouvoir"
KillEnd - "Temps : 01:21"
PlayerDie - "Oh fichtre, vous etes mort !"

Enter instance - "Bienvenue dans votre session de combat contre : Nex : l'ange de la mort."
East smoke - "Nex vous envoie de la fumee venant de l'est !"
North smoke - "Nex se met a diriger la fumee vendant du nord vers vous !"
Pool - "Nex lance une epaisse fumee noire vers le centre de l'arene."
Bomb - "Nex vous prend pour cible : vous allez subir toute la puissance des elements."

*/

const confusedCharacters = [
    ["l", "i", "1"],
    ["o", "0"],
    ["z", "2"],
    ["1", "7"]
]

// Should only be used on text segments as groups e.g [0-9] can be replaced
// Uses the confusedCharacters to adjust regex string with non-capturing groups to allow for OCR inaccuracies
const regexAdjustments = (rawRegexString: string) => {
    confusedCharacters.forEach((list) => {
        const replacement = `(?:${list.join("|")})`

        list.forEach((character) => {
            rawRegexString = rawRegexString.replaceAll(character, replacement)
        })
    })

    return rawRegexString
}

export const detectGemStart = (text: string) => {
    const translations = [
        `The challenge gem competition has begun!`,
        `Der Rivalit  tsstein-Wettbewerb hat begonnen!`,
        `La competition de la gemme de defi a commence !`
    ]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}

export const detectGemEnd = (text: string) => {
    const translations = [
        `Challenge Gem competition results:`,
        `Ergebnisse des Rivalit  tsstein-Wettbewerbs:`,
        `Resultats de la competition de la gemme de defi :`
    ]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}

export const detectKillEnd = (text: string) => {
    const translations = [`Completion Time: `, `Abschlusszeit: `, `Temps : `]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})(([0-9]{2}):([0-9]{2}))`, "i"))

    if (match) {
        const minutes = parseInt(match[3], 10)
        const seconds = parseInt(match[4], 10)

        if (!isNaN(minutes) && !isNaN(seconds)) {
            return minutes * 60 + seconds
        }
    }

    return false
}

export const detectPlayerDeath = (text: string) => {
    const translations = [`Oh dear, you are dead!`, `Oje, du bist tot!`, `Oh fichtre, vous etes mort !`]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}

export const detectKillStart = (text: string) => {
    const translations = [
        `Welcome to your session against: Nex - Angel of Death`,
        `Willkommen zu deiner Runde gegen: Nex - Engel des Todes`,
        `Bienvenue dans votre session de combat contre : Nex : l'ange de la mort`
    ]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}

export const detectMinionDeath = (text: string) => {
    const translations = [`master`, `meister`, `ma`]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(umb|glac|cru|fum).*(${mainExpression})`, "i"))

    if (match) {
        const minion = match[0].substring(0, 1)

        return getMinionFromInitial(minion)
    }
}

export const detectDirectionalSmoke = (text: string) => {
    const match = text.match(
        new RegExp(
            `(Nex begins to draw smoke from the (north|east) towards you)|(Nex zieht Rauch aus dem (Norden|Osten) zu dir hin)|(Nex vous envoie de la fumee venant de l'(est) !)|(Nex se met)`,
            "i"
        )
    )

    if (match) {
        if (text.includes("north") || text.includes("Norden") || text.includes("Nex se met")) {
            return "North"
        } else if (text.includes("east") || text.includes("Osten") || text.includes("est")) {
            return "East"
        }
    }
}

export const detectPool = (text: string) => {
    const translations = [
        `Nex casts thick black smoke towards the centre of the arena`,
        `Nex leitet dichten, schwarzen Rauch zur Mitte der Arena`,
        `Nex lance une epaisse fumee noire vers le centre de l'arene`
    ]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}

export const detectBomb = (text: string) => {
    const translations = [
        `Nex has marked you to take the full force of the elements`,
        `Nex hat dich markiert, um die gesamte Wucht der Elemente abzubekommen`,
        `Nex vous prend pour cible : vous allez subir toute la puissance des elements`
    ]

    const mainExpression = translations.map(regexAdjustments).join("|")

    const match = text.match(new RegExp(`(${mainExpression})`, "i"))

    return !!match
}
