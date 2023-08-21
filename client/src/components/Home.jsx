import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    SimpleGrid
} from '@chakra-ui/react'
import ProducerCard from './ProducerCard'



function Home() {

    const [producers, setProducers] = useState([])

    useEffect(() => {
        const fetchProducers = async () => {
            const res = await fetch('/producers')
            const producersJson = await res.json()
            setProducers(producersJson)
        }
        fetchProducers()
    }, [])

    const producerList = producers.map(producer => <ProducerCard key={producer.id} {...producer} />)

  return (
    <SimpleGrid spacing={4} columns={3}>
        {producerList}
    </SimpleGrid>
  )
}

export default Home