// background.js

function random(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

let toggle = false
chrome.browserAction.onClicked.addListener(function(tab) {
    toggle = !toggle
    if (!toggle) {
        chrome.tabs.create({"url": "https://www.reddit.com/", "pinned": true})
        chrome.browserAction.setIcon({path: "refresh_on.png"})
        setRandomInterval(function () {
            chrome.tabs.query({"pinned": true, "url": "https://www.reddit.com/"}, function(tab) {
                chrome.tabs.reload(tab[0].id)
            })
        }, 3000, 20000)
    } else {
        chrome.browserAction.setIcon({path: "refresh_off.png"})

        // chrome.tabs.executeScript({code: "alert('test')"})
    }
})


