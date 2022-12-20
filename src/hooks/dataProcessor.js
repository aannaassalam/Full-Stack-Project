export default function DataProcessor(old_data, element) {
  const dataCount = {};
  for (let i = 0; i < old_data.length; i++) {
    const item = old_data[i];
    if (item[element] && Object.keys(dataCount).includes(`${item[element]}`)) {
      dataCount[item[element]] = dataCount[item[element]] + 1;
    } else if (item[element]) {
      dataCount[item[element]] = 1;
    }
  }
  return dataCount;
}
