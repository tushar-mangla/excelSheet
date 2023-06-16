import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import XLSX from 'xlsx';
import {saveDataToExcel} from './ExcelUtils';

const Navbar = ({gridData}) => {
  const handleDownload = () => {
    if (gridData.length === 0) {
      alert('No data available to download');
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(gridData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    saveDataToExcel(workbook, 'grid_data.xlsx');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Navbar;
