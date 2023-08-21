import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  SimpleGrid,
  Box,
  Text,
  Image,
  Spinner,
  Stack,
  Link,
} from '@chakra-ui/react';
import CheeseCard from './CheeseCard';

function ProducerDetail() {
  const { id } = useParams();
  const [selectedProducer, setSelectedProducer] = useState({});

  useEffect(() => {
    const getProducerById = async () => {
      const res = await fetch(`/producers/${id}`);
      const producer = await res.json();
      setSelectedProducer(producer);
    };
    getProducerById();
  }, [id]);

  const removeCheese = id => {
    const updatedCheeses = selectedProducer.cheeses.filter(
      cheese => cheese.id !== id
    );
    setSelectedProducer({ ...selectedProducer, cheeses: updatedCheeses });
  };

  const cheeseList = selectedProducer
    ? selectedProducer?.cheeses?.map(cheese => (
        <CheeseCard
          key={cheese.id}
          {...cheese}
          onDelete={removeCheese}
        />
      ))
    : [];

  if (!selectedProducer)
    return (
      <Spinner
        size="lg"
        color="yellow.700"
      />
    );

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
      >
        <Image
          src={selectedProducer.image}
          maxW={{ base: '400px', sm: '300px' }}
        />
        <Box>
          <Text
            as="b"
            fontSize="2xl"
          >
            {selectedProducer.name}
          </Text>
          <Text>{selectedProducer.region}</Text>
          <Text as="em">Est. {selectedProducer.founding_year}</Text>
          <Text>size of operation: {selectedProducer.operation_size}</Text>
        </Box>
      </Stack>
      <SimpleGrid
        columns={3}
        spacing={4}
      >
        {cheeseList}
      </SimpleGrid>
      <Link
        as={RouterLink}
        to={`/producers/${id}/cheeses/new`}
      >
        Add a cheese
      </Link>
    </>
  );
}

export default ProducerDetail;
