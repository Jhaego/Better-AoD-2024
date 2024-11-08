import { useReducer } from "react"
import { minion } from "./data"
import { deduceLastMinion } from "./helpers"

export type State = { allDead: boolean; order: minion[] }

const defaultState: State = {
    allDead: false,
    order: []
}

type clearStateAction = { type: "clear" }
type addMinionAction = { type: "addMinion"; minion: minion }

const reducer = (state: State, action: clearStateAction | addMinionAction): State => {
    switch (action.type) {
        case "clear":
            // Don't change this to the default state constant
            return {
                allDead: false,
                order: []
            }
        case "addMinion":
            if (!state.order.includes(action.minion)) {
                const newState = { ...state }

                newState.order.push(action.minion)

                // Deduce last minion
                const lastMinion = deduceLastMinion(newState.order)
                if (lastMinion) {
                    newState.order.push(lastMinion)

                    newState.order.forEach((minion, index) => {
                        if (index + 1 < newState.order.length) {
                            minion.audio.onended = () => {
                                try {
                                    newState.order[index + 1].audio.play()
                                } catch {
                                    console.log("minion death audio error")
                                }
                            }
                        } else {
                            minion.audio.onended = () => null
                        }
                    })

                    try {
                        newState.order[0].audio.play()
                    } catch {
                        console.log("minion death audio error123")
                    }
                }

                return newState
            }

            if (state.order.length === 4) {
                return { ...state, allDead: true }
            }

            return state
        default:
            throw new Error("Invalid action type")
    }
}

const useMinionState = () => useReducer(reducer, defaultState)

export default useMinionState
