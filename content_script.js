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
  "select",
  "dragstart",
  "copy",
  "beforecopy",
  "cut",
  "paste",
  "mousedown",
  "mouseup",
  "keydown",
  "keyup",
  "keypress",
];

function enableCopy() {
  eventsToStop.forEach((eventName) => {
    window.addEventListener(eventName, stopEventPropagation, true);
  });

  let styleElement = document.createElement("style");
  styleElement.innerHTML = `html, body, *, *::before, *::after {
  user-select: text !important; -webkit-user-select: text !important;
}`;
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
