import React from 'react'

const handleAccountChanged = async(setState) => {
    const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
    })
    const selectedAccount = accounts(0)
    setState(prevState=>({...prevState, selectedAccount}))

 
}

export default handleAccountChanged
