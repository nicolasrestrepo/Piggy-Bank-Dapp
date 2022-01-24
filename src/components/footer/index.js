import React from 'react';
import { Container } from './styles';
import { Button } from '@nextui-org/react'

export default function Footer({handlerClick}) {
    return (
    <Container>   
        <span>Made with ❤️ by Nicolas Restrepo | </span>
        <Button color="transparent" auto onClick={handlerClick}>
            Contact
        </Button>
    </Container>);
}