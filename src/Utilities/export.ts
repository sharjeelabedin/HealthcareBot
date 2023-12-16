export function formatHeader(key: any) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, function (str: any) {
        return str.toUpperCase();
    });
}

export const headers = (data: any) => Object.keys(data[0]).map((key) => formatHeader(key));

export const formatData = (data: any) =>
    data.map((obj: any) => {
        let newObj: any = {};
        for (let key in obj) {
            newObj[formatHeader(key)] = obj[key];
        }
        return newObj;
    });

export const filterDataforExport = (columns: any, dataSource: any) => {
    const columnsToInclude : any = [];

    columns.forEach((column: any) => {
        columnsToInclude.push(column.dataIndex);
    });

    return dataSource.map((item: any) => {
        const _item: any = {};
        for (const key in item) {
            if (columnsToInclude.includes(key)) 
                    _item[key] = item[key]
        }
        return _item;
    });
}