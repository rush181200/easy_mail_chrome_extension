// Function to fetch data from the current page
function fetchData() {
  setTimeout(() => {
    const personName = document.querySelector(".mt2 div div span a h1");
    const companyName = document.querySelector(".mt2 ul li button span div");

    const fetchedData = {};

    if (personName) {
      fetchedData.personName = personName.textContent.trim();
    } else {
      fetchedData.personName =
        "No person name found with the specified selector.";
    }

    if (companyName) {
      fetchedData.companyName = companyName.textContent.trim();
    } else {
      fetchedData.companyName =
        "No company name found with the specified selector.";
    }

    chrome.storage.local.set({ fetchedData }, () => {
      console.log("Fetched Data:", fetchedData);
    });
  }, 500); // Delay to allow LinkedIn's dynamic content to load
}

function clearData() {
  chrome.storage.local.remove("fetchedData", () => {
    console.log("Cleared fetched data.");
  });
}

function observeProfileChanges() {
  let currentUrl = window.location.href;

  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      console.log("Page or profile changed!");
      clearData();
      currentUrl = window.location.href;
      fetchData();
    }
  });

  const targetNode = document.querySelector("body");
  const config = { childList: true, subtree: true };

  if (targetNode) {
    observer.observe(targetNode, config);
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchData") {
    fetchData();
    sendResponse({ status: "Data fetch initiated." });
  }
});

// Initial call to fetch data when the script first runs
fetchData();

// Start observing for page or profile changes
observeProfileChanges();
