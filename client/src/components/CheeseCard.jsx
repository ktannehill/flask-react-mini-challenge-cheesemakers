import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,

} from '@chakra-ui/react'

function CheeseCard({image, is_raw_milk, kind, price, production_date}) {
  return (
    <Card maxW='sm'>
        <CardBody>
            <Image
            src={image}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Heading size='md'>{kind}</Heading>
                <Text>
                    {is_raw_milk ? 'Raw Milk' : 'Pasteurized'}
                </Text>
                <Text>
                    Made on {production_date.split(' ')[0]}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    ${price}
                </Text>
            </Stack>
        </CardBody>
    </Card>
  )
}

export default CheeseCard