# 🔑 react-native-pincode

PIN CODE component for react-native

If you have any suggestions or bugs, please don't hesitate to register an issue or PR. Thank you 🥳

## 🎥 Sample Video

### 🤖 AOS

![react-natice-pincode](https://github.com/wjdghks963/react-native-pincode/assets/74060017/8d719ce6-b7c4-43b0-a83f-c226e36cb58b)


### 🍎 IOS

![iphon](https://github.com/wjdghks963/react-native-pincode/assets/74060017/741f2c8d-f82f-412d-8bcf-0b0f747ee426)

## 📦 Installation

install with react-native-reanimated and follow [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation) to set babel plugin

```sh
npm i @wjdghks963/react-native-shuffle-pincode react-native-reanimated
```

## ⚙️ Usage

Simple Usage

```js
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const pincode = ['1', '1', '1', '1', '1', '1'];

  const [backGroundColor, setBackGroundColor] = useState<string>('');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{height: '100%'}}>
        <PinCode
          pinCount={pincode.length}
          correctPin={pincode}
          afterClear={() => setBackGroundColor('yellow')}
          backgroundColor={backGroundColor}>
          <PinCode.PinContent filledColor="red" emptyColor="" />
          <PinCode.NumberPad
            emptyIcon={<Text>⭐️</Text>}
            deleteIcon={<Text>DEL</Text>}
            shuffleIcon={<Text>Shuffle</Text>}
            backgroundColor={'red'}
          />
        </PinCode>
      </View>
    </SafeAreaView>
  );
}
```

### 🔧 Properties

Properties that accept React.ReactNode can accommodate any type of component, whether they are native components from React Native's core or components from third-party libraries.
This flexibility allows you to seamlessly integrate a wide range of UI elements and widgets into your PIN CODE screen.

ex)
```
<View/>, <Text/>, <Image/> ...
```


#### PinCode

| PropertyName    | Type     | Description                                                  | Default  |
|-----------------|----------|--------------------------------------------------------------|----------|
| pinCount        | number   | Length of pin code                                           | required |
| correctPin      | string[] | The value You've specified as an answer                      | required |
| afterClear      | any      | Function that execute when correctPin and User input is same | required |
| backgroundColor | string?  | Main Container background color                              | ""       |

<br/>

#### PINContent

| PropertyName | Type    | Description                      | Default |
|--------------|---------|----------------------------------|---------|
| title        | string? | Title that above pin circles     | null    |
| filledColor  | string? | Circle Color when user input pin | red     |
| emptyColor   | string? | Circle Color before input comes  | #fca5a5 |

<br/>

#### NumberPad

| PropertyName    | Type             | Description                                           | Default  |
|-----------------|------------------|-------------------------------------------------------|----------|
| emptyIcon       | React.ReactNode  | Component that Represents a blank space in the Numpad | required |
| deleteIcon      | React.ReactNode  | Component that can delete input                       | required |
| backgroundColor | string?          | Numpad background color                               | #dc2626  |
| shuffleIcon     | React.ReactNode? | Component that can shuffle numpad                     | ''       |





[//]: # (## Contributing)

[//]: # ()
[//]: # (See the [contributing guide]&#40;CONTRIBUTING.md&#41; to learn how to contribute to the repository and the development workflow.)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
