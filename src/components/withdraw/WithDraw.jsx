import React from 'react'
import { useState,useContext,useRef  } from 'react'
import Web3Context from '../../context/Web3Context'
import Button from "../Button"
import { ethers } from 'ethers'

const WithdrawStakeToken = () => {
    const {stakeTokenContract,provider,stakingContract} = useContext(Web3Context);
    const [transactionStatus,setTransactionStatus] = useState("")

    const withdrawStakeTokenRef = useRef()
    const withdrawStakeToken=async(e)=>{
        e.preventDefault();
        const amount = withdrawStakeTokenRef.current.value.trim();
        if(isNaN(amount)||amount<=0){
            console.error("Please Enter a valid positive number")
            return;
        }
        const amountToWithdraw = ethers.parseUnits(amount,18).toString();
        console.log(stakingContract.target, amountToWithdraw)

        try {
            const tx = await stakingContract.withdraw(amountToWithdraw)
            setTransactionStatus("Transaction in pending state.")
            const receipt = await tx.wait()
            if(receipt.status===1){
                setTransactionStatus("Transaction is successful")
                setTimeout(()=>{
                    setTransactionStatus("")

                },5000)
                withdrawStakeTokenRef.current.value=""


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
        <form onSubmit={withdrawStakeToken}>
            <label htmlFor="">Amount to Withdraw :</label>
            <input type="text" ref={withdrawStakeTokenRef}/>
            <Button onClick={withdrawStakeToken}  type="submit" label="Withdraw Stake Token"/>
        </form>
      
    </div>
  )
}

export default WithdrawStakeToken
