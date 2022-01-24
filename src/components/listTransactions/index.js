import { Grid } from "@nextui-org/react";
import { Container } from "./styles";
import TransactionDetail from "../transactionDetail";

function ListTransactions({ transactions }) {
  return (
      <Container>
        {transactions?.map((transaction, index) => (
            <TransactionDetail {...transaction} />
        ))}
      </Container>
  );
}

export default ListTransactions;
