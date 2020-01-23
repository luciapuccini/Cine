import React from "react";
import ReactDOM from "react-dom";
import DashApp from "./DashApp";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<DashApp />, document.getElementById("root"));

serviceWorker.unregister();
