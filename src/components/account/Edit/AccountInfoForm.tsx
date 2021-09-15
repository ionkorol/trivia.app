import {
  VStack,
  HStack,
  Heading,
  Input,
  Icon,
  Button,
  Text,
  Alert,
} from "native-base";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "reduxx/store";
import { updateUser } from "reduxx/slices/userSlice";
import { checkEmailAvailability, checkNameAvailability } from "lib/user";

const schema = yup.object().shape({
  name: yup
    .string()
    .test(
      "isNameAvailable",
      "Name is not available!",
      async (value) => await checkNameAvailability(value!)
    )
    .required("Name is required!"),

  email: yup
    .string()
    .email("Must be a valid email!")
    .test(
      "isEmailAvailable",
      "Email is already being used!",
      async (value) => await checkEmailAvailability(value!)
    )
    .required("Email is required!"),
});

const AccountInfoForm = () => {
  const { data } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: data!.name || "",
      email: data!.email || "",
    },
    onSubmit: async (values) => {
      console.log("Test");
      await dispatch(updateUser({ ...data!, ...values }) as any);
    },
    validateOnChange: false,
  });

  return (
    <VStack backgroundColor="orange.500" borderRadius={20}>
      <HStack
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="muted.300"
        justifyContent="space-between"
        paddingX={3}
      >
        <Heading size="md">Account Info</Heading>
        <Button
          variant="unstyled"
          isLoading={formik.isSubmitting}
          onPress={() => formik.handleSubmit()}
        >
          Save
        </Button>
      </HStack>
      <VStack paddingX={3} paddingY={3}>
        {!formik.isValid && (
          <Alert status="error">
            <Alert.Icon />
            <Alert.Title>
              {formik.errors.name || formik.errors.email}
            </Alert.Title>
          </Alert>
        )}
        <HStack alignItems="center">
          <Text flex={1}>Name</Text>
          <Input
            flex={3}
            variant="unstyled"
            size="md"
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter name"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>Email</Text>
          <Input
            flex={3}
            variant="unstyled"
            size="md"
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            autoCapitalize="none"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default AccountInfoForm;
