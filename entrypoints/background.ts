
export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      browser.storage.local.set({ installDate: Date.now() });
      browser.storage.local.set({ showFlights: true });
      browser.storage.local.set({ showHotels: true });
    }
  });
});
