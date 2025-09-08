// Dynamically import AR.js for lazy loading
async function loadARJS() {
  try {
    await import('@ar-js-org/ar.js');
    console.log('AR.js loaded successfully');
  } catch (error) {
    console.error('Failed to load AR.js:', error);
  }
}

// Load AR.js immediately or export for manual loading
if (typeof window !== 'undefined') {
  loadARJS();
} else {
  module.exports = { loadARJS };
}
