import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) =>({
    root:{
        flexGrow: 1,
        color: 'white',
        font: '400 20px Roboto',
        '&:link': {
            textDecoration: 'none',
        }
    },
    textEntrada: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 50px 50px 50px',
    },

    visualizarpor: {
        paddingRight: 15
    },

    menus:{
        display: 'flex',
        flexDirection: 'row-reverse',
    },

    select:{ 
        marginRight: 300,
        width: '240px',
        font: '400 20px Roboto, sans-serif',
    },

    menuitem:{
        font: '400 14px Roboto, sans-serif',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },

    containerGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        maxWidth: '1180px',
        padding: '25px 50px 75px 100px',
        margin: '32px auto',
    },

    gridItem: {
        borderRadius: '4px',
        border: '1px solid #dcdce6',
    },

    
    icon: {
        color: 'rgba(255, 255, 255, 1.0)',
    },

    containerBotton: {
        width: '100%',
        maxWidth: '1180px',
        paddingTop: '50px',//'0px 50px 75px 0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    rootList: {
        justifyContent: 'space-around',
        //backgroundColor: theme.palette.background.paper,
        width: '100%',
        maxWidth: '1180px',
        padding: '25px 50px 75px 100px',
        margin: '32px auto',
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },

      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


export default styles;