import {useContext,useState} from "react";
import Web3Context from "../../context/Web3Context";
import Button from "../Button"

const ClaimReward=()=>{
    const {stackingContract} = useContext(Web3Context)
    const [transactionStatus,setTransactionStatus]=useState("")
    const claimReward=async()=>{
        try{
            const tx = await stackingContract.getReward();
            const receipt = await tx.wait()
            setTransactionStatus("Transaction Pending")
            if(receipt.status===1){
                setTransactionStatus("Transaction Successful")
                setTimeout(()=>{
                    setTransactionStatus("")
                },5000)

            }else{
                setTransactionStatus("Transaction Failed")
            }
        }catch(error){
            console.log(error)
        }

    }
    return(
        <>
        {transactionStatus&&<div>{transactionStatus}</div>}
        <Button type="button" label="Claim Reward" onClick={claimReward}/>
        </>
        
    )
}

export default ClaimReward;