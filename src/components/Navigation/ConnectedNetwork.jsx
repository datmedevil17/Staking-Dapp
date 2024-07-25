import React, { useContext } from 'react'
import Web3Context from '../../context/Web3Context'

const ConnectedNetwork = () => {
    const {chainId} = useContext(Web3Context)
  return (
    <div>
        <p>{chainId == 11155111 ? <p>Connected Account: Sepolia</p> : <p>Not Supported Network</p>}</p>
      
    </div>
  )
}

export default ConnectedNetwork
