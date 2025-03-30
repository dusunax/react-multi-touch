// Style Constants
export const HANDLE_COLOR = "gray-600";
export const HANDLE_POSITIONS = {
  "top-left": "top-0 left-0 -ml-4 -mt-4",
  "top-right": "top-0 right-0 -mr-4 -mt-4",
  "bottom-left": "bottom-0 left-0 -ml-4 -mb-4",
  "bottom-right": "bottom-0 right-0 -mr-4 -mb-4",
} as const;

// Handle Visibility Modes
export const HANDLE_VISIBILITY_MODES = ["always", "touching", "hide"] as const;
export const DEFAULT_HANDLE_VISIBILITY = "touching";

// Interaction Modes
export const INTERACTION_MODES = ["drag", "scale", "rotate"] as const;

// Transform Origin Points
export const TRANSFORM_ORIGINS = {
  "top-left": [-1, -1],
  "top-right": [0, -1],
  "bottom-left": [-1, 0],
  "bottom-right": [0, 0],
} as const;

// Rotation Side Mappings
export const ROTATION_SIDES = {
  0: "top-left",
  1: "top-right",
  2: "bottom-left",
  3: "bottom-right",
} as const;
export type RotationSide = (typeof ROTATION_SIDES)[keyof typeof ROTATION_SIDES];

export const ROTATION_SIDE_MAP = {
  top: [0, 1, 2, 3],
  left: [2, 0, 3, 1],
  bottom: [3, 2, 1, 0],
  right: [1, 3, 0, 2],
} as const;
