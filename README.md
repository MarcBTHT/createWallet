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





# BIP32 Key Generation

This code demonstrates the generation of hierarchical deterministic (HD) keys using the BIP32 standard.

## Instructions

1. **Creating Master Keys (Q1 and Q2):** The `createMasterKeys` function takes a root seed in hexadecimal format and generates a master private key, master public key, and a chain code.

2. **Creating Child Keys (Q3 and Q4):** The `createChildKeys` function generates child private and public keys, as well as a child chain code, based on the parent keys and an index.

3. **Creating Child Keys at Derivation Level (Q5):** The `createChildKeysAtDerivationLevel` function generates child keys at a specified derivation level, index, and based on the parent keys.

## How It Works

### Master Key Generation (Q1 and Q2)

- The `createMasterKeys` function takes a root seed in hexadecimal format.
- It converts the root seed into a buffer.
- It uses HMAC-SHA512 to split the root seed into a master private key (32 bytes), a master public key, and a chain code (32 bytes).
- The master private key and chain code are returned as hexadecimal strings.

### Child Key Generation (Q3 and Q4)

- The `createChildKeys` function takes the parent keys (private key, public key, and chain code) and an index.
- It prepares data by concatenating the parent public key, an index buffer, and zeroes.
- It uses HMAC-SHA512 with the parent chain code to derive a child private key and a child chain code.
- The child private key and child public key are returned as hexadecimal strings.

### Child Key Generation at Derivation Level (Q5)

- The `createChildKeysAtDerivationLevel` function takes the parent keys, an index, and a derivation level.
- It prepares data by concatenating the parent public key, the derivation level buffer, and an index buffer.
- It uses HMAC-SHA512 with the parent chain code to derive a child private key and a child chain code.
- The child private key, child public key, and child chain code are returned as hexadecimal strings.

## Usage

1. Provide a root seed in hexadecimal format as input to the `createMasterKeys` function.
2. Use the `createChildKeys` function to generate child keys based on the parent keys and an index.
3. Utilize the `createChildKeysAtDerivationLevel` function to generate child keys at a specific derivation level, index, and based on the parent keys.


## Disclaimer
This program is for educational purposes only. Always follow best practices for securing your cryptocurrency wallets and never share your mnemonic phrase with anyone.
