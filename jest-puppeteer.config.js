export default {
  server: {
    command: "npx serve ./test",
    port: 3000,
    launchTimeout: 10000,
    usedPortAction: 'kill', // automatically kill process using the port
  },
  launch: {
      dumpio: false, // should we see logs?
      timeout: 30000, // 30 seconds
      headless: true, // false to open a browser
      product: "chrome",
      ignoreHTTPSErrors: true,
      devtools: false,
      // Add --no-sandbox and --disable-setuid-sandbox for CI environments
      args: process.env.CI 
        ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        : []
  },
  browserContext: "default", // "incognito" or "default"
};