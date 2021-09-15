import { useNavigation } from "@react-navigation/core";
import { Layout, Logo } from "components/common";
import { Form, useFormik } from "formik";
import {
  Button,
  HStack,
  Input,
  VStack,
  Text,
  Link,
  Heading,
  FormControl,
  IconButton,
  Icon,
  Alert,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "reduxx/store";
import { signinCredentials } from "reduxx/slices/userSlice";
import { errorHandler } from "lib/user";

const schema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup
    .string()
    .min(6, ({ min }) => `Must be at least ${min} characters!`)
    .required("Password is required!"),
});

const Signin = () => {
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.user);

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) =>
      await dispatch(signinCredentials(values) as any),
  });

  return (
    <Layout scroll>
      <VStack padding={10}>
        <IconButton
          position="absolute"
          left={5}
          top={5}
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
          <Text color="muted.500">Sign In to continue</Text>
        </VStack>
        {!formik.isValid ||
          (error.signin && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title _text={{ color: "error.500", opacity: 0.5 }}>
                {errorHandler(error.signin.code!) ||
                  formik.errors.username ||
                  formik.errors.password}
              </Alert.Title>
            </Alert>
          ))}
        <VStack space={5}>
          <Input
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            secureTextEntry
          />

          <Button
            isLoading={formik.isSubmitting}
            isLoadingText="Logging In..."
            onPress={() => formik.handleSubmit()}
          >
            Log In
          </Button>
        </VStack>
        <HStack space={2}>
          <Text color="muted.500">Don't have an account?</Text>
          <Link
            _text={{ color: "primary.500" }}
            onPress={() => nav.navigate("Signup")}
          >
            Register
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Signin;
