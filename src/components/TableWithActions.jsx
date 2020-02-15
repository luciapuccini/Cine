import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";
import { tableConfig } from "../helpers/tablesConfig";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class TableWithActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      title: ""
    };
  }

  componentWillReceiveProps({ type, movieData, playData, bookingsData }) {
    const table = tableConfig(type, movieData, playData, bookingsData);
    this.setState({
      title: table.title,
      columns: table.columns,
      data: table.data
    });
  }

  render() {
    const { columns, data, title } = this.state;
    const { selectPlay, onlyRequest } = this.props;
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data}
          title={title}
          actions={
            onlyRequest
              ? [
                  {
                    icon: () => <Check />,
                    tooltip: "Select",
                    onClick: (event, rowData) => selectPlay(rowData)
                  }
                ]
              : null
          }
          // FIXME: hoy edits + deletes
          editable={
            onlyRequest
              ? null
              : {
                  onRowAdd: newData =>
                    new Promise(resolve => {
                      resolve();
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      resolve();
                      if (oldData) {
                        this.setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }),
                  onRowDelete: oldData =>
                    new Promise(resolve => {
                      resolve();
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    })
                }
          }
          options={{ search: false, paging: false }}
        />
      </div>
    );
  }
}

export default TableWithActions;
