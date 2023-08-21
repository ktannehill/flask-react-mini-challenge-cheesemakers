import { useState, useEffect } from 'react';
import { Field, Formik } from 'formik';
import {
  Spinner,
  Flex,
  Box,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

function CheeseEdit() {
  const navigate = useNavigate();
  const { id, cheeseId } = useParams();
  console.log(
    '🚀 ~ file: CheeseEdit.jsx:22 ~ CheeseEdit ~ cheeseId:',
    cheeseId
  );
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  console.log(
    '🚀 ~ file: CheeseEdit.jsx:28 ~ CheeseEdit ~ selectedCheese:',
    selectedCheese
  );
  console.log(
    '🚀 ~ file: CheeseEdit.jsx:27 ~ CheeseEdit ~ selectedProducer:',
    selectedProducer
  );

  useEffect(() => {
    const getProducerById = async () => {
      const res = await fetch(`/producers/${id}`);
      const producer = await res.json();
      setSelectedProducer(producer);
    };
    getProducerById();
  }, [id]);

  useEffect(() => {
    if (selectedProducer) {
      const foundCheese = selectedProducer?.cheeses?.find(
        cheese => cheese.id == cheeseId
      );
      setSelectedCheese(foundCheese);
    }
  }, [selectedProducer, cheeseId]);

  const formSchema = yup.object().shape({
    kind: yup.string().required('Required'),
    production_date: yup
      .date()
      .max(new Date(), 'Must be before today')
      .required('Required'),
    price: yup
      .number()
      .min(1.0, 'Must be a greater than 1.00')
      .max(45.0, 'Must be under 45.00')
      .required('Required'),
    image: yup.string().url('Must be a valid URL').required('Required'),
  });

  const bg = useColorModeValue('orange.100', 'yellow.300');
  const color = useColorModeValue('black', 'white');
  if (!selectedCheese) return <Spinner />;
  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      h="100vh"
    >
      <Box
        bg={bg}
        color={color}
        p={6}
        rounded="md"
        w={400}
      >
        <Formik
          initialValues={{
            kind: selectedCheese.kind,
            is_raw_milk: selectedCheese.is_raw_milk,
            production_date: selectedCheese.production_date.split(' ')[0],
            price: selectedCheese.price,
            image: selectedCheese.image,
            producer_id: id,
          }}
          validationSchema={formSchema}
          onSubmit={values => {
            fetch(`/cheeses/${cheeseId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values, null, 2),
            }).then(res => {
              if (res.ok) {
                navigate(`/producers/${id}`);
              }
            });
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack
                spacing={4}
                align="flex-start"
              >
                <FormControl isInvalid={!!errors.kind && touched.kind}>
                  <FormLabel htmlFor="kind">Kind</FormLabel>
                  <Field
                    as={Input}
                    id="kind"
                    name="kind"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.kind}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!errors.production_date && touched.production_date
                  }
                >
                  <FormLabel htmlFor="production_date">
                    Production Date
                  </FormLabel>
                  <Field
                    as={Input}
                    id="production_date"
                    name="production_date"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.production_date}</FormErrorMessage>
                </FormControl>
                <Field
                  as={Checkbox}
                  id="is_raw_milk"
                  name="is_raw_milk"
                  colorScheme="orange"
                >
                  Contains Raw Milk
                </Field>
                <FormControl isInvalid={!!errors.price && touched.price}>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    type="number"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.image && touched.image}>
                  <FormLabel htmlFor="image">Image URL</FormLabel>
                  <Field
                    as={Input}
                    id="image"
                    name="image"
                    type="text"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.image}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="orange"
                  width="full"
                >
                  Edit Cheese
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default CheeseEdit;
