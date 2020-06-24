import React, { Component } from 'react';
import Sheet from '../atoms/Sheet';
import DataTable from '../molecules/DataTable';

interface MainProps {}
interface MainState {}
const initialState: MainState = {};

class Main extends Component<MainProps, MainState> {
  readonly state: MainState = initialState;

  render() {
    return (
      <Sheet
        flexDirection='row'
        flexWrap='nowrap'
        width='100%'
        height='100vh'
        alignItems='center'
        justifyContent='center'
      >
        <DataTable />
      </Sheet>
    );
  }
}

export default Main;
