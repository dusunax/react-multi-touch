# React Multi Touch

> [!NOTE]
> - This package need to be used in touch devices. 

## Overview

![image](https://github.com/user-attachments/assets/7514e307-dc73-407c-8f11-b9bb1d89122b)

React Multi Touch is a easy-to-use React-based npm package that enables multi-touch support for web applications in touch devices. 

It's version 1.0.x. Still in development, many room for improvement😉

## Installation 

[![npm version](https://img.shields.io/npm/v/react-multi-touch.svg?style=square)](https://www.npmjs.org/package/react-multi-touch)

```bash
npm install react-multi-touch
```

## Usage
```tsx
import { MultiTouch } from "react-multi-touch";
...
<MultiTouch
  id="your-element-id"
>
  <div>
    This Element is draggable, scalable and rotatable
  </div>
  
  {/* Optional: Handles for scaling on corner by 1 finger */}
  <MultiTouch.Handles /> 

  {/* Optional: Control toggle setting for dragging, rotation, scaling and reset buttons */}
  <MultiTouch.ControlSetting />
</MultiTouch>
```

## Components
- `<MultiTouch />`
- `<MultiTouch.Handles />`
- `<MultiTouch.ControlSetting />`

## Options
```tsx
<MultiTouch
  id="test-1" // required
  maxTrashhold={window.innerWidth}
  minTrashhold={60}
  handleMode="touching" // "always" | "touching"(default) | "none"
  className="custom-class"
  cornerStyle="custom-style"
  cornerImageSrc="/path/to/image.png"
  actionModes={new Set(["drag", "scale", "rotate"])}
  events={{
    onTouchStart: () => {},
    onTouchMove: () => {},
    onTouchEnd: () => {},
  }}
>
  {/* Your element */}
</MultiTouch>
```