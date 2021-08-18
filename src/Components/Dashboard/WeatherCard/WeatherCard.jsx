import React, {Component} from "react";
import {
    Avatar,
    Backdrop,
    Card,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    Typography
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import CloudIcon from '@material-ui/icons/Cloud';
import axios from "axios";
import moment from "moment";
import logo from "../../../Assests/Images/logo.png";
import bg1 from "../../../Assests/Images/bg1.jpg";
import bg2 from "../../../Assests/Images/bg2.jpg";
import bg3 from "../../../Assests/Images/bg3.jpg";
import bg4 from "../../../Assests/Images/bg4.jpg";
import bg5 from "../../../Assests/Images/bg5.jpg";
import tele from "../../../Assests/Images/tele.png";

const styles = (theme) => ({
    text: {
        color: "#fff"
    },
});


class WeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityDetails: null
        }

    }

    componentDidMount() {
        console.log(this.props.city)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${this.props.city}&appid=21c57da09ac5515cb2df5e5ff75875c6`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    cityDetails: res.data
                })
            }).catch(err => {
            console.log(err)
        })
    }

    getImage = (count) => {
        if (count === 1 || count === 6) {
            return bg1
        } else if (count === 2 || count === 7) {
            return bg2
        } else if (count === 3 || count === 8) {
            return bg3
        } else if (count === 4) {
            return bg4
        } else if (count === 5) {
            return bg5
        }
    }

    render() {
        const {classes} = this.props;
        const city = this.state.cityDetails;
        return (
            <Grid item xs={12} sm={12} md={6} container>
                <Card style={{width: "100%", backgroundColor: "#30333d"}}>
                    {
                        city
                            ? <React.Fragment>
                                <Grid container alignItems={"center"} justifyContent={"center"}
                                      style={{
                                          backgroundImage: `url(${this.getImage(this.props.count)})`,
                                          backgroundPosition: "center",
                                          backgroundSize: "revert",
                                          padding: "10px 0px 30px 0px"
                                      }}
                                >
                                    <Grid item xs={12}>
                                        <Grid container justifyContent={"flex-end"}>
                                            <IconButton style={{marginRight: 6, color: "#fff"}} aria-label="delete"
                                                        size="small">
                                                <CloseIcon fontSize="small"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                            <Grid container alignItems={"center"}
                                                  justifyContent={"center"}>
                                                <Avatar style={{marginRight: 20}} alt="Logo" src={logo}/>
                                                <Typography
                                                    variant={"subtitle1"}
                                                    className={classes.text}
                                                >
                                                    {city.weather[0].description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
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
                                            width: 2, height: "100px", backgroundColor: "#fff", marginLeft : 20
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
                                            width: 2, height: "100px", backgroundColor: "#fff", marginLeft : 20
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
        );
    }

}

export default withStyles(styles)(WeatherCard)
