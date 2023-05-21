const adblockRuleID = 1;

function blockZipDomains() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [adblockRuleID],
    addRules: [
        {
            id: adblockRuleID,
            priority: 1,
            condition: {
                regexFilter: "(.*\\.zip)(.*)",
                resourceTypes: ["main_frame"],
            },
            action: {
                type: "redirect",
                redirect: {
                    regexSubstitution: `chrome-extension://${chrome.runtime.id}/warning.html?originalUrl=\\1`,
                },
            },
        },
    ],
});
}

function unblockZipDomains() {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [adblockRuleID],
    }
  ).then()
}

chrome.runtime.onInstalled.addListener(() => {
  blockZipDomains();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.unblockZipDomains) {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [adblockRuleID],
      },
      () => {
        var blockedUrl = request.blockedUrl;
        chrome.tabs.update(sender.tab.id, {url: blockedUrl});
        setTimeout(function() {
          blockZipDomains();
        }, 3000);
      }
    )
  }
});