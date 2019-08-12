

function random(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// This method calls a function at a random time between t=lower and t=upper. I didn't write this myself.

const setRandomInterval = (callback, lower, upper) => {
    let activeTimeout;

    const timeout = () => {
        activeTimeout = setTimeout(
            () => {
                callback()
                timeout()
            },
            random(lower, upper),
        )
    }

    timeout()

    return { clear: () => clearTimeout(activeTimeout) }
}

// Listens to a click on the extension button.
let toggle = false
let randomIntervalID = null
chrome.browserAction.onClicked.addListener(function(tab) {
    toggle = !toggle
    if (!toggle) {
        // Creates the Chrome tab and pin it.
        chrome.tabs.create({"url": "https://www.reddit.com/", "pinned": true})
        // Changes the image of the button.
        chrome.browserAction.setIcon({path: "refresh_on.png"})
        randomIntervalID = setRandomInterval(function () {
            // Finds the tab that has been created and reloads it.
            chrome.tabs.query({"pinned": true, "url": "https://www.reddit.com/"}, function(tab) {
                if (tab[0]) {
                    chrome.tabs.reload(tab[0].id)
                }
            })
        }, 3000, 20000)
    } else {
        randomIntervalID.clear()
        chrome.browserAction.setIcon({path: "refresh_off.png"})

        // chrome.tabs.executeScript({code: "alert('test')"})
    }
})


