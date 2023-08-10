# react-native-pincode

PIN-CODE component for react-native


## Sample Video

![react-natice-pincode](https://github.com/wjdghks963/react-native-pincode/assets/74060017/8d719ce6-b7c4-43b0-a83f-c226e36cb58b)

## Installation

install react-native-reanimated and follow [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) to set babel plugin

```sh
npm install react-native-pincode react-native-reanimated
```

## Usage

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

### Properties

Property that receive React.ReactNode can be any component

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

| PropertyName    | Type             | Description                      | Default  |
|-----------------|------------------|----------------------------------|----------|
| emptyIcon       | React.ReactNode  | Title that above pin circles     | required |
| deleteIcon      | React.ReactNode  | Circle Color when user input pin | required |
| backgroundColor | string?          | Circle Color before input comes  | #dc2626  |
| shuffle         | boolean?         | Circle Color before input comes  | null     |
| shuffleIcon     | React.ReactNode? | Circle Color before input comes  | ''       |





[//]: # (## Contributing)

[//]: # ()
[//]: # (See the [contributing guide]&#40;CONTRIBUTING.md&#41; to learn how to contribute to the repository and the development workflow.)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
