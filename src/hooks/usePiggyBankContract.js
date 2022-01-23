import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PiggyBankArtifact } from '../config/web3/artifacts/PiggyBank';

const { address, abi } = PiggyBankArtifact;

const usePiggyBankContract = () => {
    const { active, library, chainId } = useWeb3React();

    const piggyBank = useMemo(() => {
        if(active) return (
            new library.eth.Contract(
                abi,
                address[chainId]
            )
        )
    }, [active, chainId, library?.eth?.Contract])

    return piggyBank
};

export default usePiggyBankContract
