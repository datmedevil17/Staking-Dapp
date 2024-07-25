import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/connectWallet';
import Web3Context from '../context/Web3Context';
import Button from './Button';
import { ethers } from 'ethers';
import handleChainChanged from '../utils/handleChainChanged';
import handleAccountChanged from '../utils/handleAccountChanged';

const Wallet = ({ children }) => {
    const [state, setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainId: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleWallet = async () => {
        setIsLoading(true);
        try {
            const { provider, selectedAccount, stakingContract, stakeTokenContract,chainId } = await connectWallet();
            // console.log(provider, selectedAccount, stakingContract, stakeTokenContract,chainId);
            setState({ provider, selectedAccount, stakingContract, stakeTokenContract ,chainId});
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const onAccountChanged = () => handleAccountChanged(setState);
        const onChainChanged = () => handleChainChanged(setState);

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', onAccountChanged);
            window.ethereum.on('chainChanged', onChainChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', onAccountChanged);
                window.ethereum.removeListener('chainChanged', onChainChanged);
            }
        };
    }, []);

    return (
        <div>
            <Web3Context.Provider value={state}>
                {children}
            </Web3Context.Provider>
            {isLoading && <p>Loading....</p>}
            <Button onClick={handleWallet} label="Connect Wallet" />
        </div>
    );
};

export default Wallet;
