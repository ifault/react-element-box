> Mark and draw lines on the element under the mouse as it moves on the page

## Uses

```
import useElementBox from "react-element-box"
function App() {
    const { elementBox, hoverElement } = useElementBox({})
    return (
        <>
            {elementBox}
        </>
    )
}

export default
```

## Options

| Prop             | Type                                                              | Default                  |
| :--------------- | :---------------------------------------------------------------- | :----------------------- |
| enabled          | boolean                                                           | true                     |
| style            | strokeColor: string<br />strokeWidth: number<br />dashed: boolean | #6171fe<br />2<br />true |
| defaultMaskColor | string `<rgb>`                                                  | rgba(144, 238, 144, 0.1) |

## Demo

![1727696624686](dist/public/image.png)
