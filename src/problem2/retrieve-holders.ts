/* The task is to write a script that retrieves the specified holders of the $SWTH token on the Binance Smart Chain network, and 
outputs their wallet addresses and the amount of $SWTH tokens they hold.

Requirements: 
1. Interact with the $SWTH token contract on the Binance Smart Chain network, and retrieve the current balance of the three wallet addresses specified in the question.
2. Format the output to display each wallet address and the amount of $SWTH tokens they hold on a separate line, with the amount rounded to th correct number of decimal places.

Hint:
Use NPM module ethers.js to interact with the $SWTH token contract on the Binance Smart Chain network.

Once script is written, can run using command 'ts-node ./retrieve-holders.ts' to test that it retrieves the correct wallet addresses and balances.*/

import { ethers } from 'ethers';

// list out the addresses and token we want
const addresses: string[] = ['0xb5d4f343412dc8efb6ff599d790074d0f1e8d430','0x0020c5222a24e4a96b720c06b803fb8d34adc0af', '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'];
const tokenAddress: string = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed1.binance.org/'); // connect to the binance smart chain network

// create an instance of the $SWTH token contract using ether.js
const abi = ['function balanceOf(address) view returns (uint256)']; // abi describes the interface of the contract, including its methods and arguments
const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

// retrieve the balance of each wallet address using the balanceOf() method

async function getBalances() {
    const balances: string[] = [];
    for (const address of addresses) {
        const balance = await tokenContract.balanceOf(address);
        balances.push(`${address} ${ethers.formatUnits(balance,8)}`);
    }
    return balances.join('\n');
}

getBalances().then((balances) => {
    console.log(balances);
  });