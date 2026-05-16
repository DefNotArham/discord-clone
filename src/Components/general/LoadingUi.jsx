import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import DefaultBackground from "./DefaultBackground";

const LoadingUi = () => {
  return (
    <DefaultBackground>
      <div className="h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-10 h-10 border-4 border-discord-muted border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
          />

          <motion.p
            className="text-sm text-discord-muted"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Loading...
          </motion.p>
        </div>
      </div>
    </DefaultBackground>
  );
};

export default LoadingUi;
