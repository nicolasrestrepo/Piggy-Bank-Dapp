import { Card, Divider, Text, Row, Input } from '@nextui-org/react';
import { Wrapper } from './styles'
// assets
import LogoEth from '../../assets/ethereum.png'

const types = {
    0: 'Withdraw',
    1: 'Deposit'
}
function TransactionDetail({owner, value, typeTransaction}) {
  return (
    <Card>
      <Card.Body>
        <Wrapper>
            <strong><h4>{types[typeTransaction]}</h4></strong>
            <Wrapper>
                <img src={LogoEth} width="50px" /> {value}
            </Wrapper>  
            {owner}
        </Wrapper>
      </Card.Body>
    </Card>
  );
}

export default TransactionDetail;
