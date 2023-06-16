import {PermissionsAndroid, Alert} from 'react-native';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

export const saveDataToExcel = async (workbook, fileName) => {
  const granted = await requestExternalStoragePermission();
  if (!granted) {
    Alert.alert('Error', 'Permission to access storage denied');
    return;
  }

  const excelData = XLSX.write(workbook, {type: 'base64'});
  const filePath = `${RNFS.ExternalDirectoryPath}/${fileName}`;

  try {
    await RNFS.writeFile(filePath, excelData, 'base64');
    Alert.alert('Success', 'Excel file saved successfully');
  } catch (error) {
    Alert.alert('Error', 'Failed to save Excel file');
  }
};

const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Permission',
        message:
          'This app needs access to your external storage to save files.',
        buttonPositive: 'Allow',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log('Error requesting permission:', error);
    return false;
  }
};
