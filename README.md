# TipSocial

A decentralised social app that let's users post messages and be able to tip other users' posts.

## Features

- Post messages
- Tip other users posts with Ether

### Future improvements/features that could be made:

- Add the ability to add your post to specific categories so that users across the app can filter posts related to specific categories e.g. football, gaming etc.

- Add the ability to let the user tip any amount of Ether to a post instead of a fixed amount.

- Add the ability to have user profiles within the app connected to their wallet so e.g. every unique wallet address will have a profile with their username, email address etc (can be changed/updated by the owner of the address).

- Add a navigation bar to navigate to different sections of the app e.g. to different categories, user profile.

---

## Setup

Install truffle globally:

```bash
$ npm i -g truffle
```

Install the dependencies for the app.

```bash
$ yarn install
```

---

## Ganache

Use the `Muir Glacier Hard Fork` in Ganache as it was the hard fork version used when developing this app.

---

## Running the app

Navigate to the `src/blockchain` folder and do the following:

```bash
$ truffle compile --all
$ truffle migrate --network development
```

Then navigate back to the root of the project and run:

```bash
$ yarn start
```

---

## Contracts

Navigate to the `blockchain` folder:

```bash
# Compile contracts
$ truffle compile --all

# To migrate contracts
$ truffle migrate --reset --network development

# Connect to localhost running ganache via console to run commands on smart contracts
$ truffle console --network development

# To run tests on the smart contracts
$ truffle test
```

---

## Commands for Truffle console

```bash
# Fetching all accounts
$ accounts = await web3.eth.getAccounts()

# Get a reference to the deployed contract
$ socialNetwork = await SocialNetwork.deployed()

# Useful util commands to use within the truffle console
$ web3.utils.toWei("0.025", "ether")
$ web3.utils.fromWei("25000000000000000", "ether")
```

---

## MetaMask

To connect your wallet to MetaMask, copy the private key from one of your ganache wallet addresses and then import it into MetaMask. Make sure to switch to the Ganache network to see the Ether in your account's wallet.

---

## Local Development

Add `localhost` as the value of `development.host` in the `networks` config in the `truffle-config.js` file to work with Ganache GUI locally.

### Using Docker:

If using Docker on Windows using WSL2, add `host.docker.internal` as the value of `development.host` in the `networks` config within `truffle-config.js`. This will allow you to connect from within Docker to the Windows host running Ganache.

---
