import React from "react"

const Info: React.FC<{}> = () => (
    <React.Fragment>
        <h2 style={{ fontFamily: "sans-serif" }}>FAQ</h2>

        <h4 style={{ fontFamily: "sans-serif" }}>Does this work in other languages?</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            This app currently functions in English, German and French. When not in English, Alt1 can have issues
            detecting the chatbox. This is indicated by a message. To fix this, press enter so the typing area of the
            chatbox is outlined and wait for the error message to disappear.
        </p>

        <h4 style={{ fontFamily: "sans-serif" }}>Having issues detecting things</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            This app requires you to have gamechat in either the "on" or "filtered" settings and the chatbox to be
            scrolled completely to the bottom. The app also reads each line separately so issues may occur if your chat
            box is so small that certain messages that are scanned for split on multiple lines. Please ensure your font
            size is 12 or larger (14 is best) as font 10 has significant detection issues.
        </p>

        <h4 style={{ fontFamily: "sans-serif" }}>Double reading things</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            This can happen for several reasons around messages in the chatbox being obscured. This can be caused by:
            scrolling up, changing chat window, loading screens (when you teleport to Nex bank) or the floating monster
            HP bar covering the chat box
        </p>

        <h4 style={{ fontFamily: "sans-serif" }}>Forum post</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            <a href="https://runeapps.org/forums/viewtopic.php?pid=4425#p4425">
                https://runeapps.org/forums/viewtopic.php?pid=4425#p4425
            </a>
        </p>

        <h4 style={{ fontFamily: "sans-serif" }}>Add app link</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            <a href="alt1://addapp/https://5tjf8.csb.app/appconfig.json">
                alt1://addapp/https://5tjf8.csb.app/appconfig.json
            </a>
        </p>

        <h4 style={{ fontFamily: "sans-serif" }}>Source code</h4>

        <p style={{ fontFamily: "sans-serif" }}>
            <a href="https://codesandbox.io/s/better-aod-dev-version-5tjf8">
                https://codesandbox.io/s/better-aod-dev-version-5tjf8
            </a>
        </p>
    </React.Fragment>
)

export default Info
