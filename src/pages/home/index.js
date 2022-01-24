import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Grid } from '@nextui-org/react';

import usePiggyBankContract from '../../hooks/usePiggyBankContract'
import { formatBalanceEth } from '../../utils/format';

// custom components
import CardTrasaction from '../../components/cardTransaction';
import ListTransactions from "../../components/listTransactions";
import ContactForm from '../../components/contactForm';

export default function Home() {
  const { active, account, library } = useWeb3React();
  const piggyBank = usePiggyBankContract();

  const [ isTransaction, setIsTrasaction ] = useState(false);
  const [ depositAmount, setDepositAmount ] = useState(0);
  const [ withdrawAmount, setWithdrawAmount] = useState(0);

  const [ balance, setBalance ] = useState(0);
  const [ transactions, setTransactions ] = useState([]);

  const getBalance = async () => {
    const responseBalance = await piggyBank?.methods?.getBalance().call({
      from: account,
    });

    setBalance(formatBalanceEth(responseBalance));
  }

  const getTransactions = async () => {
    const responseTransactions = await piggyBank?.methods?.getTransactions().call(
      {
        from: account,
      }
    );

    const mappingTransactions = responseTransactions?.map(({value, typeTransaction, depositorAddress}) => ({
        value: formatBalanceEth(value),
        typeTransaction,
        depositorAddress
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
          toast.success(<a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">
            transaction sent (click to see detail)
          </a>,{
            autoClose: 10000,
            closeOnClick: false,
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
    setIsTrasaction(true);
    
    if(withdrawAmount > balance){
      toast.error('non-sufficient funds on your Piggy Bank');
      setIsTrasaction(false);
      return;
    }
    piggyBank.methods.withdraw(library.utils.toWei(withdrawAmount, 'ether')).send({
        from: account,
    }).on('transactionHash', (txHash) => {
        setIsTrasaction(false);
        toast.success(<a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">
          transaction sent (click to see detail)
        </a>,{
          autoClose: 10000,
          closeOnClick: false,
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
  }, [active, account])

  useEffect(() => {
    getTransactions()
  }, [balance, active, account])

  if (!active) return <h2>please connect your Wallet</h2>;

  return (
    <>
    <Grid.Container gap={2} justify="center"> 
        <Grid>  
            <>    
                <h3>Balance on your Piggy Bank {(isNaN(balance) || !balance) ? 0 : balance}</h3>
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
        {
          (transactions?.length > 0) && <ListTransactions transactions={transactions}/>
        }

      </Grid.Container>
    </>
  );
}
