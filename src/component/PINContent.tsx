import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CorrectPasswordContext, PasswordContext } from '../index';

import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

/**
 *
 * @param title - Title Text
 * @param filledColor - Filled Color
 * @param emptyColor - Empty Color
 * @returns
 */
export default function PINContent({
  title,
  filledColor,
  emptyColor,
}: {
  title?: string;
  filledColor?: string;
  emptyColor?: string;
}) {
  const [password, _] = useContext(PasswordContext);
  const { correctPin, afterClear } = useContext(CorrectPasswordContext);

  const isPasswordCorrect =
    JSON.stringify(password) === JSON.stringify(correctPin);

  const offset = useSharedValue(0);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withRepeat(
            withSpring(offset.value * 45, {
              damping: 200,
              stiffness: 90,
              mass: 0.0005,
            }),
            3,
            true,
            () => {
              return (offset.value = 0);
            }
          ),
        },
      ],
    };
  });

  useEffect(() => {
    if (!password.includes('-1')) {
      if (!isPasswordCorrect) {
        if (offset.value === 0) {
          offset.value = 0.05;
        }
      } else {
        afterClear();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, offset, isPasswordCorrect]);

  return (
    <View style={style.container}>
      {title ? (
        <View>
          <Text>{title}</Text>
        </View>
      ) : null}
      <Animated.View style={[style.badgeContainer, customSpringStyles]}>
        {password.map((item, index) => {
          return item === '-1' ? (
            <View
              key={index}
              style={[
                badgeColor(filledColor, emptyColor).emptyBadge,
                style.badge,
              ]}
            />
          ) : (
            <View
              key={index}
              style={[
                badgeColor(filledColor, emptyColor).filledBadge,
                style.badge,
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  badgeContainer: {
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  badge: {
    flex: 0.08,
    borderRadius: 100,
  },
});

const badgeColor = (filledColor?: string, emptyColor?: string) =>
  StyleSheet.create({
    filledBadge: {
      backgroundColor: filledColor ? filledColor : 'red',
    },
    emptyBadge: {
      backgroundColor: emptyColor ? emptyColor : '#fca5a5',
    },
  });
