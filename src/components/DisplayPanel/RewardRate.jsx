import { useState, useEffect, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';

const RewardRate = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [rewardRate, setRewardRate] = useState("0");

    useEffect(() => {
        const fetchRewardRate = async () => {
            if (stakingContract && selectedAccount) {
                try {
                    const rewardTRate = await stakingContract.REWARD_RATE();
                    console.log(rewardTRate);
                    setRewardRate(rewardTRate.toString());
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        stakingContract&&fetchRewardRate();
    }, [stakingContract, selectedAccount]);


  return (
    <div>
        <h2>Reward Rate : {rewardRate} token/second</h2>
      
    </div>
  )
}

export default RewardRate
