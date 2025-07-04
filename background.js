chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "optimize") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"]
    });
  }

  if (request.action === "showHow") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: () => {
        alert(`Sugestão aplicada:
div[data-opt="centralize"] {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}`);
      }
    });
  }
});
