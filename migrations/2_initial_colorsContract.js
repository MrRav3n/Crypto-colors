const CryptoColors = artifacts.require('CryptoColors')

module.exports = function(deployer) {
    deployer.deploy(CryptoColors, "Steve", "STE", 6, 1000)
}
