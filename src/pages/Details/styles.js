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
        width: '100%',
        display: 'flex',
        flexWrap :"wrap",
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        paddingTop: 80,
        paddingLeft: 80,
    },

    divSprite:{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 30
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
        marginRight: 'auto',
        paddingLeft: 50,
    },

    grandeImg: {
        width: '70vh',
        height: '70vh'
    },

    
    habilidadesContainer:{
        marginLeft: 50,
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },

    habilidades: {
        marginLeft: 50,
        marginRight: 'auto'
    }
}));


export default styles;