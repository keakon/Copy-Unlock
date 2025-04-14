const DOMAIN_PATTERN = /^https?:\/\/([^\/]+)/;

function getDomainFromUrl(url) {
  if (url && url.startsWith("http")) {
    const result = DOMAIN_PATTERN.exec(url);
    return result ? result[1] : null;
  }
  return null;
}

async function needEnableCopy(url) {
  const domain = getDomainFromUrl(url);
  if (!domain) {
    return false;
  }
  const data = await chrome.storage.sync.get(domain);
  return domain in data;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    (changeInfo.status === "loading" || changeInfo.url) &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    const currentUrl = changeInfo.url || tab.url;
    const enabled = await needEnableCopy(currentUrl);
    chrome.action.setIcon({
      path: enabled ? "icon19.png" : "icon19-disable.png",
      tabId: tabId,
    });
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  const domain = getDomainFromUrl(tab.url);
  if (domain && tab.id) {
    let enabled;
    const data = await chrome.storage.sync.get(domain);

    if (data[domain]) {
      enabled = false;
      await chrome.storage.sync.remove(domain);
    } else {
      enabled = true;
      await chrome.storage.sync.set({ [domain]: true });
    }
    await chrome.action.setIcon({
      path: enabled ? "icon19.png" : "icon19-disable.png",
      tabId: tab.id,
    });

    await chrome.tabs.reload(tab.id);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab?.url && tab.url.startsWith("http")) {
    const enabled = await needEnableCopy(tab.url);
    await chrome.action.setIcon({
      path: enabled ? "icon19.png" : "icon19-disable.png",
      tabId: activeInfo.tabId,
    });
  } else {
    await chrome.action.setIcon({
      path: "icon19-disable.png",
      tabId: activeInfo.tabId,
    });
  }
});
