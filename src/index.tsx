import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { mixColor } from "alt1/base"
import ChatBoxReader from "alt1/chatbox"
import { displayDetectionMessage, alt1 } from "./helpers"
import {
    detectBomb,
    detectDirectionalSmoke,
    detectKillStart,
    detectGemEnd,
    detectGemStart,
    detectMinionDeath,
    detectPool,
    detectPlayerDeath,
    detectKillEnd
} from "./textDetection"
import { east, north, pool, poolPop, bomb, newKill } from "./audio"
import useMinionState from "./useMinionState"
import useSettings from "./useSettings"
import SettingsForm from "./layouts/settingsForm"
import LettersDisplay from "./layouts/lettersDisplay"
import NumbersDisplay from "./layouts/numbersDisplay"
import useEventLogState from "./useEventLogState"
import Info from "./layouts/info"
import Log from "./layouts/log"
import Calculator from "./layouts/calculator"

const phrases = [
    'passive be the berries kids',
    'full send or no send, my dudes',
    'big yikes but bigger vibes',
    'oof is temporary, memes are forever',
    'rise, yeet, meme, repeat',
    'meme now cringe later eat a tater',
    'dont let your memes be dreams'
];
const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

const createNewReader = () => {
    const reader = new ChatBoxReader();
    reader.readargs = {
        colors: [
            mixColor(255, 160, 0),
            mixColor(45, 186, 21),
            mixColor(45, 186, 20),
            mixColor(159, 255, 159),
            mixColor(255, 82, 86),
            mixColor(225, 35, 35),
            mixColor(235, 47, 47),
            mixColor(153, 255, 153),
            mixColor(155, 48, 255),
            mixColor(255, 0, 255),
            mixColor(0, 255, 255),
            mixColor(255, 0, 0),
            mixColor(255, 255, 255),
            mixColor(127, 169, 255)
        ]
    };
    return reader;
};

const createWindow = (name, width = 350, height = 500) => {
    const newWindow = window.open("", name, `width=${width},height=${height}`);
    if (newWindow && newWindow.document.getElementById("root") === null) {
        newWindow.document.write(`<div id="root" style="height: 100%; width: 100%"></div>`);
    }
    return newWindow;
};

const secondsForPoolToPop = 22;
const poolReminderSeconds = [3, 2, 1];

displayDetectionMessage("Better AOD starting", 5000);

