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
import CustomSeatPicker from "../components/SeatPicker";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

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

const getStepContent = (step, playData, selectPlay) => {
  switch (step) {
    case 0:
      return <PlayList playData={playData} selectPlay={selectPlay} />;
    case 1:
      return <CustomSeatPicker />;
    case 2:
      return <div>Comp 3</div>;
    default:
      return "Unknown step";
  }
};

const StepperProgress = ({ playData, selectPlay }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  console.log("STEPER", playData);

  return (
    <div className={classes.root}>
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
          marginTop: "20px"
        }}
      >
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          disabled={activeStep === 0}
          onClick={handleBack}
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
          onClick={handleNext}
        >
          <ChevronRight />
        </Fab>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>{getStepContent(activeStep, playData, selectPlay)}</div>
        )}
      </div>
    </div>
  );
};

export default StepperProgress;
