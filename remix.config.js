/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "netlify/functions/server/build",
  devServerPort: 8888,
  mdx: () => {
  const { remarkCodeBlocksShiki } = require("@kentcdodds/md-temp");
  return { remarkPlugins: [remarkCodeBlocksShiki] };
  }
};