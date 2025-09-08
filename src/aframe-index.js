// Dynamically import AFrame for lazy loading
async function loadAFrame() {
  try {
    await import('aframe');
    console.log('A-Frame loaded successfully');
  } catch (error) {
    console.error('Failed to load A-Frame:', error);
  }
}

// Load A-Frame immediately or export for manual loading
if (typeof window !== 'undefined') {
  loadAFrame();
} else {
  module.exports = { loadAFrame };
}
