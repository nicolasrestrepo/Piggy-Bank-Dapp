import { Card, Button, Divider, Text, Row, Input } from '@nextui-org/react';
import { InputWrapper } from './styles'
// assets
import LogoEth from '../../assets/ethereum.png'

function CardTransaction({title, handleClick, handleChange, loading}) {
  return (
    <Card css={{ w: "330px" }}>
      <Card.Header>
        <Text b>{title}</Text>
      </Card.Header>
      <Divider />
      <Card.Body>
        <InputWrapper>
          <img src={LogoEth} width="50px" />
          <Input 
            type="number"
            onChange={(e) => handleChange(e.target.value)}
            bordered 
            labelPlaceholder="amount" 
            color="primary" />
        </InputWrapper>
      </Card.Body>
      <Divider />
      <Card.Footer>
        <Row justify="center">
          <Button 
            loading={loading}
            onClick={handleClick}
            size="sm" 
            color="gradient">
            Confirm
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default CardTransaction;
