import { Box } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import MotionBox from "lib/components/motion/Box";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <AnimatePresence exitBeforeEnter>
          <MotionBox
            as="main"
            marginY={22}
            key={asPath}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
          >
            {children}
          </MotionBox>
        </AnimatePresence>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
