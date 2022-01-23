import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Grid } from '@nextui-org/react';

import usePiggyBankContract from '../../hooks/usePiggyBankContract'
import { formatBalanceEth } from '../../utils/format';
// custom components
import CardTrasaction from '../../components/cardTransaction';
import TransactionDetail from "../../components/transactionDetail";

export default function Home() {
  const { active, account, library } = useWeb3React();
  const piggyBank = usePiggyBankContract();

  const [ isTransaction, setIsTrasaction ] = useState(false);
  const [ depositAmount, setDepositAmount ] = useState(0);
  const [ withdrawAmount, setWithdrawAmount] = useState(0);

  const [ balance, setBalance ] = useState(0);
  const [ transactions, setTransactions ] = useState([]);

  const getBalance = async () => {
    const responseBalance = await piggyBank?.methods?.getBalance().call();

    setBalance(formatBalanceEth(responseBalance));
  }

  const getTransactions = async () => {
    const responseTransactions = await piggyBank?.methods?.getTransactions().call();
    const mappingTransactions = responseTransactions?.map(({value, typeTransaction, owner}) => ({
        value: `${formatBalanceEth(value)}`,
        typeTransaction,
        owner
    }));

    setTransactions(mappingTransactions);
  };

  
  const deposit = () => {
      setIsTrasaction(true)
      piggyBank.methods.deposit().send({
          from: account,
          value: library.utils.toWei(depositAmount, 'ether')
      }).on('transactionHash', (txHash) => {
          setIsTrasaction(false);
          toast.success(`transaction sent ${txHash}`,{
            autoClose: 10000,
          });

      })
      .on('receipt', () => {
        setIsTrasaction(false);
        toast.success('Transaction Sucess');
        getBalance()
      })
      .on('error', (error) => {
          setIsTrasaction(false);
          console.log('error --->', error);

          toast.error(error.message);
      })
  }


  const withdraw = () => {
    setIsTrasaction(true)
    piggyBank.methods.withdraw(library.utils.toWei(withdrawAmount, 'ether')).send({
        from: account,
    }).on('transactionHash', (txHash) => {
        setIsTrasaction(false);
        toast.success(`transaction sent ${txHash}`,{
          autoClose: 10000,
        });

    })
    .on('receipt', () => {
      setIsTrasaction(false);
      toast.success('Transaction Sucess');
      getBalance()
    })
    .on('error', (error) => {
        setIsTrasaction(false);
        console.log('error --->', error);

        toast.error(error.message);
    })
  }


  useEffect(() => { 
    getBalance()
  }, [])

  useEffect(() => {
    getTransactions()
  }, [balance])

  if (!active) return <h2>please connect your Wallet</h2>;

  console.log('withdraw2 ', withdrawAmount)
  return (
    <>
    <Grid.Container gap={2} justify="center"> 
        <Grid>  
            <>    
                <h3>Balance on your Piggy Bank {balance}</h3>
            </>
        </Grid>  
      </Grid.Container>

      <Grid.Container gap={2} justify="center"> 
        <Grid>  
          <CardTrasaction 
            handleChange={setDepositAmount}
            handleClick={deposit}
            title="Deposit"
            loading={isTransaction}
          />
        </Grid>  
        <Grid>  
          <CardTrasaction 
            handleClick={withdraw}
            handleChange={setWithdrawAmount}
            title="Withdraw"
            loading={isTransaction}
          />
        </Grid> 
      </Grid.Container>

        <Grid.Container gap={2} justify="center">
            {transactions?.map((transaction, index) => 
                <Grid xs={8} key={index}>
                    <TransactionDetail {...transaction}/>
                </Grid>
            )} 
        </Grid.Container>
    </>
  );
}
