import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) =>({
    root:{
        flexGrow: 1,
        font: '400 20px Roboto',
        '&:link': {
            textDecoration: 'none',
        }
    },

    fontLink: {
        color: 'white',
    },

    sprites: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        paddingTop: 80,
        paddingLeft: 80
    },

    divSprite:{
        display: 'flex',
        flexDirection: 'column'
    },

    imgPoke: {
        /*display: 'block',*/
        //flex: 1,
        //display: 'flex',
        borderRadius: '4px',
        border: '1px solid #dcdce6',
        width: 70,
        height: 70,
        '&:hover': {
            cursor: "pointer"
        },
    },

    aumentSprite:{
        paddingLeft: 50,
    },

    grandeImg: {
        width: 450,
        height: 450
    },

    
    habilidadesContainer:{
        marginLeft: 50,
        display: 'flex',
        flexDirection: 'column'
    },

    habilidades: {
        marginLeft: 50
    }
}));


export default styles;