import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export function HomePage() {
  const [display, setDisplay] = useState<string>("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<string | null>(null);

  const handleNumberPress = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorPress = (op: string) => {
    setFirstOperand(display); setOperator(op); setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setOperator(null);
    setFirstOperand(null);
  };

  const handleEqualPress = () => {
    if (firstOperand !== null && operator !== null) {
      const secondOperand = display;
      const result = eval(`${firstOperand} ${operator} ${secondOperand}`);
      setDisplay(String(result));
      setOperator(null);
      setFirstOperand(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={styles.display}>{display}</Text>
      <View style={styles.row}>
        <Button
          mode="contained"
          onPress={handleClear}
        >C</Button>
        <Button
          mode="contained"
          onPress={() => handleOperatorPress("/")}
        >/</Button>
        <Button
          mode="contained"
          onPress={() => handleOperatorPress("*")}
        >*</Button>
        <Button
          mode="contained"
          onPress={() => handleOperatorPress("-")}
        >-</Button>
      </View>
      {[["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"]].map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num) => (
            <Button
              mode="contained"
              key={num} onPress={() => handleNumberPress(num)}
            >{num}</Button>
          ))}
        </View>))}
      <View style={styles.row}>
        <Button
          mode="contained"
          onPress={() => handleNumberPress("0")}
        >0</Button>
        <Button
          mode="contained"
          onPress={() => handleNumberPress(".")}
        >.</Button>
        <Button
          mode="contained"
          onPress={handleEqualPress}
        >=</Button>
        <Button
          mode="contained"
          onPress={() => handleOperatorPress("+")}
        >+</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  display: {
    fontSize: 48,
    textAlign: 'right',
    margin: 20,
  },
});
