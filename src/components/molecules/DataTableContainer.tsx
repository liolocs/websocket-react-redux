import React, { SFC } from 'react';
import Sheet from '../atoms/Sheet';

type TableContainerProps = { children: any };

const TableContainer: SFC<TableContainerProps> = (props: TableContainerProps) => {
  return (
    <Sheet
      display='flex'
      flexDirection='row'
      flexWrap='nowrap'
      width='100vw'
      height='100vh'
      alignItems='center'
      justifyContent='center'
      padding='0 5vw'
    >
      {props.children}
    </Sheet>
  );
};

export default TableContainer;
