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
    const data = await chrome.storage.sync.get(domain);
    let path;

    if (data[domain]) {
      path = "icon19-disable.png";
      await chrome.storage.sync.remove(domain);
    } else {
      path = "icon19.png";
      await chrome.storage.sync.set({ [domain]: true });
    }
    await chrome.action.setIcon({
      path,
      tabId: tab.id,
    });

    await chrome.tabs.reload(tab.id);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  let path;

  if (
    tab?.url &&
    tab.url.startsWith("http") &&
    (await needEnableCopy(tab.url))
  ) {
    path = "icon19.png";
  } else {
    path = "icon19-disable.png";
  }
  await chrome.action.setIcon({
    path,
    tabId: activeInfo.tabId,
  });
});
