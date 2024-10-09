// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "storeData") {
    // Store the received data in local storage
    chrome.storage.local.set({ fetchedData: request.data }, () => {
      console.log("Data stored:", request.data);
      // Send a response back
      sendResponse({ status: "success" });
    });
    return true; // Indicate that we will send a response asynchronously
  }
});
