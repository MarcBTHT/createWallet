const crypto = require('crypto');
const ec = require('elliptic').ec('secp256k1');

//Q1 et Q2
function createMasterKeys(rootSeedHex) {
    // Convertir la graine racine en Buffer
    const seedBuffer = Buffer.from(rootSeedHex, 'hex');

    // Diviser la graine racine en clé privée et code de chaîne
    const hmac = crypto.createHmac('sha512', 'Bitcoin seed');
    const hmacResult = hmac.update(seedBuffer).digest();

    const privateKey = hmacResult.slice(0, 32); // 32 premiers octets pour la clé privée = 256 premiers bits
    const chainCode = hmacResult.slice(32);     // Les 32 octets suivants pour le code de chaîne = 256 derniers bits

    // Calculer la clé publique maîtresse à partir de la clé privée maîtresse
    
    const keyPair = ec.keyFromPrivate(privateKey);
    const masterPublicKey = keyPair.getPublic('hex');

    // Créer un objet pour stocker les clés
    const keys = {
        privateKey: privateKey.toString('hex'),
        publicKey: masterPublicKey,
        chainCode: chainCode.toString('hex')
    };

    return keys;
}

//Q3 et Q4
function createChildKeys(parentKeys, index) {

    // Conversion des valeurs hexadécimales en buffers.
    const parentPrivateKey = Buffer.from(parentKeys.privateKey, 'hex');
    const parentPublicKey = Buffer.from(parentKeys.publicKey, 'hex');
    const parentChainCode = Buffer.from(parentKeys.chainCode, 'hex');

    // Concaténation de la clé publique parente et de l'index.
    const data = Buffer.concat([parentPublicKey, Buffer.alloc(4, 0), Buffer.alloc(4, index)]);

    // Calcul HMAC-SHA512.
    const hmac = crypto.createHmac('sha512', parentChainCode);
    const hmacResult = hmac.update(data).digest();

    // Séparation des résultats en clé privée enfant, clé publique enfant et code de chaîne enfant.
    const childPrivateKey = hmacResult.slice(0, 32);
    const childChainCode = hmacResult.slice(32);

    const keyPair = ec.keyFromPrivate(childPrivateKey);
        const childPublicKey = keyPair.getPublic('hex');


    console.log('Clé privée enfant (Hex) :', childPrivateKey.toString('hex'));
    console.log('Clé publique enfant (Hex) :', childPublicKey.toString('hex'));
    console.log('Code de chaîne enfant (Hex) :', childChainCode.toString('hex'));

}

//Q5
function createChildKeysAtDerivationLevel(parentKeys, index, derivationLevel) {
    // Conversion des valeurs hexadécimales en buffers.
    const parentPrivateKey = Buffer.from(parentKeys.privateKey, 'hex');
    const parentPublicKey = Buffer.from(parentKeys.publicKey, 'hex');
    const parentChainCode = Buffer.from(parentKeys.chainCode, 'hex');

    // Concaténation de la clé publique parente, le niveau de dérivation et l'index.
    const data = Buffer.concat([parentPublicKey, Buffer.alloc(4, derivationLevel), Buffer.alloc(4, index)]);

    // Calcul HMAC-SHA512.
    const hmac = crypto.createHmac('sha512', parentChainCode);
    const hmacResult = hmac.update(data).digest();

    // Séparation des résultats en clé privée enfant, clé publique enfant et code de chaîne enfant.
    const childPrivateKey = hmacResult.slice(0, 32);
    const childChainCode = hmacResult.slice(32);

    const keyPair = ec.keyFromPrivate(childPrivateKey);
    const childPublicKey = keyPair.getPublic('hex');

    return {
        privateKey: childPrivateKey.toString('hex'),
        publicKey: childPublicKey.toString('hex'),
        chainCode: childChainCode.toString('hex')
    };
}

function main() {
    // exemple de root seed (que l'on retrouvera avec la fin de la partie 1)
    const rootSeedHex = '000102030405060708090a0b0c0d0e0f'; 

    //Q1 et Q2
    masterKeys = createMasterKeys(rootSeedHex);
    
    //Q3 et Q4
    const index = 0; // Index de la clé enfant
    createChildKeys(masterKeys, index);

    //Q5 - Générer une clé enfant à l’index N au niveau de dérivation M
    const derivationLevel = 3; // Niveau de dérivation
    const childKeys = createChildKeysAtDerivationLevel(masterKeys, index, derivationLevel);
    console.log("\nClé enfant à l'index", index, "au niveau de dérivation", derivationLevel, ":", childKeys);
}

main();