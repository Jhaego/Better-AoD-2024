import React from "react"
import useSettings, { messages, MessageTypes } from "../useSettings"

const TextInput: React.FC<{
    message: MessageTypes
    settings: ReturnType<typeof useSettings>[0]
    settingsDispatch: ReturnType<typeof useSettings>[1]
}> = ({ message, settings, settingsDispatch }) => (
    <label
        style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "sans-serif"
        }}
    >
        Text message
        <input
            type="checkbox"
            checked={settings[message].text}
            onChange={(event) =>
                settingsDispatch({
                    message,
                    type: "text",
                    newValue: event.target.checked
                })
            }
        />
    </label>
)

const VolumeInput: React.FC<{
    message: MessageTypes | "orderMessage"
    settings: ReturnType<typeof useSettings>[0]
    settingsDispatch: ReturnType<typeof useSettings>[1]
}> = ({ message, settings, settingsDispatch }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
        <img
            src="./resources/volume-mute.svg"
            alt="settings"
            height={20}
            width={20}
            onClick={() =>
                settingsDispatch({
                    message: "newKillMessage",
                    type: "volume",
                    newValue: 0
                })
            }
        />

        <input
            type="range"
            value={settings[message].volume}
            min={0}
            max={1}
            step={0.2}
            style={{ width: 80 }}
            onChange={(event) =>
                settingsDispatch({
                    message,
                    type: "volume",
                    newValue: parseFloat(event.target.value)
                })
            }
        />

        <img
            src="./resources/volume-high.svg"
            alt="settings"
            height={20}
            width={20}
            onClick={() =>
                settingsDispatch({
                    message: "newKillMessage",
                    type: "volume",
                    newValue: 1
                })
            }
        />
    </div>
)

const SettingsForm: React.FC<{
    settings: ReturnType<typeof useSettings>[0]
    settingsDispatch: ReturnType<typeof useSettings>[1]
}> = ({ settings, settingsDispatch }) => (
    <React.Fragment>
        <h2 style={{ fontFamily: "sans-serif" }}>Settings</h2>

        <h4 style={{ fontFamily: "sans-serif" }}>Display type</h4>
        <select
            value={settings.displayType}
            onChange={(event) => {
                if (
                    event.target.value === "Numbers" ||
                    event.target.value === "Letters"
                )
                    settingsDispatch({
                        type: "setDisplayType",
                        newValue: event.target.value
                    })
            }}
        >
            <option value="Letters">Letters</option>
            <option value="Numbers">Numbers</option>
        </select>

        <h4 style={{ fontFamily: "sans-serif" }}>Minion order reading</h4>
        <VolumeInput
            message={"orderMessage"}
            settings={settings}
            settingsDispatch={settingsDispatch}
        />

        {Object.entries(messages).map(([message, title]) => (
            <React.Fragment key={message}>
                <h4 style={{ fontFamily: "sans-serif" }}>{title}</h4>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}
                >
                    <VolumeInput
                        message={message as MessageTypes}
                        settings={settings}
                        settingsDispatch={settingsDispatch}
                    />

                    <TextInput
                        message={message as MessageTypes}
                        settings={settings}
                        settingsDispatch={settingsDispatch}
                    />
                </div>

                <br />
            </React.Fragment>
        ))}
    </React.Fragment>
)

export default SettingsForm
