import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import { Check, DeleteOutline, Edit, AddBox, Clear } from "@material-ui/icons";
import PlayForm from "../containers/pages/play/PlayForm";

import {
  deleteMovie,
  deleteBooking,
  deletePlay,
  editMovie,
  addMovie,
  addPlay
} from "../api/fetchData";
import { tableConfig } from "../helpers/tablesConfig";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />)
};

const buildPlayPk = data => {
  console.log("que mierda", data);
  const pk = {
    movieId: data.movieId,
    roomId: parseInt(data.room),
    startTime: data.movieStartTime
  };
  return pk;
};

class TableWithActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      columns: [],
      data: [],
      title: ""
    };
  }

  componentWillReceiveProps({ type, movieData, playData, bookingsData }) {
    const table = tableConfig(type, movieData, playData, bookingsData);
    this.setState({
      type,
      title: table.title,
      columns: table.columns,
      data: table.data,
      isPlayOpen: false
    });
  }

  deleteAction = rowData => {
    const { type } = this.state;
    const { bookId } = rowData;
    const { movieId } = rowData;
    const { playPK } = rowData;
    switch (type) {
      case "booking":
        deleteBooking(bookId);
        break;
      case "movie":
        deleteMovie(movieId);
        break;
      case "play":
        deletePlay(playPK);

        break;
      default:
        break;
    }
  };

  editAction = rowData => {
    const { type } = this.state;
    switch (type) {
      case "booking":
        //  editBooking(rowData);
        break;
      case "movie":
        editMovie(rowData);
        break;
      case "play":
        // editPlay(rowData);

        break;
      default:
        break;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addAction = rowData => {
    const { type } = this.state;
    const { movieData } = this.props;
    switch (type) {
      case "booking":
        //  editBooking(rowData);
        break;
      case "movie":
        addMovie(rowData);
        break;
      case "play":
        this.setState({ isPlayOpen: true });

      default:
        break;
    }
  };

  render() {
    const { columns, data, title, isPlayOpen } = this.state;
    const {
      selectPlay,
      onlyRequest,
      deleteAction,
      editAction,
      movieData
    } = this.props;
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data}
          title={title}
          actions={
            (onlyRequest
              ? [
                  {
                    icon: () => <Check />,
                    tooltip: "Select",
                    onClick: (event, rowData) => selectPlay(rowData)
                  }
                ]
              : [
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete",
                    onClick: (event, rowData) => deleteAction(rowData)
                  }
                ],
            [
              {
                icon: () => <AddBox />,
                tooltip: "Add new",
                isFreeAction: true,
                onClick: () => this.addAction()
              }
            ])
          }
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const { data } = this.state;
                const index = data.indexOf(oldData);
                data[index] = newData;
                this.editAction(newData);
                this.setState({ data }, () => resolve());
              })
          }}
          options={{ search: false, paging: false }}
        />
        {isPlayOpen ? (
          <PlayForm
            open={isPlayOpen}
            onClose={this.handleClose}
            movieData={movieData}
          />
        ) : null}
      </div>
    );
  }
}

export default TableWithActions;
