import { mixColor } from "alt1/dist/base"
import { minion, minionList } from "./data"

export const alt1 = window.alt1

export const displayDetectionMessage = (message: string, duration: number, size?: number) => {
    alt1?.overLayClearGroup("1")
    alt1?.overLaySetGroup("1")
    alt1?.overLayTextEx(
        message,
        mixColor(220, 30, 30),
        size || 48,
        Math.round(alt1.rsWidth / 2),
        Math.round(alt1.rsHeight / 4),
        duration,
        "serif",
        true,
        true
    )
}

export const getMinionFromInitial = (initial: string) => {
    const result = minionList.find((minion) => minion.initial === initial)

    if (!result) {
        console.error(`Minion not found from initial: ${initial}`)

        return null
    }

    return result
}

export const deduceLastMinion = (order: minion[]) => {
    const minionsNotIncluded = minionList.filter((minion) => !order.includes(minion))

    if (minionsNotIncluded.length === 1) {
        return minionsNotIncluded[0]
    }
}
