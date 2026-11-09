// Element selection

const settingsPopup =
    document.getElementById("settingsPopup");

const openSettings =
    document.getElementById("openSettings");

const closeSettings =
    document.getElementById("closeSettings");

const textSize =
    document.getElementById("textSize");

const textColor =
    document.getElementById("textColor");

const darkModeToggle =
    document.getElementById("darkModeToggle");

const ttsToggle =
    document.getElementById("ttsToggle");

// Settings popup

if (openSettings && settingsPopup) {

    openSettings.addEventListener(
        "click",
        () => {

            settingsPopup.style.display =
                "flex";

        }
    );

}

if (closeSettings && settingsPopup) {

    closeSettings.addEventListener(
        "click",
        () => {

            settingsPopup.style.display =
                "none";

        }
    );

}

// Restore saved settings

const savedTextSize =
    localStorage.getItem("textSize");

if (savedTextSize) {

    document.body.style.fontSize =
        savedTextSize;

    if (textSize) {

        textSize.value =
            savedTextSize;

    }

}

const savedTextColor =
    localStorage.getItem("textColor");

if (savedTextColor) {

    document.body.style.color =
        savedTextColor;

    if (textColor) {

        textColor.value =
            savedTextColor;

    }

}

const savedDarkMode =
    localStorage.getItem("darkMode");

if (savedDarkMode === "enabled") {

    document.body.classList.add(
        "dark-mode"
    );

}

// Text size

if (textSize) {

    textSize.addEventListener(
        "change",

        function () {

            document.body.style.fontSize =
                this.value;

            localStorage.setItem(
                "textSize",
                this.value
            );

        }

    );

}

// Text colour

if (textColor) {

    textColor.addEventListener(
        "change",

        function () {

            document.body.style.color =
                this.value;

            localStorage.setItem(
                "textColor",
                this.value
            );

        }

    );

}

// Dark mode

if (darkModeToggle) {

    if (
        localStorage.getItem("darkMode")
        === "enabled"
    ) {

        darkModeToggle.textContent =
            "Disable Dark Mode";

    }

    darkModeToggle.addEventListener(
        "click",

        () => {

            document.body.classList.toggle(
                "dark-mode"
            );

            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );

                darkModeToggle.textContent =
                    "Disable Dark Mode";

            }

            else {

                localStorage.setItem(
                    "darkMode",
                    "disabled"
                );

                darkModeToggle.textContent =
                    "Enable Dark Mode";

            }

        }

    );

}

// TTS setup

let ttsEnabled = false;
// Property filters

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;

        document
            .querySelectorAll(
                ".property-card"
            )

            .forEach(card => {

                const type =
                    card.dataset.type;

                if (
                    filter === "all" ||
                    type === filter
                ) {

                    card.style.display = "";

                }

                else {

                    card.style.display =
                        "none";

                }

            });

    });

});

// Property search

const propertySearch =
    document.getElementById(
        "propertySearch"
    );

if (propertySearch) {

    propertySearch.addEventListener(
        "input",

        function () {

            const searchText =
                this.value.toLowerCase();

            document
                .querySelectorAll(
                    ".property-card"
                )

                .forEach(card => {

                    const cardText =
                        card.textContent.toLowerCase();

                    if (
                        cardText.includes(
                            searchText
                        )
                    ) {

                        card.style.display =
                            "";

                    }

                    else {

                        card.style.display =
                            "none";

                    }

                });

        }

    );

}

// Under construction popup

const ucPopup =
    document.getElementById(
        "ucPopup"
    );

const ucClose =
    document.getElementById(
        "ucClose"
    );

function showUnderConstruction() {

    if (ucPopup) {

        ucPopup.style.display =
            "flex";

    }

}

if (ucClose) {

    ucClose.addEventListener(
        "click",

        () => {

            if (ucPopup) {

                ucPopup.style.display =
                    "none";

            }

        }

    );

}

// Enable under construction popup
// for unfinished buttons

document
    .querySelectorAll("button")

    .forEach(button => {

        const ignore = [

            "openSettings",
            "closeSettings",

            "darkModeToggle",
            "ttsToggle",

            "chatBubble",
            "closeChat",

            "refButton",
            "refClose",

            "ucClose"

        ];

        if (

            !ignore.includes(
                button.id
            )

            &&

            !button.dataset.reply

            &&

            !button.dataset.filter

        ) {

            button.addEventListener(
                "click",

                showUnderConstruction
            );

        }

    });

