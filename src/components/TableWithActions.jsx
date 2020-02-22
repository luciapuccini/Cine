import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import {
  Check,
  DeleteOutline,
  Edit,
  AddBox,
  Clear,
  FilterList
} from "@material-ui/icons";
import PlayForm from "../containers/pages/play/PlayForm";
import MovieForm from "../containers/pages/movie/MovieForm";

import {
  deleteMovie,
  deleteBooking,
  deletePlay,
  editMovie
} from "../api/fetchData";
import { tableConfig } from "../helpers/tablesConfig";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
};

const buildPlayPk = data => {
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
      isPlayOpen: false,
      isMovieOpen: false
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
      case "movie":
        // eslint-disable-next-line no-case-declarations
        const movie = {
          id: rowData.movieId,
          duration: rowData.duration,
          name: rowData.movieTitle
        };
        editMovie(movie);
        break;
      case "play":
        // editPlay(rowData);

        break;
      default:
        break;
    }
  };

  // refator
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // refator to play
  handleClose = () => {
    this.setState({ open: false });
  };

  handleMovieClose = () => {
    this.setState({ isMovieOpen: false });
  };

  addAction = rowData => {
    const { type } = this.state;
    const { movieData } = this.props;
    switch (type) {
      case "movie":
        this.setState({ isMovieOpen: true });
        break;
      case "play":
        this.setState({ isPlayOpen: true });
      default:
        break;
    }
  };

  avaliableActions = () => {
    const { type } = this.state;
    const { onlyRequest, deleteAction, selectPlay } = this.props;
    const actions = [];

    if (type !== "booking" && !onlyRequest) {
      actions.push(
        {
          icon: () => <AddBox />,
          tooltip: "Add new",
          isFreeAction: true,
          onClick: () => this.addAction()
        },
        {
          icon: () => <DeleteOutline />,
          tooltip: "Delete",
          onClick: (event, rowData) => deleteAction(rowData)
        }
      );
      return actions;
    }
    if (onlyRequest) {
      const onlyRequestActions = [
        {
          icon: () => <Check />,
          tooltip: "Select",
          onClick: (event, rowData) => selectPlay(rowData)
        }
      ];
      return onlyRequestActions;
    }
    return actions;
  };

  onEdit = () => {
    const { type } = this.state;
    const { onlyRequest } = this.props;
    const isEditable = type !== "booking" && !onlyRequest;
    if (isEditable) {
      return {
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const { data } = this.state;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.editAction(newData);
            this.setState({ data }, () => resolve());
          })
      };
    }
    return null;
  };

  render() {
    const { columns, data, title, isPlayOpen, isMovieOpen } = this.state;
    const { movieData } = this.props;
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data}
          title={title}
          actions={this.avaliableActions()}
          editable={this.onEdit()}
          options={{ search: false, paging: false }}
        />
        {isPlayOpen ? (
          <PlayForm
            open={isPlayOpen}
            onClose={this.handleClose}
            movieData={movieData}
          />
        ) : null}
        {isMovieOpen ? (
          <MovieForm open={isMovieOpen} onClose={this.handleMovieClose} />
        ) : null}
      </div>
    );
  }
}

export default TableWithActions;
