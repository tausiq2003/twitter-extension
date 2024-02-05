function getState(oneState, twoState) {
  console.log(oneState, twoState);
  if (oneState) {
    if (twoState) {
      chrome.storage.local
        .set({ "status": "3" })
        .then(() => { console.log("Value is 3") })
        .catch((error) => { console.error(error) });
    } else {
      chrome.storage.local
        .set({ "status": "1" })
        .then(() => { console.log("Value is 1") })
        .catch((error) => { console.error(error) });
    }
  } else if (twoState) {
    chrome.storage.local
      .set({ "status": "2" })
      .then(() => { console.log("Value is 2") })
      .catch((error) => { console.error(error) });
  } else {
    chrome.storage.local
      .set({"status": "0"})
      .then(() => { console.log("Value is 0")})
      .catch((error) => {console.error(error)});
  }
}

document.addEventListener("DOMContentLoaded", getStorage);
function getStorage() {
  Promise.all([
    new Promise(resolve => chrome.storage.local.get(['oneValue'], result => resolve(result.oneValue))),
    new Promise(resolve => chrome.storage.local.get(['twoValue'], result => resolve(result.twoValue)))
  ]).then(([oneValue, twoValue]) => {
    one.checked = oneValue;
    two.checked = twoValue;

    getState(oneValue, twoValue);
  });
}

one.addEventListener("change", function () {
  chrome.storage.local
    .set({ oneValue: one.checked, twoValue: two.checked })
    .then(() => {
      console.log("Value is set");
    })
    .catch((error) => {
      console.error("Error on one:", error);
    });

});

two.addEventListener("change", function () {
  chrome.storage.local
    .set({ oneValue: one.checked, twoValue: two.checked })
    .then(() => {
      console.log("Value is set");
    })
    .catch((error) => {
      console.error("Error on two: ", error);
    });
});

