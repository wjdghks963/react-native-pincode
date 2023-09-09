import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import NumberView from './NumberView';
import shuffleArray from '../utils/shuffleArray';
import { PasswordContext } from 'react-native-pin';

/**
 *
 * @param emptyIcon - Empty Icon Any Component
 * @param deleteIcon - Delete Icon Any Component
 * @param shuffleIcon - Shuffle Button Component
 * @param backgroundColor - Container Color
 * @param textColor - Text Color
 * @returns
 */
function NumberPad({
  emptyIcon,
  deleteIcon,
  shuffleIcon,
  backgroundColor,
  textColor,
}: {
  emptyIcon: React.ReactNode;
  deleteIcon: React.ReactNode;
  shuffleIcon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}) {
  const [_, setPassword] = useContext(PasswordContext);
  const [numpadArr, setNumpadArr] = useState<string[][]>(
    shuffleArray([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '*', '0'],
    ])
  );

  const shuffleArr = useCallback(() => {
    const shuffledArr = shuffleArray(numpadArr);
    return setNumpadArr(shuffledArr);
  }, [numpadArr]);

  const onPressNumber = (number: string) => {
    if (number !== '*') {
      setPassword((pre) => {
        const newArr = [...pre];
        const emptyIndex = newArr.indexOf('-1');
        newArr[emptyIndex] = number;
        return newArr;
      });
    }
  };

  const onPressDelete = () => {
    setPassword((pre) => {
      const newArr = [...pre];
      let lastIndex = 0;
      for (let i = newArr.length - 1; i > 0; i--) {
        if (newArr[i] !== '-1') {
          lastIndex = i;
          break;
        }
      }
      newArr[lastIndex] = '-1';
      return newArr;
    });
  };

  return (
    <View style={containerStyle(backgroundColor).container}>
      <View style={style.numpadContainer}>
        {numpadArr.map((col, index) => (
          <View key={index} style={style.textsContainer}>
            {col.map((item, index) => (
              <NumberView
                key={index}
                content={item}
                emptyIcon={emptyIcon}
                onPress={() => onPressNumber(item)}
                color={textColor}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={style.numpadContainer}>
        <Text
          style={[style.functionText, { color: textColor ?? 'white' }]}
          onPress={shuffleArr}
        >
          {shuffleIcon ? shuffleIcon : ''}
        </Text>
        <Text
          style={[style.functionText, { color: textColor ?? 'white' }]}
          onPress={() => onPressDelete()}
        >
          {deleteIcon}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  numpadContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textsContainer: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
  },
  functionText: {
    width: Dimensions.get('window').width / 2,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
});

const containerStyle = (backgroundColor?: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: backgroundColor ? backgroundColor : '#dc2626',
    },
  });

export default React.memo(NumberPad);
