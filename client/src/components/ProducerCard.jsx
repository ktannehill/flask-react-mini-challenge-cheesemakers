import {
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function ProducerCard({ id, name, region, image, onDelete }) {
  const handleDelete = () => {
    fetch(`/producers/${id}`, {
      method: 'DELETE',
    });
    onDelete(id);
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '300px', sm: '200px' }}
        maxH={{ base: '400px', sm: '400px' }}
        src={image}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>

          <Text py="2">{region}</Text>
        </CardBody>

        <CardFooter>
          <ButtonGroup spacing="2">
            <Link
              as={RouterLink}
              to={`/producers/${id}`}
            >
              <Button
                variant="solid"
                colorScheme="orange"
              >
                See More
              </Button>
            </Link>
            <Button
              onClick={handleDelete}
              variant="ghost"
              colorScheme="red"
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default ProducerCard;
