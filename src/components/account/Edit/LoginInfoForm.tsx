import {
  VStack,
  HStack,
  Heading,
  Input,
  Icon,
  Button,
  Text,
  Alert,
  ScrollView,
} from "native-base";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "reduxx/store";
import { updateCredentials } from "reduxx/slices/userSlice";
import { errorHandler } from "lib/user";

const schema = yup.object().shape({
  username: yup.string().required("Name is required!"),
  currentPassword: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters!`)
    .required("Password is required!"),
  newPassword: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters!`),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match!"),
});

const AccountInfoForm = () => {
  const { credentials, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username:
        credentials && credentials.email
          ? credentials.email.replace("@trivify.app", "")
          : "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      await dispatch(
        updateCredentials({
          username: values.username,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }) as any
      );
      // helpers.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <VStack backgroundColor="rose.500" borderRadius={20}>
      <HStack
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="muted.300"
        justifyContent="space-between"
        paddingX={3}
      >
        <Heading size="md">Log In Info</Heading>
        <Button
          variant="unstyled"
          onPress={formik.handleSubmit as any}
          isLoading={formik.isSubmitting}
        >
          Save
        </Button>
      </HStack>
      <VStack paddingX={3} paddingY={3}>
        {!formik.isValid ||
          (error.updating && (
            <Alert status="error">
              <Alert.Icon />
              <Alert.Title>
                {errorHandler(error.updating.code!) ||
                  formik.errors.username ||
                  formik.errors.newPassword ||
                  formik.errors.currentPassword ||
                  formik.errors.confirmPassword}
              </Alert.Title>
            </Alert>
          ))}
        <HStack alignItems="center">
          <Text flex={1}>Username *</Text>
          <Input
            size="md"
            variant="unstyled"
            flex={3}
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            autoCapitalize="none"
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>Current *</Text>
          <Input
            size="md"
            variant="unstyled"
            flex={3}
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter current password"
            value={formik.values.currentPassword}
            onChangeText={formik.handleChange("currentPassword")}
            secureTextEntry
            textContentType="none"
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>New</Text>
          <Input
            size="md"
            variant="unstyled"
            flex={3}
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Enter new password"
            value={formik.values.newPassword}
            onChangeText={formik.handleChange("newPassword")}
            secureTextEntry
            autoCompleteType="off"
          />
        </HStack>
        <HStack alignItems="center">
          <Text flex={1}>Confirm</Text>
          <Input
            flex={3}
            variant="unstyled"
            size="md"
            InputRightElement={<Icon as={FontAwesome5} name="pen" size="xs" />}
            placeholder="Confirm new password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            secureTextEntry
            textContentType="oneTimeCode"
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default AccountInfoForm;
