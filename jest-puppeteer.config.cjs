const headless = process.env.HEADLESS === "true";
const browser = process.env.BROWSER || "chrome";
const gpuType = process.env.TEST_GPU || ""; // egl, desktop or nothing
const customFlags = process.env.CUSTOM_FLAGS ? process.env.CUSTOM_FLAGS.split(" ") : [];

const chromeFlags = [
  "--js-flags=--expose-gc",
  "--enable-unsafe-webgpu",
  ...customFlags,
];

if(gpuType) {
  chromeFlags.push(`--use-gl=${gpuType}`);
}

module.exports = {
  launch: {
      dumpio: false, // should we see logs?
      timeout: 30000, // 30 seconds
      headless: headless, // false to open a browser
      product: browser,
      ignoreHTTPSErrors: true,
      // devtools: true,
      // channel: "chrome-canary",
  },
  browserContext: process.env.BROWSER_CONTEXT || "default", // "incognito" or "default"
};