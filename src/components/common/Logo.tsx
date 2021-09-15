import { HStack, Heading } from "native-base";
import React from "react";

import LogoIcon from "./LogoIcon";

const Logo = () => {
  return (
    <HStack shadow={5} space={1} alignItems="center" justifyContent="center">
      <LogoIcon />
      <Heading fontFamily="Courgette_400Regular">Trivify</Heading>
    </HStack>
  );
};

export default Logo;
