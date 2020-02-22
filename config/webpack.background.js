module.exports = {
  mode: "production",
  entry: "./src/background.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_module/,
        options: {
          compilerOptions: {
            noEmit: false
          }
        }
      }
    ]
  },
  output: {
    path: `${__dirname}/../build`,
    filename: "background.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
