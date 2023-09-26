# BIP-39 Wallet Generator

This program generates a BIP-39 compliant mnemonic phrase for creating a cryptocurrency wallet.

## Instructions
- Run the code by executing the command node walletCreation.js
- Answer the prompts as follows:
  - "Would you like to generate a random 128-bit number? (y/n):"
  - If you choose to generate a random number:
    - The program will display the random number in hexadecimal and binary formats.
  - It will then ask: "Would you like to represent this seed in binary and split it into 11-bit chunks? (y/n):"
    - The program will display the SHA-256 hash of the seed in hexadecimal and binary formats.
  - It will then ask: "Would you like to assign a BIP-39 word to each 11-bit chunk and display the mnemonic seed? (y/n):"
    - The program will display the generated mnemonic phrase.
  - It will then ask: "Would you like to import a mnemonic seed? (y/n):"
    - The program will display the 132 bits associate to the seed.
   
## How it works

- The program uses the BIP-39 standard to generate a mnemonic phrase from a randomly generated 128-bit number.
- It performs a series of cryptographic and bit manipulation operations to ensure the generated phrase is secure and follows the BIP-39 standard.

Note: Ensure you have the required dependencies (crypto, fs, and readline) installed in your environment to run this program.

## Disclaimer
This program is for educational purposes only. Always follow best practices for securing your cryptocurrency wallets and never share your mnemonic phrase with anyone.
