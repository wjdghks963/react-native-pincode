import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import PINContent from './component/PINContent';
import NumberPad from './component/NumberPad';

export const PasswordContext = React.createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[''], () => {}]);

export const CorrectPasswordContext = React.createContext<{
  correctPin: string[];
  afterClear: void | any;
}>({ correctPin: [''], afterClear: () => {} });

/**
 *
 * @param  children - NumbPad or PinContent
 * @param  pinCount - Must be same with correctPin's length
 * @param  correctPin - Correct Pin ex) ['1','2','3']
 * @param  afterClear - Execute when correctPin is same with input Pin code
 * @param  backgroundColor - Container background color
 * @returns
 */
function PinCode({
  children,
  pinCount,
  correctPin,
  afterClear,
  backgroundColor,
}: {
  children: React.ReactNode;
  pinCount: number;
  correctPin: string[];
  afterClear: void | any;
  backgroundColor?: string;
}) {
  const password = React.useState<string[]>(new Array(pinCount).fill('-1'));

  return (
    <PasswordContext.Provider value={password}>
      <CorrectPasswordContext.Provider value={{ correctPin, afterClear }}>
        <View style={[style.container, { backgroundColor }]}>{children}</View>
      </CorrectPasswordContext.Provider>
    </PasswordContext.Provider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

PinCode.NumberPad = NumberPad;
PinCode.PinContent = PINContent;

export default PinCode;
