
import {generateMnemonic, mnemonicToEntropy} from"ethereum-cryptography/bip39";

import {wordlist} from"ethereum-cryptography/bip39/wordlists/english" ;

import {HDKey} from"ethereum-cryptography/hdkey" ;

import {getPublicKey} from"ethereum-cryptography/secp256k1" ;
import {keccak256} from"ethereum-cryptography/keccak";
// import {writeFileSync} from "fs" ;

import {bytesToHex} from "ethereum-cryptography/utils";


export const GenAddress  = function(data) {
    function _generateMnemonic(){
        const strength = 128;
        const mnemonic = generateMnemonic(wordlist, strength);
        const entropy = mnemonicToEntropy(mnemonic, wordlist);
        return {mnemonic, entropy}
    }

    function _getHdRootKey(_mnemonic){
        return HDKey.fromMasterSeed(_mnemonic);
    }

    function _generatePrivateKey(_hdRootKey, _accountIndex){
        return _hdRootKey.deriveChild(_accountIndex).privateKey;
    }

    function _getPublicKey(_privateKey){
        return getPublicKey(_privateKey);
    }

    function _getEthAddress(_publicKey){
        return keccak256(_publicKey).slice(-20);
    }


    function main(){
        const {mnemonic, entropy} = _generateMnemonic();
        // console.log(`Warning! Never disclose your seed Phrae: \n${mnemonic}`);

        const hdRootKey = _getHdRootKey(entropy);
        const accountOneIndex = 0;
        const accountOnePrivateKey = _generatePrivateKey(hdRootKey, accountOneIndex);
        const accountOnePublicKey = _getPublicKey(accountOnePrivateKey);
        const accountOneAddress = _getEthAddress(accountOnePublicKey);

        return [`0x${bytesToHex(accountOneAddress)}`,`${mnemonic}`];
        // _store(accountOnePrivateKey, accountOnePublicKey, accountOneAddress);
    }
    // function _store(_privateKey, _publicKey, _address){
    //     const accountOne = {
    //         privateKey: _privateKey,
    //         publicKey: _publicKey,
    //         address: _address
    //     };
    
    //     const accountOneData = JSON.stringify(accountOne);
    //     writeFileSync("to.json", accountOneData)
    // }
    
     
return main()

} 
export default GenAddress;