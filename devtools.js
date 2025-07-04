document.getElementById("optimizeBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "optimize" });
});

document.getElementById("showHowBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "showHow" });
});
