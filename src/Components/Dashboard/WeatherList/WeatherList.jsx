import React from "react";
import {Grid} from "@material-ui/core";
import WeatherCard from "../WeatherCard/WeatherCard";
import AddCity from "../AddCity/AddCity";
import cities from "../../../Assests/Json/cities.json";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
}));

export default function WeatherList() {

    const classes = useStyles();
    let citiesAsArray = cities.List;
    let count = 0;

    return <React.Fragment>
        <AddCity/>
        <main className={classes.layout}>
            <Grid container spacing={3}>
                {
                    citiesAsArray && citiesAsArray.map(city => {
                        return <WeatherCard key={city.CityCode} city={city.CityCode} count={++count}/>
                    })
                }
            </Grid>
        </main>

    </React.Fragment>
}