module.exports = function (bundler) {
  bundler.addAssetType('imba', require.resolve('./compileImba.js'));
};
