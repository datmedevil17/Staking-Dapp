import React from 'react'
import { useState,useContext,useRef  } from 'react'
import Web3Context from '../../context/Web3Context'
import Button from "../Button"
import { ethers } from 'ethers'

const TokenApproval = () => {
    const {stakeTokenContract,provider,stakingContract} = useContext(Web3Context);
    const [transactionStatus,setTransactionStatus] = useState("")

    const approvedTokenRef = useRef()
    const approveToken=async(e)=>{
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim();
        if(isNaN(amount)||amount<=0){
            console.error("Please Enter a valid positive number")
            return;
        }
        const amountToSend = ethers.parseUnits(amount,18).toString();
        console.log(stakingContract.target, amountToSend)

        try {
            const tx = await stakeTokenContract.approve(stakingContract.target, amountToSend)
            setTransactionStatus("Transaction in pending state.")
            const receipt = await tx.wait()
            if(receipt.status===1){
                setTransactionStatus("Transaction is successful")
                setTimeout(()=>{
                    setTransactionStatus("")

                },5000)
                approvedTokenRef.current.value=""


            }else{

                console.log("Transaction Failed")
            }

            
        } catch (error) {
            console.error(error)
            
        }

    }
  return (
    <div>
        {transactionStatus && <div>Transaction is Successful</div>}
        <form onSubmit={approveToken}>
            <label htmlFor="">Token Approval :</label>
            <input type="text" ref={approvedTokenRef}/>
            <Button onClick={approveToken}  type="submit" label="Token Approval"/>
        </form>
      
    </div>
  )
}

export default TokenApproval