// Enable under construction popup
// for property cards that
// do not have links

document
    .querySelectorAll(
        ".property-card"
    )

    .forEach(card => {

        if (

            !card.getAttribute(
                "onclick"
            )

        ) {

            card.addEventListener(
                "click",

                showUnderConstruction
            );

        }

    });

// References popup

const refButton =
    document.getElementById(
        "refButton"
    );

const refPopup =
    document.getElementById(
        "refPopup"
    );

const refClose =
    document.getElementById(
        "refClose"
    );

if (
    refButton &&
    refPopup
) {

    refButton.addEventListener(
        "click",

        () => {

            refPopup.style.display =
                "flex";

        }

    );

}

if (
    refClose &&
    refPopup
) {

    refClose.addEventListener(
        "click",

        () => {

            refPopup.style.display =
                "none";

        }

    );

}
// Restore TTS preference

if (
    localStorage.getItem("ttsEnabled")
    === "true"
) {

    ttsEnabled = true;

    if (ttsToggle) {

        ttsToggle.textContent =
            "Disable TTS";

    }

}

// TTS toggle

if (ttsToggle) {

    ttsToggle.addEventListener(
        "click",

        () => {

            ttsEnabled =
                !ttsEnabled;

            localStorage.setItem(
                "ttsEnabled",
                ttsEnabled
            );

            if (ttsEnabled) {

                ttsToggle.textContent =
                    "Disable TTS";

                speechSynthesis.cancel();

                const pageContent =
                    document.querySelector(
                        "main"
                    );

                if (pageContent) {

                    const utterance =
                        new SpeechSynthesisUtterance(
                            pageContent.innerText
                        );

                    speechSynthesis.speak(
                        utterance
                    );

                }

            }

            else {

                ttsToggle.textContent =
                    "Enable TTS";

                speechSynthesis.cancel();

            }

        }

    );

}

// Chat widget

const chatBubble =
    document.getElementById(
        "chatBubble"
    );

const chatBox =
    document.getElementById(
        "chatBox"
    );

const closeChat =
    document.getElementById(
        "closeChat"
    );

const chatMessages =
    document.getElementById(
        "chatMessages"
    );

const chatOptions =
    document.querySelectorAll(
        ".chat-option"
    );

if (chatBubble && chatBox) {

    chatBubble.addEventListener(
        "click",

        () => {

            chatBox.style.display =
                "block";

        }

    );

}

if (closeChat && chatBox) {

    closeChat.addEventListener(
        "click",

        () => {

            chatBox.style.display =
                "none";

        }

    );

}

// Chat responses

if (chatMessages) {

    chatOptions.forEach(option => {

        option.addEventListener(
            "click",

            () => {

                const userMsg =
                    document.createElement(
                        "p"
                    );

                userMsg.className =
                    "user-msg";

                userMsg.textContent =
                    option.textContent;

                chatMessages.appendChild(
                    userMsg
                );

                const botMsg =
                    document.createElement(
                        "p"
                    );

                botMsg.className =
                    "bot-msg";

                switch (
                    option.dataset.reply
                ) {

                    case "property":

                        botMsg.textContent =
                            "You can click any property listing to view full property details.";

                        break;

                    case "contact":

                        botMsg.textContent =
                            "You can contact our team through the Contact page or by speaking directly with an agent.";

                        break;

                    case "hours":

                        botMsg.textContent =
                            "Our business hours are Monday to Friday from 9 AM to 5 PM.";

                        break;

                    default:

                        botMsg.textContent =
                            "Thank you for your message.";

                }

                chatMessages.appendChild(
                    botMsg
                );

                if (ttsEnabled) {

                    speechSynthesis.cancel();

                    const utterance =
                        new SpeechSynthesisUtterance(
                            botMsg.textContent
                        );

                    speechSynthesis.speak(
                        utterance
                    );

                }

            }

        );

    });

}

// Property card speech

document
    .querySelectorAll(
        ".property-card"
    )

    .forEach(card => {

        card.addEventListener(
            "click",

            () => {

                if (
                    !ttsEnabled
                ) return;

                const description =
                    card.querySelector(
                        ".description"
                    );

                if (
                    !description
                ) return;

                speechSynthesis.cancel();

                const utterance =
                    new SpeechSynthesisUtterance(
                        description.textContent
                            .trim()
                    );

                speechSynthesis.speak(
                    utterance
                );

            }

        );

    });