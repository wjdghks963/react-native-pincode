import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import NumberView from './NumberView';
import { PasswordContext } from '../index';
import shuffleArray from '../utils/shuffleArray';

/**
 *
 * @param emptyIcon - Empty Icon Any Component
 * @param deleteIcon - Delete Icon Any Component
 * @param backgroundColor - Container Color ?
 * @param shuffleIcon - Shuffle Button Component
 * @returns
 */
function NumberPad({
  emptyIcon,
  deleteIcon,
  backgroundColor,
  shuffleIcon,
}: {
  emptyIcon: React.ReactNode;
  deleteIcon: React.ReactNode;
  backgroundColor?: string;
  shuffleIcon?: React.ReactNode;
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

  const firstCol = numpadArr[0];
  const secondCol = numpadArr[1];
  const thirdCol = numpadArr[2];
  const firthCOl = numpadArr[3];

  return (
    <View style={containerStyle(backgroundColor).container}>
      <View style={style.numpadContainer}>
        <View style={style.textsContainer}>
          {firstCol!.map((item, index) => (
            <NumberView
              key={index}
              emptyIcon={emptyIcon}
              content={item}
              onPress={() => onPressNumber(item)}
            />
          ))}
        </View>
        <View style={style.textsContainer}>
          {secondCol!.map((item, index) => (
            <NumberView
              key={index}
              emptyIcon={emptyIcon}
              content={item}
              onPress={() => onPressNumber(item)}
            />
          ))}
        </View>
        <View style={style.textsContainer}>
          {thirdCol!.map((item, index) => (
            <NumberView
              key={index}
              emptyIcon={emptyIcon}
              content={item}
              onPress={() => onPressNumber(item)}
            />
          ))}
        </View>
        <View style={style.textsContainer}>
          {firthCOl!.map((item, index) => (
            <NumberView
              key={index}
              emptyIcon={emptyIcon}
              content={item}
              onPress={() => onPressNumber(item)}
            />
          ))}
        </View>
      </View>
      <View style={style.numpadContainer}>
        <Text style={style.funtcionText} onPress={shuffleArr}>
          {shuffleIcon ? shuffleIcon : ''}
        </Text>
        <Text style={style.funtcionText} onPress={() => onPressDelete()}>
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
  text: {
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
    width: '100%',
    textAlign: 'center',
  },
  textsContainer: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
  },
  funtcionText: {
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
