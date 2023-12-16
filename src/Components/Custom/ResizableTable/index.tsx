import React, { useState, useEffect, useRef } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import style from "./style.module.css";

export const ResizableTable = ({
  tableRef,
  dataSource,
  paginationOptions,
  minColumnWidth,
  columns,
  ...restProps
}: any) => {
  const [resizingColumnIndex, setResizingColumnIndex] = useState<
    number | undefined
  >();
  const [tableColumns, setTableColumns] = useState<ColumnsType<any>>([]);
  const resizingColumnIndexRef = useRef<number | undefined>();

  useEffect(() => {
    setTableColumns(columns);
  }, [columns]);

  const handleResize = (index: number, delta: number) => {
    setTableColumns((prevColumns: any) => {
      const nextColumns = [...prevColumns];
      const indexNewWidth = Number(prevColumns[index].width) + delta;
      const nextWidth =
        indexNewWidth >= minColumnWidth ? indexNewWidth : minColumnWidth;
      nextColumns[index] = { ...nextColumns[index], width: nextWidth };
      return nextColumns;
    });
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingColumnIndex(index);
    resizingColumnIndexRef.current = index;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    setResizingColumnIndex(undefined);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (resizingColumnIndexRef.current !== undefined) {
      handleResize(resizingColumnIndexRef.current, e.movementX);
    }
  };

  const addResizeHandle = (columns: ColumnsType<any>) =>
    columns.map((col: any, index: number) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        index: index,
      }),
    }));

  const headerComponent = {
    header: {
      cell: (props: any) => {
        const { children, index, ...restProps } = props;
        return (
          <th {...restProps}>
            {children}
            <div
              className={style["resizeHandle"]}
              onMouseDown={handleMouseDown(index)}
            />
          </th>
        );
      },
    },
  };

  return (
    <Table
      ref={tableRef}
      className="table-striped-rows"
      scroll={{ y: "calc(100vh - 345px)" }}
      columns={addResizeHandle(tableColumns)}
      dataSource={dataSource}
      pagination={paginationOptions}
      components={headerComponent}
      bordered
      {...restProps}
    />
  );
};
