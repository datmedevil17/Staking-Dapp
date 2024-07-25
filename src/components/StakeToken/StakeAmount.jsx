import { useContext,useRef } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import Button from "../Button";

const StakeAmount =()=>{
 const {stakingContract}=useContext(Web3Context);
 const stakeAmountRef = useRef();

 const stakeToken=async(e)=>{
   e.preventDefault();
   const amount = stakeAmountRef.current.value.trim();
   console.log(amount)
   if(isNaN(amount) || amount<=0){
    return;
   }
   const amountToStake = ethers.parseUnits(amount,18).toString();
   try{
    const transaction = await stakingContract.stake(amountToStake)
    await transaction.wait()
    
    stakeAmountRef.current.value = "";
    setIsReload(!isReload);
    // if (receipt.status === 1) {
    //     setIsReload(!isReload);
    //     stakeAmountRef.current.value = "";
    //   } else {
    //       toast.error("Transaction failed. Please try again.")
    //   }
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message)
    }
  };
    return (
      <form onSubmit={stakeToken} className="stake-amount-form">
        <label className="stake-input-label">Enter Staked Amount:</label>
        <input type="text" ref={stakeAmountRef} />
        <Button onClick={stakeToken} type="submit" label="Stake Token" />
      </form>
       )
}
export default StakeAmount;