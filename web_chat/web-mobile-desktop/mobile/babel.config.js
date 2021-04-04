module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          features: ["./src/features"],
          configs: ["./src/configs"],
          helpers: ["./src/helpers"],
          libraries: ["./src/libraries"],
          networking: ["./src/networking"],
          reduxs: ["./src/reduxs"],
          res: [".src/res/*"],
          routers: ["./src/routers"],
          types: ["./src/types"]
        }
      }
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }]
  ]
};
