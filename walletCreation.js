const crypto = require('crypto');
const fs = require('fs');

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

//take the first 4 bits :
function checksum(SHA256_bitString, entropy_buffer_bit) {
    let first4bits = SHA256_bitString.substring(0,4);
    return entropy_buffer_bit+first4bits;
}
//Split in 12 segments of 11 bits
function split_hash(bit_132){
    const segments = [];
    for (let i = 0; i < 12; i++) {
        const startIndex = i * 11;
        const segment = bit_132.substring(startIndex, startIndex + 11);
        segments.push(segment);
    }
    return segments;
}
//Do an arrays of the english words
function create_word_list(callback) {
    fs.readFile('english.txt', 'utf8', (err, data) => {
        if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        return callback(err, null);
    }
    const wordList = data.split('\n');
    return callback(null, wordList);
  });
}
// 12 slot of 11-bit to one seed
function mnemonic_phrase(segments, wordList) {
    // Convert each 11-bit part to decimal and get the corresponding word
    const mnemonicWords = segments.map(part => {
        const decimalValue = parseInt(part, 2);
        return wordList[decimalValue];
    });
    // Join the words to form the mnemonic phrase
    const mnemonicPhrase = mnemonicWords.join(" ");
    
    return mnemonicPhrase;
}
//Q4 Import seed:
function createWordMap(callback) {
    fs.readFile('english.txt', 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return callback(err, null);
      }
      const wordList = data.split('\n');
      const wordMap = new Map(wordList.map((word, index) => [word, index]));
      return callback(null, wordMap);
    });
}
function mnemonicToBits(mnemonic, wordMap) {
    const bits = [];
    mnemonic.split(' ').forEach(word => {
      const index = wordMap.get(word);
      if (index !== undefined) {
        const binaryString = index.toString(2).padStart(11, '0');
        bits.push(binaryString);
      } else {
        console.error(`Unknown word in mnemonic: ${word}`);
      }
    });
    return bits.join('');
}

function main() {
    // Q1
    // Generate a 128-bit (16-byte) random number
    const entropy_buffer = crypto.randomBytes(16);
    console.log(entropy_buffer);
    // Convert buffer to hexadecimal 
    const buffer_hexString = entropy_buffer.toString('hex');
    console.log("entropy_hex",buffer_hexString);
    // Convert Entropy_hexadecimal in bit
    entropy_buffer_bit = hexToBitString(buffer_hexString);
    console.log("entropy_bit:",entropy_buffer_bit);

    //Q2
    // Calculate the SHA-256 hash of the entropy_buffer
    const sha256_hash = crypto.createHash('sha256').update(entropy_buffer).digest('hex');
    console.log("SHA-256 Hash:", sha256_hash);

    //Convert the SHA256 in Bit
    const sha256BitString = hexToBitString(sha256_hash);
    console.log("SHA-256 Bit String:", sha256BitString);

    //Add to the entropy number the 4 bits of the SHA256 hash
    const bit_132_hash = checksum(sha256BitString,entropy_buffer_bit);
    console.log("132 bits:", bit_132_hash);
    
    // Cut in 12 slot of 11 bits
    const segments = split_hash(bit_132_hash);
    console.log(segments);

    //Q3
    create_word_list((err, wordlist) => {
        if (err) {
          // Gérer l'erreur
          console.error("Erreur lors de la création de la liste de mots :", err);
          return;
        }
        
        const seed = mnemonic_phrase(segments, wordlist);
        console.log("Mnemonic Phrase:", seed);

        //Q4
        const mnemonic = seed;
        createWordMap((err, wordMap) => {
            if (err) {
            console.error("Error creating word map:", err);
            return;
            }
            const bitString = mnemonicToBits(mnemonic, wordMap);
            console.log("132 bits:", bitString);
        });
        
    });
    
}

main();



