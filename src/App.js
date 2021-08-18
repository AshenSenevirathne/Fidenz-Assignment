import React from "react";
import {createTheme , MuiThemeProvider, responsiveFontSizes} from "@material-ui/core/styles";
import DashboardContainer from "./Components/Dashboard/DashboardContainer";
import {deepPurple} from "@material-ui/core/colors";


const Theme = responsiveFontSizes(createTheme ({
    palette: {
        primary: deepPurple,
    }, typography: {
        button: {
            textTransform: 'none'
        }
    }
}));

function App() {
    return (
        <MuiThemeProvider theme={Theme}>
            <DashboardContainer/>
        </MuiThemeProvider>
    );
}

export default App;
