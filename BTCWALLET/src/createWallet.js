//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//bitcoin - rede de teste -testnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0'`

//criando a seed
const mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Cirando a Raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta -  par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)
//criando endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//printando o endereço gerado na test net
console.log("Carteira Gerada")
console.log("Endereço: ",btcAddress)
console.log("Chave Privada:", node.toWIF())
console.log("Seed:", mnemonic)