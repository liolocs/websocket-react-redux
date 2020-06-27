import React, { Component } from 'react';
import DataTable from '../organisms/DataTable';
import DataTableContainer from '../molecules/DataTableContainer';

interface MainProps {}
interface MainState {}
const initialState: MainState = {};

class Main extends Component<MainProps, MainState> {
  readonly state: MainState = initialState;

  render() {
    return (
      <DataTableContainer>
        <DataTable />
      </DataTableContainer>
    );
  }
}

export default Main;
