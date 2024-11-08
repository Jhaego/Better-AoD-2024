import React from "react"
import { minions } from "../data"

import { State } from "../useMinionState"

const numbersDisplay: React.FC<{ windowSize: { height: number; width: number }; state: State }> = ({
    windowSize,
    state
}) => {
    const fontSize = Math.min(windowSize.width / 1.25, windowSize.height / 1.25)

    return (
        <div style={{ display: "flex", flex: 1, width: "100%", flexWrap: "wrap" }}>
            {[minions.Curor, minions.Glacies, minions.Fumus, minions.Umbra].map((minion) => {
                const position = state.order.indexOf(minion)

                return (
                    <div
                        key={minion.name}
                        style={{
                            display: "flex",
                            width: "50%",
                            backgroundColor: minion.color,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <h1
                            style={{
                                color: "#D0D0D0",
                                fontFamily: "sans-serif",
                                fontSize: fontSize / 2,
                                margin: 0,
                                textDecoration: position === 3 && !state.allDead ? "underline overline" : "none"
                            }}
                        >
                            {position !== -1 ? position + 1 : "?"}
                        </h1>
                    </div>
                )
            })}
        </div>
    )
}

export default numbersDisplay
