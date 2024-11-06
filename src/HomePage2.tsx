import { useState } from "react";
import { evaluate } from "mathjs";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export function HomePage2() {
  const [display, setDisplay] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');

  const comando = (valor: string) => {
    setDisplay((valorAnterior) => valorAnterior + valor)
  };

  const calcularResultado = () => {
    try {
      const resultadoEval = evaluate(display);
      setResultado(resultadoEval.toString())
    } catch (error) {
      setResultado("Erro: " + error)
    }
  };

  const limparTela = () => {
    setDisplay("");
    setResultado("");
  };

  const apagar = () => {
    setDisplay((valorAnterior) => valorAnterior.slice(0, -1));
  };

  const teclado = [
    [
      { label: "C", funcao: () => limparTela() },
      { label: ")", funcao: () => comando(")") },
      { label: "(", funcao: () => comando("(") },
      { label: "⌫", funcao: () => apagar() },
    ],
    [
      { label: "7", funcao: () => comando("7") },
      { label: "8", funcao: () => comando("8") },
      { label: "9", funcao: () => comando("9") },
      { label: "√", funcao: () => comando("sqrt(") },
    ],
    [
      { label: "4", funcao: () => comando("4")},
      { label: "5", funcao: () => comando("5")},
      { label: "6", funcao: () => comando("6")},
      { label: "^", funcao: () => comando("^")},
    ],
    [
      { label: "1", funcao: () => comando("1")},
      { label: "2", funcao: () => comando("2")},
      { label: "3", funcao: () => comando("3")},
      { label: "%", funcao: () => comando("%")},
    ],
    [
      { label: "0", funcao: () => comando("0")},
      { label: ".", funcao: () => comando(".")},
      { label: "=", funcao: () => calcularResultado()},
      { label: "+", funcao: () => comando("+")},
    ],
  ];

  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <Text style={styles.display}>{display || '0'}</Text>
      </ScrollView>
      <Text style={styles.result}>{resultado ? `= ${resultado}` : ''}</Text>
      {teclado.map((row, rowIndex) => {
        return (
          <View style={styles.row} key={rowIndex}>
            {row.map((item, index) => {
              return (
                <Button
                  key={index}
                  mode="contained"
                  onPress={item.funcao}
                >
                  {item.label}
                </Button>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  display: {
    fontSize: 36,
    color: '#333',
    textAlign: 'right',
    marginBottom: 10,
  },
  result: {
    fontSize: 24,
    color: '#777',
    textAlign: 'right',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
})