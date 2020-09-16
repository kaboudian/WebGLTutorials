var require = {
  // Avoid caching. This will save someone a lot of time debugging.
  urlArgs: "bust=" +  (new Date()).getTime(),
  // Use the folder containing this config file as the project root.
  baseUrl: './',
  paths: {
    // Plugins for require.js, used like "text!path/to/input".
    text: 'libs/text',
  },
};
