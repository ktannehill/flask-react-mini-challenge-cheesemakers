import {
    Card,
    Image,
    Stack,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Button,
    Link
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function ProducerCard({id, name, region, image}) {
  return (
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    <Image
      objectFit='cover'
      maxW={{ base: '300px', sm: '200px' }}
      maxH={{ base: '400px', sm: '400px' }}
      src={image}
      alt='Caffe Latte'
    />
  
    <Stack>
      <CardBody>
        <Heading size='md'>{name}</Heading>
  
        <Text py='2'>
          {region}
        </Text>
      </CardBody>
  
      <CardFooter>
        <Link as={RouterLink} to={`/producers/${id}`}>
            <Button variant='solid' colorScheme='orange'>
             See More
            </Button>
        </Link>
      </CardFooter>
    </Stack>
  </Card>
  )
}

export default ProducerCard