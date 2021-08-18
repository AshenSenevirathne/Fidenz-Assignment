import React, {Component} from "react";
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {Avatar, Backdrop, Card, CircularProgress, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from "moment";
import logo from "../../../Assests/Images/logo.png";
import tele from "../../../Assests/Images/tele.png";
import bg1 from "../../../Assests/Images/bg1.jpg";

const styles = (theme) => ({
    text: {
        color: "#fff"
    },
    layout: {
        width: '100%',
        marginTop: 50,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    middleDivider: {
        width: 2,
        height: "100px",
        backgroundColor: "#fff",
        marginLeft: 50,
        [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
            marginLeft: 80,
        },
    }
});


class AddCityData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityDetails: null,
        }
    }

    fetchData = (url) => {
        axios.get(url)
            .then(res => {
                console.log(res.data)
                this.setState({
                    cityDetails: res.data
                })
                localStorage.setItem(url, JSON.stringify({
                    time: Date.now(),
                    city: res.data
                }))
            }).catch(err => {
           alert("Please Enter valid City!");
        })
    }

    /*
    *  Data cashing for minimize api requests
    * */
    componentDidMount() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.match.params.city}&appid=21c57da09ac5515cb2df5e5ff75875c6`;

        let cashedData = localStorage.getItem(url);

        if (cashedData) {
            cashedData = JSON.parse(cashedData);
            let difference = moment(Date.now()).diff(moment(cashedData.time), 'minutes');
            if (difference < 5) {
                this.setState({
                    cityDetails: cashedData.city
                })
            } else {
                this.fetchData(url);
            }

        } else {
            this.fetchData(url);
        }

    }


    render() {
        const {classes} = this.props;
        const city = this.state.cityDetails;
        return (
            <main className={classes.layout}>
                <Grid container alignItems={"center"} justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Card style={{width: "100%", backgroundColor: "#30333d"}}>
                            {
                                city
                                    ? <React.Fragment>
                                        <Grid container alignItems={"center"} justifyContent={"center"}
                                              style={{
                                                  backgroundImage: `url(${bg1})`,
                                                  backgroundPosition: "center",
                                                  backgroundSize: "revert",
                                                  padding: "10px 0px 30px 0px"
                                              }}
                                        >
                                            <Grid item xs={12}>
                                                <Grid container justifyContent={"flex-start"}>
                                                    <IconButton style={{marginLeft: 6, color: "#fff"}}
                                                                aria-label="delete"
                                                                size="small"
                                                                component={Link}
                                                                to={`/`}
                                                    >
                                                        <ArrowBackIcon fontSize="small"/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container alignItems={"center"} justifyContent={"center"}
                                                      direction={"column"}>
                                                    <Typography
                                                        variant={"h4"}
                                                        className={classes.text}
                                                    >
                                                        {city.name}, {city.sys.country}
                                                    </Typography>
                                                    <Typography
                                                        variant={"body1"} gutterBottom
                                                        className={classes.text}
                                                    >
                                                        {moment(Date.now()).format('h:mm a')}, {moment(Date.now()).format('MMM Do')}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Grid container alignItems={"center"}
                                                      justifyContent={"center"}
                                                      direction={"column"}
                                                >
                                                    <Avatar alt="Logo" src={logo}/>
                                                    <Typography
                                                        variant={"subtitle1"}
                                                        className={classes.text}
                                                    >
                                                        {city.weather[0].description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={2}>
                                                <div className={classes.middleDivider}>
                                                </div>

                                            </Grid>

                                            <Grid item xs={5}>
                                                <Grid container alignItems={"center"} justifyContent={"center"}
                                                      direction={"column"}>
                                                    <Typography variant={"h2"}
                                                                className={classes.text}>{Math.floor(city.main.temp - 273.15)}{'\u00b0'}c</Typography>
                                                    <Typography variant={"body1"} className={classes.text}>Temp
                                                        Min: {Math.floor(city.main.temp_min - 273.15)}{'\u00b0'}c</Typography>
                                                    <Typography variant={"body1"} gutterBottom
                                                                className={classes.text}>Temp
                                                        Max: {Math.floor(city.main.temp_max - 273.15)}{'\u00b0'}c</Typography>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                        <Grid container alignItems={"center"} justifyContent={"center"}
                                              style={{
                                                  padding: "20px 0px 20px 0px"
                                              }}
                                        >
                                            <Grid item xs={3}>
                                                <Grid container alignItems={"flex-start"} justifyContent={"center"}
                                                      direction={"column"}>
                                                    <Typography variant={"subtitle2"}
                                                                className={classes.text}>Pressure: {city.main.pressure}hPa</Typography>
                                                    <Typography variant={"subtitle2"}
                                                                className={classes.text}>Humidity: {city.main.humidity}%</Typography>
                                                    <Typography variant={"subtitle2"} gutterBottom
                                                                className={classes.text}>Visibility: {city.visibility}km</Typography>
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={1}>
                                                <div style={{
                                                    width: 2, height: "100px", backgroundColor: "#fff", marginLeft: 20
                                                }}>
                                                </div>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid container alignItems={"center"} justifyContent={"center"}
                                                      direction={"column"}>
                                                    <Avatar alt="Tele" style={{width: 30, height: 30, marginBottom: 10}}
                                                            src={tele}/>
                                                    <Typography variant={"caption"} gutterBottom
                                                                className={classes.text}>{city.wind.speed}m/s {city.wind.deg} Degree</Typography>
                                                </Grid>

                                            </Grid>
                                            <Grid item xs={1}>
                                                <div style={{
                                                    width: 2, height: "100px", backgroundColor: "#fff", marginLeft: 30
                                                }}>
                                                </div>

                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid container alignItems={"flex-end"} justifyContent={"center"}
                                                      direction={"column"}>
                                                    <Typography variant={"subtitle2"}
                                                                className={classes.text}>Sunrise: {moment(city.sys.sunrise).format('h:mm a')}</Typography>
                                                    <Typography variant={"subtitle2"}
                                                                className={classes.text}>Sunset: {moment(city.sys.sunset).format('h:mm a')}</Typography>
                                                </Grid>

                                            </Grid>

                                        </Grid>
                                    </React.Fragment>
                                    : <div style={{position: "relative", zIndex: 0,}}>
                                        <Backdrop style={{position: "absolute"}} open={true}>
                                            <CircularProgress color="inherit"/>
                                        </Backdrop>
                                    </div>
                            }
                        </Card>
                    </Grid>

                </Grid>
            </main>
        );
    }
}

export default withStyles(styles)(AddCityData)
