const COLOR = "gray-600";
const POSITION = {
  "top-left": "top-0 left-0 -ml-4 -mt-4",
  "top-right": "top-0 right-0 -mr-4 -mt-4",
  "bottom-left": "bottom-0 left-0 -ml-4 -mb-4",
  "bottom-right": "bottom-0 right-0 -mr-4 -mb-4",
};
const HANDLE_MODE = ["always", "touching", "hide"] as const;
const DEFAULT_HANDLE_MODE = "touching";

export { COLOR, POSITION, HANDLE_MODE, DEFAULT_HANDLE_MODE };