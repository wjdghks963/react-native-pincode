import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';
import { CorrectPasswordContext, PasswordContext } from 'react-native-pin';

/**
 *
 * @param title - Title Text Component
 * @param filledColor - Filled Color
 * @param emptyColor - Empty Color
 * @param badgeSize - Size of Badges
 * @returns
 */
export default function PINContent({
  title,
  filledColor,
  emptyColor,
  badgeSize,
}: {
  title?: React.ReactNode;
  filledColor?: string;
  emptyColor?: string;
  badgeSize?: number;
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
      {title ? <View>{title}</View> : null}
      <Animated.View
        style={[badgeContainer(password.length).container, customSpringStyles]}
      >
        {password.map((item, index) => {
          return item === '-1' ? (
            <View
              key={index}
              style={[
                badgeColor(filledColor, emptyColor).emptyBadge,
                badgeStyle(badgeSize).badge,
              ]}
            />
          ) : (
            <View
              key={index}
              style={[
                badgeColor(filledColor, emptyColor).filledBadge,
                badgeStyle(badgeSize).badge,
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
});

const badgeContainer = (passwordLength: number) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: passwordLength < 7 ? 20 : 10,
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

const badgeStyle = (size?: number) =>
  StyleSheet.create({
    badge: {
      width: size ?? 23,
      height: size ?? 23,
      borderRadius: 100,
    },
  });
