export const addSorter: any = (
  columns: any,
  textTypeColumns: any
) => {
  return columns.map((column: any) => {
    if (textTypeColumns.includes(column.dataIndex))
      column.sorter = (a: any, b: any) => {
        const aName = a[column.dataIndex] ? a[column.dataIndex].toLowerCase() : null;
        const bName = b[column.dataIndex] ? b[column.dataIndex].toLowerCase() : null;
      
        if (/^[^a-zA-Z0-9]/.test(aName) && !/^[^a-zA-Z0-9]/.test(bName)) {
          return -1; // a comes first if it starts with a special character
        } else if (/^[^a-zA-Z0-9]/.test(bName) && !/^[^a-zA-Z0-9]/.test(aName)) {
          return 1; // b comes first if it starts with a special character
        } else if (/^\d/.test(aName) && !/^\d/.test(bName)) {
          return -1; // a comes first if it starts with a number
        } else if (/^\d/.test(bName) && !/^\d/.test(aName)) {
          return 1; // b comes first if it starts with a number
        } else {
          if(aName && bName){
            return aName.localeCompare(bName); // compare alphabetically
          }
          else{
            return null;
          }
        }
      }
    else
      column.sorter = (a: any, b: any) =>
        a[column.dataIndex] - b[column.dataIndex];

    return column;
  });
};
