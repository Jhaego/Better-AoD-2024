import { useReducer } from "react"

export type eventType = "PlayerDeath" | "KillFinish" | "GemStart" | "GemEnd" | "Smoke" | "Bomb" | "Pool" | "MinionDeath"
export type event = { date: Date; eventType: eventType; message: string }

export type LogState = {
    events: event[]
}

const defaultState: LogState = {
    events: []
}

type clearLogAction = { type: "clear" }
type logEventAction = {
    type: "logEvent"
    eventType: eventType
    message: string
}
type removeEventAction = {
    type: "removeEvent"
    index: number
}

const reducer = (state: LogState, action: clearLogAction | logEventAction | removeEventAction): LogState => {
    const newState = state

    switch (action.type) {
        case "clear":
            // Don't change this to the default state constant
            return {
                events: []
            }
        case "logEvent":
            newState.events.push({
                date: new Date(),
                eventType: action.eventType,
                message: action.message
            })

            return newState
        case "removeEvent":
            const temp = newState.events
            temp.splice(action.index, 1)

            return { events: temp }
        default:
            throw new Error("Invalid action type")
    }
}

const useLogState = () => useReducer(reducer, defaultState)

export default useLogState
