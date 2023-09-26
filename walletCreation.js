const crypto = require('crypto');

// Generate a 128-bit (16-byte) random number
const entropy_buffer = crypto.randomBytes(16);
console.log(entropy_buffer);

// Convert to a hexadecimal string
const entropy_hex = entropy_buffer.toString('hex');

console.log('entropy hex :', entropy_hex);

// Calculate the SHA-256 hash
const sha256_hash = crypto.createHash('sha256').update(entropy_hex).digest('hex');

console.log("SHA-256 Hash:", sha256_hash);

//checksum step
/// Convert hexadecimal to a bit string
function hexToBitString(hex) {
    let bitString = "";
    for (let i = 0; i < hex.length; i++) {
      const binary = parseInt(hex[i], 16).toString(2).padStart(4, '0');
      bitString += binary;
    }
    return bitString;
  }
  

  const sha256BitString = hexToBitString(sha256_hash);
  const randomNumberBitString = hexToBitString(entropy_hex);
  console.log('entropy bit :', randomNumberBitString);
  console.log("SHA-256 Bit String:", sha256BitString);

//take the first 4 bits :

function checksum(randomBitString, hashBitString) {
    let first4Bits = hashBitString.substring(0, 4);
    //console.log(bitString);
    //console.log(first4Bits);
    return randomBitString+first4Bits;
}

bit_132_hash=checksum(randomNumberBitString, sha256BitString);
//console.log(bit_132_hash);

function split(bit_hash) {
    // Initialize an array to store the 12 parts
    const parts = [];

    // Split the bitString into 12 parts of 11 bits each
    for (let i = 0; i < 12; i++) {
    const start = i * 11;
    const end = start + 11;
    const part = bit_hash.substring(start, end);
    parts.push(part);
    }

    return parts;
    }

const hash_parts = split(bit_132_hash)
console.log(hash_parts);


function createWordList(callback) {

    const fs = require('fs');

    // Define the path to your english.txt file
    const filePath = './english.txt'; 

    // Read the file and split it into an array of words
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            if (callback) {
                callback(err, null);
            }
            return;
        }

        // Split the file content into an array of words using line breaks as separators
        const englishWordList = data.trim().split('\n');

        if (callback) {
            callback(null, englishWordList);
        }
    });
}

createWordList((err, wordList) => {
    if (err) {
        console.error('Error:', err);
    } else {
        
        const seed= mnemonic_phrase(hash_parts, wordList);

        console.log(seed);


    }
});;


function mnemonic_phrase(hash_parts, englishWordList) {
    // Convert each 11-bit part to decimal and get the corresponding word
    const mnemonicWords = hash_parts.map(part => {
        const decimalValue = parseInt(part, 2);
        return englishWordList[decimalValue];
    });
    
    // Join the words to form the mnemonic phrase
    const mnemonicPhrase = mnemonicWords.join(" ");
    
    return mnemonicPhrase;
}


