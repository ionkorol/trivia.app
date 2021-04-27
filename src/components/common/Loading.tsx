import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "./Layout";

const Loading = () => {
  return (
    <Layout>
      <ActivityIndicator />
    </Layout>
  );
};

export default Loading;
