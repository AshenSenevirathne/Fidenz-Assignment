import React from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    addCitySection: {
        marginBottom: 50,
    },
    textField: {
        color: "#fff"
    },
    input: {
        backgroundColor: "#1f2128",
        color: "#fff",
    },
    label: {
        color: '#868181'
    },
}));

function AddCity(props) {

    const history = useHistory();
    const classes = useStyles();

    const [city, setCity] = React.useState("");

    const onCityChange = (e) => {
        setCity(e.target.value);
    }

    const onCityAdd = () => {
        if (city === "") {
            alert("Please enter city name!");
        } else {
            history.push(`/addcity/${city}`)
        }
    }


    return <Grid className={classes.addCitySection} container alignItems={"center"} justifyContent={"center"}>
        <TextField
            id="city"
            label="Enter a city"
            size={"small"}
            variant={"outlined"}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
                className: classes.label
            }}
            InputProps={{
                className: classes.input,
            }}
            value={city}
            onChange={(e) => onCityChange(e)}
        />
        <Button style={{marginTop: "5px", marginLeft: "-3px"}} color={"primary"} variant={"contained"}
                onClick={() => onCityAdd()}>Add
            City</Button>
    </Grid>
}

export default AddCity