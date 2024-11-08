import React, { useState } from "react"

type Tip = { role: string; ammount: number }

const DiscordTips: Tip[] = [
    { role: "Base", ammount: 8 },
    { role: "Vulner", ammount: 5 }
]

const DiscordTrialTips: Tip[] = [
    { role: "Base", ammount: 8 },
    { role: "Vulner", ammount: 5 }
]

const FCTips: Tip[] = [
    { role: "Base", ammount: 8 },
    { role: "Vulner", ammount: 5 }
]

const Calculator: React.FC<{}> = () => {
    const [sellPrice, setSellPrice] = useState(700)
    const [numberOfDrops, setNumberOfDrops] = useState(1)
    const [splitType, setSplitType] = useState<"7-10" | "7-10 trial" | "FC">("7-10")
    const [players, setPlayers] = useState(7)

    const tips = splitType === "FC" ? FCTips : splitType === "7-10" ? DiscordTips : DiscordTrialTips

    const totalTips = tips.reduce((current, next) => (current += next.ammount * numberOfDrops), 0)
    const mainSplit = (sellPrice - totalTips) / players

    return (
        <React.Fragment>
            <h2 style={{ fontFamily: "sans-serif" }}>Split calculator</h2>

            <h4 style={{ fontFamily: "sans-serif", marginBottom: 0 }}>Total sell price</h4>
            <label style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif" }}>
                <input
                    type="number"
                    min={0}
                    value={sellPrice}
                    onChange={(event) => {
                        const value = parseFloat(event.target.value)

                        if (!isNaN(value)) {
                            setSellPrice(value)
                        }
                    }}
                />
                m
            </label>

            <h4 style={{ fontFamily: "sans-serif", marginBottom: 0 }}>Number of drops</h4>
            <label style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif" }}>
                <input
                    type="number"
                    min={1}
                    value={numberOfDrops}
                    onChange={(event) => {
                        const players = parseInt(event.target.value)

                        if (!isNaN(players)) {
                            setNumberOfDrops(players)
                        }
                    }}
                />
            </label>

            <h4 style={{ fontFamily: "sans-serif", marginBottom: 0 }}>Split system</h4>
            <select value={splitType} onChange={(event) => setSplitType(event.target.value)}>
                <option value="7-10">7-10</option>
                <option value="7-10 trials & mock trials">7-10 trial & mock trial</option>
                <option value="FC">FC</option>
            </select>

            <h4 style={{ fontFamily: "sans-serif", marginBottom: 0 }}>Players</h4>
            <label style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif" }}>
                <input
                    type="number"
                    min={1}
                    value={players}
                    onChange={(event) => {
                        const players = parseInt(event.target.value)

                        if (!isNaN(players)) {
                            setPlayers(players)
                        }
                    }}
                />
                Players
            </label>

            <h4 style={{ fontFamily: "sans-serif" }}>
                {`Splitting ${sellPrice}m 
                from ${numberOfDrops} drop${numberOfDrops === 1 ? "" : "s"} 
                between ${players} players using the ${splitType} rules`}
            </h4>

            {tips.map((tip) => (
                <p style={{ fontFamily: "sans-serif" }}>
                    {`${tip.role}: ${(mainSplit + tip.ammount * numberOfDrops).toFixed(3)}m (${
                        tip.ammount * numberOfDrops
                    }m tip)`}
                </p>
            ))}

            <p style={{ fontFamily: "sans-serif" }}>{`Others: ${mainSplit.toFixed(3)}m`}</p>
        </React.Fragment>
    )
}

export default Calculator
