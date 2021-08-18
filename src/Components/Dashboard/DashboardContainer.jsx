import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {Avatar, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import logo from '../../Assests/Images/logo.png';
import header_bg from '../../Assests/Images/header_bg.png';

import WeatherList from "./WeatherList/WeatherList";
import AddCityData from "./AddCity/AddCityData";

/*
*Styles
*/
const useStyles = makeStyles((theme) => ({
    LogoSection: {
        marginTop: 100,
        marginBottom: 30,
    },
    logo: {
        marginRight: 20
    },
    footer: {
        backgroundColor: "#30333d",
        width: "100%", padding: 20,
        color: "#eee",
        marginTop: 50,
        position: "relative",
        left: 0,
        bottom: 0,
    }
}));


export default function DashboardContainer() {
    const classes = useStyles();

    return <React.Fragment>
        <Grid container style={{
            backgroundImage: `url(${header_bg})`,
            backgroundRepeat: "no-repeat",
        }}>
            <Grid item xs={12}>
                <Grid className={classes.LogoSection} container alignItems={"center"} justifyContent={"center"}>
                    <Avatar className={classes.logo} alt="Logo" src={logo}/>
                    <Typography variant={"h6"} style={{color: "#fff"}}>Weather App</Typography>
                </Grid>
            </Grid>
            <Router>
                <Switch>
                    <Route
                        path="/addcity/:city"
                        component={(props) => (
                            <AddCityData {...props} key={window.location.pathname}/>
                        )}
                    />
                    <Route path="/">
                        <WeatherList/>
                    </Route>
                </Switch>
            </Router>
            <footer className={classes.footer}>
                <Typography align={"center"} variant={"body2"}>2021 Fidenz Technologies</Typography>
            </footer>
        </Grid>
    </React.Fragment>
}