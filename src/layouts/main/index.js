import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { connector } from '../../config/web3';
import { formatBalanceEth } from '../../utils/format';
import useTruncatedAddress from '../../hooks/useTruncatedAddress';
import { Container } from './styles';
// components
import ContactForm from '../../components/contactForm';
import Footer from '../../components/footer'
import NavBar from '../../components/navBar';

function MainLayout({ children }) {
  // wallet balance
  const [ balance, setBalance ] = useState(0);

  const [visible, setVisible] = useState(false);


  const { active, activate, deactivate, account, error, library } = useWeb3React();

  const truncatedAddress = useTruncatedAddress(account);

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', true);
  }, [activate]);

  const getBalance = useCallback(async () => {
    const responseBalance = await library.eth.getBalance(account)

    setBalance(formatBalanceEth(responseBalance))
  }, [library?.eth, account]);

  const disconnect = () => {
    deactivate(connector)
    localStorage.removeItem('previouslyConnected');
  }

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === "true") connect();
  }, [connect]);

  useEffect(() => {
    if(active) getBalance()
  }, [active, getBalance]);

  return ( 
    <Container>
        <NavBar 
            address={truncatedAddress}
            isUnsupportedChain={isUnsupportedChain}
            balance={balance}
            connect={connect}
            disconnect={disconnect}
            active={active}
        />
        <ContactForm 
            isVisible={visible}
            handlerClose={() => setVisible(false)}
        />

        {children}

        <Footer 
            handlerClick={() => setVisible(true)}
        />
    </Container>
  );
}

export default MainLayout;