function App() {
    const [infoWindow, setInfoWindow] = useState<Window | null>(null);
    const [settingsWindow, setSettingsWindow] = useState<Window | null>(null);
    const [logWindow, setLogWindow] = useState<Window | null>(null);
    const [calculatorWindow, setCalculatorWindow] = useState<Window | null>(null);

    const readerRef = useRef(createNewReader());
    const [state, dispatch] = useMinionState();
    const [log, dispatchLog] = useEventLogState();
    const [settings, settingsDispatch] = useSettings();

    const [windowSize, setWindowSize] = useState({ height: window.innerHeight, width: window.innerWidth });
    const [elementSize, setElementSize] = useState(Math.min(window.innerWidth, window.innerHeight));

    const showInfo = () => setInfoWindow(createWindow("Info"));
    const showSettings = () => setSettingsWindow(createWindow("Settings"));
    const showLog = () => setLogWindow(createWindow("Log"));
    const showCalculator = () => setCalculatorWindow(createWindow("Calculator"));

    useEffect(() => {
        const resizeHandler = () => {
            setWindowSize({ height: window.innerHeight, width: window.innerWidth });
            setElementSize(Math.min(window.innerWidth, window.innerHeight));
        };

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const tick = () => {
        try {
            let chatLines = readerRef.current.read();
            if (chatLines === null) {
                console.log("attempting find");

                const findResult = readerRef.current.find();
                if (readerRef.current.pos) {
                    alt1.overLayRect(
                        mixColor(45, 186, 21),
                        readerRef.current.pos.mainbox.rect.x,
                        readerRef.current.pos.mainbox.rect.y,
                        readerRef.current.pos.mainbox.rect.width,
                        readerRef.current.pos.mainbox.rect.height,
                        1000,
                        1
                    );
                }

                if (findResult === null) {
                    displayDetectionMessage(
                        "Can't detect chatbox\nPlease press enter so chatbox is highlighted for detection",
                        600,
                        30
                    );
                    return;
                }

                chatLines = readerRef.current.read() || [];
            }

            chatLines.forEach((line) => {
                const handleEventDetection = (detectionFn, eventType) => {
                    if (detectionFn(line.text)) {
                        dispatchLog({ type: "logEvent", eventType, message: line.text });
                    }
                };

                handleEventDetection(detectGemStart, "GemStart");
                handleEventDetection(detectGemEnd, "GemEnd");
                handleEventDetection(detectKillEnd, "KillFinish");
                handleEventDetection(detectPlayerDeath, "PlayerDeath");

                if (detectKillStart(line.text)) {
                    dispatch({ type: "clear" });

                    if (settings.newKillMessage.text) {
                        displayDetectionMessage("New kill", 5000);
                    }
                    if (settings.newKillMessage.volume > 0) {
                        newKill.play();
                    }
                }

                const directionalSmoke = detectDirectionalSmoke(line.text);
                if (directionalSmoke) {
                    dispatchLog({ type: "logEvent", eventType: "Smoke", message: line.text });

                    if (settings.smokeMessage.text) {
                        displayDetectionMessage(directionalSmoke, 5000);
                    }
                    if (settings.smokeMessage.volume > 0) {
                        if (directionalSmoke === "North") north.play();
                        else if (directionalSmoke === "East") east.play();
                    }
                }

                if (detectPool(line.text)) {
                    dispatchLog({ type: "logEvent", eventType: "Pool", message: line.text });
                    if (settings.poolMessage.text) {
                        displayDetectionMessage("Pool", 5000);
                        poolReminderSeconds.forEach((secondsUntill) => {
                            setTimeout(() => {
                                displayDetectionMessage(`Pool popping ...${secondsUntill}`, 1000);
                            }, (secondsForPoolToPop - secondsUntill) * 1000);
                        });
                    }
                    if (settings.poolMessage.volume > 0) {
                        pool.play();
                        setTimeout(() => poolPop.play(), (secondsForPoolToPop - 4) * 1000);
                    }
                }

                if (detectBomb(line.text)) {
                    dispatchLog({ type: "logEvent", eventType: "Bomb", message: line.text });
                    if (settings.bombMessage.text) displayDetectionMessage("Bomb", 5000);
                    if (settings.bombMessage.volume > 0) bomb.play();
                }

                const minion = detectMinionDeath(line.text);
                if (minion) {
                    dispatch({ type: "addMinion", minion });
                }
            });
        } catch (error) {
            console.log(error);
            displayDetectionMessage("An error has occurred", 600);
        }
    };

    useEffect(() => {
        const tickInterval = setInterval(tick, 600);
        return () => clearInterval(tickInterval);
    }, [settings, dispatch, dispatchLog]);

    useEffect(() => {
        if (infoWindow) ReactDOM.render(<Info />, infoWindow.document.getElementById("root"));
        if (settingsWindow) ReactDOM.render(
            <SettingsForm settings={settings} settingsDispatch={settingsDispatch} />,
            settingsWindow.document.getElementById("root")
        );
        if (logWindow) ReactDOM.render(
            <Log log={log} clearLog={() => dispatchLog({ type: "clear" })} 
                 removeEvent={(index) => dispatchLog({ type: "removeEvent", index })} />,
            logWindow.document.getElementById("root")
        );
        if (calculatorWindow) ReactDOM.render(<Calculator />, calculatorWindow.document.getElementById("root"));
    });

    const renderDisplay = () => {
        return settings.displayType === "Numbers" ? (
            <NumbersDisplay windowSize={windowSize} state={state} />
        ) : (
            <LettersDisplay windowSize={windowSize} state={state} />
        );
    };

    return (
        <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
                minWidth: "100%",
                backgroundColor: "#04121b",
                backgroundImage: "url(./background.png)"
            }}>
            <div>
                <button onClick={showSettings}>Settings</button>
                <button onClick={showInfo}>Info</button>
                <button onClick={showLog}>Log</button>
                <button onClick={showCalculator}>Calculator</button>
            </div>
            {renderDisplay()}
            <span className="footer">Better AOD © - {randomPhrase}</span>
        </div>
    );
}

export default App;