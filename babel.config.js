module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./src/assets",
            components: "./src/components",
            screens: "./src/screens",
            assets: "./src/assets",
            style: "./src/style",
            utils: "./src/utils",
            lib: "./src/lib",
            reduxx: "./src/reduxx",
            navigation: "./src/navigation",
          },
        },
      ],
    ],
  };
};
