
export default defineBackground(() => {
  // set default settings and installed date on local storage
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      browser.storage.local.set({ installDate: Date.now() });
      browser.storage.local.set({ showFlights: true });
      browser.storage.local.set({ showHotels: true });
      browser.storage.local.set({ newTabBg: "assets/bg2.webp" });
    }
  });
});
