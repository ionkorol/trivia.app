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
import { useAppDispatch } from "reduxx/store";
import { saveAccount } from "reduxx/slices/userSlice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters!`)
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

const SaveAccountForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      await dispatch(
        saveAccount({
          username: values.username,
          password: values.password,
        }) as any
      );
    },
    validateOnChange: false,
  });

  return (
    <VStack backgroundColor="primary.500" borderRadius={20}>
      <HStack
        paddingX={5}
        borderBottomWidth={1}
        borderBottomColor="muted.300"
        justifyContent="space-between"
      >
        <Heading size="md">Save Account</Heading>
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
              {formik.errors.username ||
                formik.errors.password ||
                formik.errors.confirmPassword}
            </Alert.Title>
          </Alert>
        )}
        <HStack alignItems="center">
          <Text flex={1}>Username</Text>
          <Input
            variant="unstyled"
            size="md"
            flex={3}
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            autoCapitalize="none"
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>Password</Text>
          <Input
            flex={3}
            variant="unstyled"
            size="md"
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            secureTextEntry
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>Confirm</Text>
          <Input
            flex={3}
            variant="unstyled"
            size="md"
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            secureTextEntry
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SaveAccountForm;
