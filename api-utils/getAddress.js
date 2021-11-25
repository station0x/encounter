import { ethers } from 'ethers'

module.exports = function(signature) {
    return ethers.utils.verifyMessage("Station Labs Login", ethers.utils.splitSignature(signature))
}