import { useState, useEffect, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';


const EarnedReward = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [earnedReward, setEarnedReward] = useState("0");
    useEffect(() => {
        const fetchEarnedReward = async () => {
            if (stakingContract && selectedAccount) {
                try {
                    const rewardEarned = await stakingContract.rewards(selectedAccount);
                    console.log(rewardEarned);
                    setEarnedReward(rewardEarned.toString());
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
                
            }
            const interval = setInterval(()=>{
                stakingContract&&fetchEarnedReward();

            },1000)
            return ()=>clearInterval(interval)
        };

        
    }, [stakingContract, selectedAccount]);


  return (
    <div>
        <h2> Earned Reward : {earnedReward}</h2>
      
    </div>
  )
}

export default EarnedReward
