## 3 Principles:

1. State of whole app is stored inside a single object tree called as **Store**.
2. State should always be changed indirectly with the help of emitting **Actions**.
3. Write **Pure Reducers** to define working of each Actions.

- Pure Reducers are the Pure Functions which updates the state in a non-mutational manner.

### Duck Pattern:

All **constants**, **action creators** and **reducers** related to a single state inside the store should be declared in the same place/module or say file.

## Hooks:

### useSelector()

- Uses `===` by default for checking equality.
- Also can pass `shallowEqual` method being passed as the 2nd arg in useSelector.
- If want custom comparison, can pass callback for Custom Shallow Comparison as the 2nd arg in useSelector.

Syntax:

```js
import { useSelector, shallowEqual } from "react-redux";

const state = useSelector(selectorCB, shallowEqual);
```
