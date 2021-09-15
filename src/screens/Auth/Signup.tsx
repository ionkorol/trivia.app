import { useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { useFormik } from "formik";
import {
  checkNameAvailability,
  errorHandler,
  signupCredentials,
} from "lib/user";
import {
  VStack,
  Heading,
  Input,
  HStack,
  Link,
  Text,
  Button,
  FormControl,
  Icon,
  IconButton,
  Alert,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import * as yup from "yup";
import { useAppSelector } from "reduxx/store";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required!")
    .test(
      "isNameAvailable",
      "Name is not available!",
      async (value) => await checkNameAvailability(value!)
    ),
  username: yup.string().trim("Test").required("Username is required!"),
  password: yup
    .string()
    .min(6, ({ min }) => `Must be at least ${min} characters!`)
    .required("Password is required!"),
});

const Signup = () => {
  const nav = useNavigation();
  const { error } = useAppSelector((state) => state.user);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      signupCredentials(values.name, values.username, values.password);
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  return (
    <Layout scroll>
      <VStack padding={10}>
        <IconButton
          position="absolute"
          left={3}
          top={0}
          icon={<Icon as={FontAwesome5} name="arrow-left" />}
          onPress={() => nav.goBack()}
        />
        <Logo />
      </VStack>
      <VStack
        flex={1}
        backgroundColor="white"
        borderTopRadius={50}
        shadow={5}
        padding={10}
        justifyContent="space-between"
      >
        <VStack>
          <Heading color="primary.500">Welcome</Heading>
          <Text color="muted.500">Register to continue</Text>
        </VStack>
        {!formik.isValid ||
          (error.signup && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title _text={{ color: "error.500", opacity: 0.5 }}>
                {errorHandler(error.signup.code!) ||
                  formik.errors.name ||
                  formik.errors.username ||
                  formik.errors.password}
              </Alert.Title>
            </Alert>
          ))}
        <VStack space={5}>
          <Input
            placeholder="Name"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            isInvalid={!!formik.errors.name}
          />

          <Input
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            isInvalid={!!formik.errors.username}
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            isInvalid={!!formik.errors.password}
            secureTextEntry
          />

          <Button
            isLoading={formik.isSubmitting}
            isLoadingText="Registering..."
            onPress={() => formik.handleSubmit()}
          >
            Register
          </Button>
        </VStack>
        <HStack space={2}>
          <Text color="muted.500">Already have an account?</Text>
          <Link
            _text={{ color: "primary.500" }}
            onPress={() => nav.navigate("Signin")}
          >
            Log In
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Signup;
