import React from "react"
import { LogState, eventType, event } from "src/useEventLogState"
import { format } from "date-fns"
import { detectKillEnd } from "../textDetection"

const eventFilter = (filterTypes: eventType[]) => (events: event[], event: event) =>
    filterTypes.includes(event.eventType) ? [...events, event] : events

const Log: React.FC<{ log: LogState; clearLog: () => void; removeEvent: (index: number) => void }> = ({
    log,
    clearLog,
    removeEvent
}) => {
    const killEvents = log.events.reduce(eventFilter(["KillFinish"]), [])
    const killTimes = killEvents
        .map((event) => detectKillEnd(event.message))
        .filter((time) => typeof time === "number") as number[]
    const averageKillTime = killTimes.reduce((total, time) => total + time, 0) / (killTimes.length || 1)

    return (
        <div>
            <h2 style={{ fontFamily: "sans-serif" }}>Event log</h2>

            <button onClick={clearLog}>Reset log</button>

            <p style={{ fontFamily: "sans-serif" }}>
                Average kill time:
                {format(averageKillTime * 1000, "m:ss")}
            </p>

            <p style={{ fontFamily: "sans-serif" }}>
                Kills:
                {killEvents.length}
            </p>

            <p style={{ fontFamily: "sans-serif" }}>
                Deaths:
                {log.events.reduce(eventFilter(["PlayerDeath"]), []).length}
            </p>

            <h4 style={{ fontFamily: "sans-serif" }}>Log</h4>
            {log.events.map((event, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <p
                            style={{
                                fontFamily: "sans-serif",
                                marginBottom: 0
                            }}
                        >
                            {`${format(event.date, "kk:mm:ss")}: ${event.eventType}`}
                        </p>

                        <p style={{ fontFamily: "sans-serif", marginTop: 0 }}>{event.message}</p>
                    </div>

                    <button onClick={() => removeEvent(index)}>x</button>
                </div>
            ))}
        </div>
    )
}

export default Log
