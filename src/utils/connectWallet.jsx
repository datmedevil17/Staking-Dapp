import {ethers,Contract} from "ethers"

import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json"

export const connectWallet=async()=>{
    try{
        let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null]
        if(window.ethereum==null){
            throw new Error("metamask is not installed")
        }
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })

        let chainIdHex = await window.ethereum.request({
            method: "eth_chainId"
        })
        // console.log(chainIdHex)
        chainId = parseInt(chainIdHex,16)

        let selectedAccount = accounts[0]
        if(!selectedAccount)return "No accounts"

        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner()
        const stakingContractAddress = "0x0D8F161B33856e8Daa9d6f79F255925575D12eB3"
        const stakeTokenContractAddress = "0x08518b498B07A2BA0F1F36BB4802E80435625862"

        stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
        stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi,signer)
        

        return{provider, selectedAccount, stakeTokenContract, stakingContract, chainId}



    }catch(error){
        console.log(error)
        throw error
    }
}