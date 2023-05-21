document.addEventListener("DOMContentLoaded", function() {
    // Get the blocked URL from the query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const blockedUrl = urlParams.get('originalUrl');
    if (blockedUrl) {
      const blockedUrlElement = document.getElementById("blockedUrl");
      if (blockedUrlElement) {
        blockedUrlElement.textContent = blockedUrl;
      }
    }
  
    // Add event listener to continue button
    const continueButton = document.getElementById("continueButton");
    if (continueButton) {
      continueButton.addEventListener("click", function() {
        // Send message to background script to unblock .zip domains
        chrome.runtime.sendMessage({ unblockZipDomains: true, blockedUrl:blockedUrl });
      });
    }
  });
  