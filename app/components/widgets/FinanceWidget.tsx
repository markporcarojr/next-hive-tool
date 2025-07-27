import { Container, Title, SimpleGrid, Card, Text } from "@mantine/core";

export default function FinanceWidget() {
  return (
    <Container>
      <Title order={2} mb="md">
        Finance Overview
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        <Card withBorder>
          <Text>Total Expenses</Text>
          <Title>$2,340</Title>
        </Card>
        <Card withBorder>
          <Text>Total Income</Text>
          <Title>$4,120</Title>
        </Card>
        <Card withBorder>
          <Text>Outstanding Invoices</Text>
          <Title>$1,100</Title>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
