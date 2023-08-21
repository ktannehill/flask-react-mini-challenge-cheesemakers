import React from 'react';
import { Field, Formik } from 'formik';
import {
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

function CheeseForm() {
  const navigate = useNavigate();
  const { id } = useParams();

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
            kind: '',
            is_raw_milk: false,
            production_date: '',
            price: '',
            image: '',
            producer_id: id,
          }}
          validationSchema={formSchema}
          onSubmit={values => {
            fetch('/cheeses', {
              method: 'POST',
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
                  Add Cheese
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default CheeseForm;
