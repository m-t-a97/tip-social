const Web3 = require("web3");

const config = require("./truffle-config");

const network = config.networks[Object.keys(config.networks)[0]];
const web3 = new Web3(`http://${network.host}:${network.port}`);

module.exports = {
  web3,
};
