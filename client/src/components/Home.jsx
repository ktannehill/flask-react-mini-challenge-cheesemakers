import { useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ProducerCard from './ProducerCard';

function Home() {
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    const fetchProducers = async () => {
      const res = await fetch('/producers');
      const producersJson = await res.json();
      setProducers(producersJson);
    };
    fetchProducers();
  }, []);

  const removeProducer = id =>
    setProducers(producers.filter(producer => producer.id !== id));
  const producerList = producers.map(producer => (
    <ProducerCard
      key={producer.id}
      {...producer}
      onDelete={removeProducer}
    />
  ));

  return (
    <SimpleGrid
      spacing={4}
      columns={3}
    >
      {producerList}
    </SimpleGrid>
  );
}

export default Home;
