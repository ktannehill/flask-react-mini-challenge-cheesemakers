import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function CheeseCard({
  id,
  image,
  is_raw_milk,
  kind,
  price,
  production_date,
  producer_id,
  onDelete,
}) {
  const handleDelete = () => {
    fetch(`/cheeses/${id}`, {
      method: 'DELETE',
    });
    onDelete(id);
  };
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack
          mt="6"
          spacing="3"
        >
          <Heading size="md">{kind}</Heading>
          <Text>{is_raw_milk ? 'Raw Milk' : 'Pasteurized'}</Text>
          <Text>Made on {production_date.split(' ')[0]}</Text>
          <Text
            color="blue.600"
            fontSize="2xl"
          >
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link
            as={RouterLink}
            to={`/producers/${producer_id}/cheeses/${id}/edit`}
          >
            <Button
              variant="solid"
              colorScheme="blue"
            >
              Edit Cheese
            </Button>
          </Link>
          <Button
            onClick={handleDelete}
            variant="ghost"
            colorScheme="red"
          >
            Delete Cheese
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default CheeseCard;
