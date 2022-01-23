import { Container, Wrapper, WapperInfoNavBar } from './styles';
import { Button, Card } from '@nextui-org/react';
// assets
import LogoEth from '../../assets/ethereum.png'

export default function NavBar({ 
        address, 
        isUnsupportedChain, 
        balance, 
        connect, 
        disconnect,
        active,
}){
    return(
        <Container>
            <h1>Piggy Bank</h1>

        <>
            { active ?
                <WapperInfoNavBar>
                    <Card color="white"  width="150px">
                        {address}
                    </Card>
                    <Card color="white"  width="90px">
                        <Wrapper>      
                            <img src={LogoEth} width="50px" />
                            {balance}
                        </Wrapper>
                    </Card>
                </WapperInfoNavBar>
                : 
                <Button 
                    disabled={isUnsupportedChain}
                    shadow 
                    color="gradient" 
                    auto
                    onClick={connect}>
                    {isUnsupportedChain ? "Unsupported chain" : "connect Wallet"}
                </Button>
            }
        </>
    </Container>
    )
}

