const DOMAIN_PATTERN = /^https?:\/\/([^\/]+)/;

function getDomainFromUrl(url) {
  if (url && url.startsWith("http")) {
    const result = DOMAIN_PATTERN.exec(url);
    return result ? result[1] : null;
  }
  return null;
}

function stopEventPropagation(event) {
  event.stopImmediatePropagation();
}

const eventsToStop = [
  "contextmenu",
  "selectstart",
  "copy",
  "beforecopy",
  "cut",
  "mousedown",
  "mouseup",
  "dragstart",
  "keydown",
];

function enableCopy() {
  eventsToStop.forEach((eventName) => {
    document.addEventListener(eventName, stopEventPropagation, true);
  });

  let styleElement = document.createElement("style");
  styleElement.innerHTML = `*, *::before, *::after {
  user-select: text !important; -webkit-user-select: text !important; cursor: auto !important;
}
body { overflow: auto !important; }`;
  requestAnimationFrame(() => {
    (document.head || document.documentElement).appendChild(styleElement);
  });
}

async function checkInitialState() {
  const currentUrl = window.location.href;
  const currentDomain = getDomainFromUrl(currentUrl);

  if (!currentDomain) {
    return;
  }

  const data = await chrome.storage.sync.get(currentDomain);
  if (currentDomain in data) {
    enableCopy();
  }
}

checkInitialState();
