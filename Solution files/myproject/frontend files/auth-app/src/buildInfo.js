export const BUILD_INFO = {
  version: process.env.REACT_APP_VERSION || "dev",
  commit: process.env.REACT_APP_GIT_SHA || "unknown",
  builtAt: process.env.REACT_APP_BUILD_TIME || "shit",
};
