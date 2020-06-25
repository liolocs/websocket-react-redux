import React, { Component } from 'react';
import Sheet from '../atoms/Sheet';
import DataTable from '../organisms/DataTable';

interface MainProps {}
interface MainState {}
const initialState: MainState = {};

class Main extends Component<MainProps, MainState> {
  readonly state: MainState = initialState;

  render() {
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
        <DataTable />
      </Sheet>
    );
  }
}

export default Main;
