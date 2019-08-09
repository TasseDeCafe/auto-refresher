chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            // let firstHref = $("a[href^='http']").eq(0).attr("href")
            let lesoirHref = "https://www.lesoir.be/"

            chrome.runtime.sendMessage({"message": "open_new_tab", "url": lesoirHref})
        }
    }
)




