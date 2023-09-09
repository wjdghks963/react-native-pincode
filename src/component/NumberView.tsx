import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function NumberView({
  emptyIcon,
  content,
  color,
  onPress,
}: {
  content: string;
  emptyIcon: React.ReactNode;
  color?: string;
  onPress: (content: string) => void;
}) {
  return content === '*' ? (
    <Text style={style(color).text}>{emptyIcon}</Text>
  ) : (
    <Text style={style(color).text} onPress={() => onPress(content)}>
      {content}
    </Text>
  );
}

const style = (color?: string) =>
  StyleSheet.create({
    text: {
      color: color ?? 'white',
      fontWeight: 'bold',
      width: '100%',
      paddingVertical: 15,
      display: 'flex',
      justifyContent: 'center',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });
