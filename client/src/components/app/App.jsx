import React, { Suspense } from "react";
import AppRouter from "../../router";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { muiTheme } from "../../theme";

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Suspense fallback='loading...'>
        <AppRouter />
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
