/* eslint-disable no-restricted-globals */
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
import PriceForm from "../containers/pages/prices/PriceForm";

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
      title: "",
      isPlayOpen: false,
      isMovieOpen: false,
      isPriceOpen: false
    };
  }

  componentWillReceiveProps({
    type,
    movieData,
    playData,
    bookingsData,
    priceData
  }) {
    const table = tableConfig(
      type,
      movieData,
      playData,
      bookingsData,
      priceData
    );
    this.setState({
      type,
      title: table.title,
      columns: table.columns,
      data: table.data
    });
  }

  handlePlayClose = () => {
    this.setState({ isPlayOpen: false });
    location.reload();
  };

  handleMovieClose = () => {
    this.setState({ isMovieOpen: false });
    location.reload();
  };

  handlePriceClose = () => {
    this.setState({ isPriceOpen: false });
    location.reload();
  };

  // TODO: can be improved calling an add func in the panel
  addAction = () => {
    const { type } = this.state;
    switch (type) {
      case "movie":
        this.setState({ isMovieOpen: true });
        break;
      case "play":
        this.setState({ isPlayOpen: true });
        break;
      case "price":
        this.setState({ isPriceOpen: true });

        break;
      default:
        break;
    }
  };

  avaliableActions = () => {
    const { type } = this.state;
    const { onlyRequest, selectPlay, deleteAction } = this.props;
    const actions = [];

    if (!onlyRequest) {
      actions.push(
        {
          icon: () => <AddBox />,
          tooltip: "Add new",
          isFreeAction: true,
          onClick: () => this.addAction(),
          disabled: type === "booking"
        },
        {
          icon: () => <DeleteOutline />,
          tooltip: "Delete",
          onClick: (event, rowData) => deleteAction(rowData, type)
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
    const { onlyRequest, editAction } = this.props;
    const isEditable = type === "movie";
    if (isEditable) {
      return {
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const { data } = this.state;
            const index = data.indexOf(oldData);
            data[index] = newData;
            editAction(newData, this.state.type);
            this.setState({ data }, () => resolve());
          })
      };
    }
    return null;
  };

  render() {
    const {
      columns,
      data,
      title,
      isPlayOpen,
      isMovieOpen,
      isPriceOpen
    } = this.state;
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
            onClose={this.handlePlayClose}
            movieData={movieData}
          />
        ) : null}
        {isMovieOpen ? (
          <MovieForm open={isMovieOpen} onClose={this.handleMovieClose} />
        ) : null}
        {isPriceOpen ? (
          <PriceForm open={isPriceOpen} onClose={this.handlePriceClose} />
        ) : null}
      </div>
    );
  }
}

export default TableWithActions;
