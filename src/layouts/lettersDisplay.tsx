import React from "react"

import { State } from "../useMinionState"

const lettersDisplay: React.FC<{ windowSize: { height: number; width: number }; state: State }> = ({
    windowSize,
    state
}) => {
    const fontSize = Math.min(windowSize.width / 3, windowSize.height / 1.25)

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {state.order.map((minion, index) => {
                return (
                    <h1
                        key={minion.name}
                        style={{
                            color: minion.color,
                            fontFamily: "sans-serif",
                            fontSize,
                            margin: 0,
                            textDecoration: index === 3 && !state.allDead ? "underline overline" : "none"
                        }}
                    >
                        {minion.initial}
                    </h1>
                )
            })}

            {state.order.length === 0 && (
                <h1
                    style={{
                        color: "#D0D0D0",
                        fontFamily: "sans-serif",
                        fontSize,
                        margin: 0
                    }}
                >
                    ????
                </h1>
            )}
        </div>
    )
}

export default lettersDisplay
