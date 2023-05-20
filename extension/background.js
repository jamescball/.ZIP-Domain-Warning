// Variable to keep track of whether .zip domains are blocked
let blockZipDomains = true;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const domain = new URL(details.url).hostname;
    if (blockZipDomains && domain.endsWith(".zip")) {
      const warningUrl = chrome.runtime.getURL("warning.html");
      const originalUrl = details.url;
      const redirectUrl = warningUrl + "?originalUrl=" + encodeURIComponent(originalUrl);
      return { redirectUrl };
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame", "sub_frame"] },
  ["blocking"]
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.unblockZipDomains) {
    blockZipDomains = false;
    setTimeout(function() {
      blockZipDomains = true;
    }, 3000);
  }
});
