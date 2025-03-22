// js/scripts.js: JavaScript file for interactivity across all pages of WallArtVault, focusing on download tracking

// Track downloads with localStorage: Manages the number of free downloads and reset logic
let freeDownloads = localStorage.getItem("freeDownloads")
  ? parseInt(localStorage.getItem("freeDownloads"))
  : 5; // Initializes freeDownloads from localStorage or sets to 5 if not found
const lastReset = localStorage.getItem("lastReset") || new Date().getMonth(); // Gets last reset month or current month if not found

// Reset monthly: Resets free downloads at the start of a new month
const currentMonth = new Date().getMonth(); // Gets the current month
if (currentMonth !== parseInt(lastReset)) {
  freeDownloads = 5; // Resets to 5 downloads
  localStorage.setItem("freeDownloads", freeDownloads); // Updates localStorage with new count
  localStorage.setItem("lastReset", currentMonth); // Updates last reset month
}

// Download logic (only on download pages): Handles wallpaper download functionality
document.querySelectorAll(".download-btn").forEach((button) => {
  // Adds event listener to each download button
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id"); // Gets the wallpaper ID from the button
    const quality = button.getAttribute("data-quality"); // Gets the quality (hd, fhd, uhd) from the button
    if (freeDownloads > 0) {
      freeDownloads--; // Decrements the free download count
      localStorage.setItem("freeDownloads", freeDownloads); // Updates localStorage with new count
      alert(
        `Downloading ${id} in ${quality.toUpperCase()}! ${freeDownloads} free downloads left.`
      ); // Notifies user of download and remaining count
      window.open(
        `https://4kwallpapers.com/images/wallpapers/${id}-${quality}.jpg`,
        "_blank"
      ); // Opens download link in a new tab
    } else {
      alert(
        "No free downloads left this month. Please wait until next month or contact support."
      ); // Notifies user when limit is reached
    }
  });
});
