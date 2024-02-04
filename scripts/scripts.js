
function doing() {
  chrome.storage.local.get(["status"], function (result) {
    window.setTimeout(function () {
      const status = result.status;
      console.log("Status from storage:", status);

      // Your logic here based on the "status" value
      if (status === "1" || status === "3") {
        console.log("Status is 1 or 3");
        const trendingElement = document.querySelector(
          '[aria-label="Timeline: Trending now"]'
        );
        if (trendingElement) {
          trendingElement.remove();
        } else {
          console.log("Element not found");
        }
      }
      if (status === "2" || status === "3") {
        console.log("Status is 2 or 3");
        if (window.location.pathname === "/explore") {
          const carouselElement = document.querySelector(
            '[aria-label="Timeline: Carousel"]'
          );
          if (carouselElement) {
            carouselElement.remove();
            let elements = document.querySelectorAll(
              ".css-175oi2r.r-1adg3ll.r-1ny4l3l"
            );
            if (elements) {
              for (let i = 6; i < 11; i++) {
                elements[i].remove();
              }
            } else {
              console.log("Not found");
            }
          } else {
            console.log("Carousel element not found");
          }
        }
      }
    }, 5000);
  });
}
const observer = new MutationObserver(doing);
const config = { subtree: true, childList: true };
observer.observe(document.body, config);