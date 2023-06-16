import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const GridInput = () => {
  const [gridData, setGridData] = useState(
    Array.from({length: 10}, () => Array(5).fill('')),
  );

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
  };

  const renderColumns = () => {
    return (
      <View style={styles.row}>
        <Text style={styles.columnHeaderText}>A</Text>
        <Text style={styles.columnHeaderText}>B</Text>
        <Text style={styles.columnHeaderText}>C</Text>
        <Text style={styles.columnHeaderText}>D</Text>
        <Text style={styles.columnHeaderText}>E</Text>
      </View>
    );
  };

  const renderRows = () => {
    return Array.from({length: 10}, (_, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        <Text style={styles.rowHeaderText}>{rowIndex + 1}</Text>
        {renderColumnsForRow(rowIndex)}
      </View>
    ));
  };

  const renderColumnsForRow = rowIndex => {
    return Array.from({length: 5}, (_, colIndex) => (
      <TextInput
        key={colIndex}
        style={styles.input}
        value={gridData[rowIndex][colIndex]}
        onChangeText={text => handleInputChange(rowIndex, colIndex, text)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {renderColumns()}
      {renderRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  columnHeaderText: {
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
  },
  rowHeaderText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 60,
    textAlign: 'center',
  },
});

export default GridInput;
