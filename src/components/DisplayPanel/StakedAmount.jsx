import { useState, useEffect, useContext } from 'react';
import Web3Context from '../../context/Web3Context';
import { ethers } from 'ethers';
// import StakingContext from '../../context/StakingContext'


const StakedAmount = () => {
    const { stakingContract, selectedAccount } = useContext(Web3Context);
    const [stakedAmount, setStakedAmount] = useState("0");
    // const {isReload,setIsReload} = useContext(StakingContext)


    useEffect(() => {
        const fetchStakedBalance = async () => {
            if (stakingContract && selectedAccount) {
                try {
                    const amountStaked = await stakingContract.stakedBalance(selectedAccount);
                    console.log(amountStaked);
                    setStakedAmount(amountStaked.toString());
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchStakedBalance();
    }, [stakingContract, selectedAccount]);

    return (
        <div>
            Staked Amount: {stakedAmount}
            
        </div>
    );
};

export default StakedAmount;
