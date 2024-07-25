import React from 'react'

const handleChainChanged = async(setState) => {
    const chainIdHex = await window.ethereum.request({
        method:'eth_chainId'
    })
    const chainId = parseInt(chainIdHex, 16)
    setState(prevState=>({...prevState, chainId}))

 
}

export default handleChainChanged
