import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import PlayList from "../containers/pages/play/PlayList";
import CustomSeatPicker from "./SeatPicker";
import Checkout from "./Checkout";

const useStyles = {
  root: {
    width: "100%"
  },
  instructions: {
    marginTop: "10px",
    marginBottom: "10px"
  }
};

const getSteps = () => {
  return ["Select Play for the movie", "Choose your seats", "Checkout!"];
};
const getTitle = step => {
  const titles = getSteps();
  switch (step) {
    case 0:
      return titles[0];
    case 1:
      return titles[1];
    case 2:
      return titles[2];
    default:
      break;
  }
};

class StepperProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
  }

  getStepContent = (step, playData, selectPlay, selectSeats, takenSeats) => {
    switch (step) {
      case 0:
        return (
          <PlayList
            playData={playData}
            selectPlay={play => this.handleSelectionPlay(selectPlay, play)}
          />
        );
      case 1:
        return (
          <CustomSeatPicker
            takenSeats={takenSeats}
            selectSeats={seats => this.handleSelectionSeat(selectSeats, seats)}
          />
        );
      case 2:
        return <Checkout />;
      default:
        return "Unknown step";
    }
  };

  handleSelectionPlay = (selectAction, play) => {
    console.log("handle selection");
    selectAction(play);
    this.handleNext();
  };

  handleSelectionSeat = (selectAction, seats) => {
    console.log("handle selection");
    selectAction(seats);
    this.handleNext();
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const steps = getSteps();
    const { root, instructions, button } = useStyles;
    const { activeStep } = this.state;
    const { playData, selectPlay, selectSeats, takenSeats } = this.props;

    return (
      <div className={root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            <ChevronLeft />
          </Fab>
          <Typography gutterBottom variant="h5" color="primary">
            {getTitle(activeStep)}
          </Typography>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            disabled={activeStep === 2}
            onClick={this.handleNext}
          >
            <ChevronRight />
          </Fab>
        </div>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(
                activeStep,
                playData,
                selectPlay,
                selectSeats,
                takenSeats
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StepperProgress;
