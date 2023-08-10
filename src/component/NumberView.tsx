import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function NumberView({
  emptyIcon,
  content,
  onPress,
}: {
  content: string;
  emptyIcon: React.ReactNode;
  onPress: (content: string) => void;
}) {
  return content === '*' ? (
    <Text style={style.text}>{emptyIcon}</Text>
  ) : (
    <Text style={style.text} onPress={() => onPress(content)}>
      {content}
    </Text>
  );
}

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    paddingVertical: 15,
    display: 'flex',
    justifyContent: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
