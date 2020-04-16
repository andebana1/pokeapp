import React, {useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar, 
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    GridListTileBar, 
    MenuItem, Select, 
    Typography, 
    IconButton, 
    GridList, 
    GridListTile, 
    FormControl,
} from '@material-ui/core';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdExpandMore  } from 'react-icons/md';
import {GoogleLogin, GoogleLogout } from 'react-google-login';
import api from '../../services/api';
import { isAuthenticated, login, logout } from '../../services/auth';
import styles from './styles';

export default function Home() {
    const [personagens, setPersonagens] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [tipo, setTipo] = useState('Pokemon');//mostrar por pokemon ou pelos tipos de animais
    const [open, setOpen] = useState(false);
    const [logged, setLogged] = useState(isAuthenticated());
    const [url, setUrl] = useState('pokemon');
    const [expanded, setExpanded] = React.useState(false);
    const [expandedText, setExpandedText] = React.useState("");


    const classes = styles();

    useEffect(()=>{
        api.get(`${url}`)
            .then(response=>{
                setNext(response.data.next !== null ? response.data.next : "");
                setPrevious(response.data.previous !== null ? response.data.previous : "");
                if(tipo === "Pokemon"){
                    setPersonagens(response.data.results);
                }else{
                    setTipos(response.data.results)
                }
            });
    }, [tipo]);

    const handleChange = (event) => {
        let tipo = event.target.value;
        setTipo(tipo);
        if(tipo === "Pokemon")
            setUrl('pokemon')
        else
            setUrl('type')
        
        setTipo(tipo)

    };

    const handleChangePanel = (panel, url) => (event, isExpanded) => {
        let result = "Pokemons: ";
        setExpanded(isExpanded ? panel : false);
        api.get(url.split('v2')[1])
            .then(response=>{
                response.data.pokemon.forEach(personagem => {
                    console.log(personagem)
                    result += personagem.pokemon.name + ", "
                });

                setExpandedText(result)
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function pokeImg (url) {
        let base = "https://pokeres.bastionbot.org/images/pokemon/";
        let pokemon = url.split('/')
        return base + pokemon[6] + ".png"
    }

    function nextPage () {
        let listStr = next.split('v2');

        try{
            api.get(listStr[1])
                .then(response=>{
                    setNext(response.data.next !== null ? response.data.next : "");
                    setPrevious(response.data.previous !== null ? response.data.previous : "");
                    setPersonagens(response.data.results);
                })
        }catch(errr){
            alert("Erro ao buscar personagens, tente novamente.");
        }
    }

    function previousPage () {
        let listStr = previous.split('v2');

        try{
            api.get(listStr[1])
                .then(response=>{
                    setNext(response.data.next !== null ? response.data.next : "");
                    setPrevious(response.data.previous !== null ? response.data.previous : "");
                    setPersonagens(response.data.results);
                })
        }catch(errr){
            alert("Erro ao buscar personagens, tente novamente.");
        }
    }

    function getUrld (url) {
        let strl = url.split('/');
        return "?id="+strl[6];
    }

    const responseGoogle = response =>{
        login("Bearer " + response.token);
        setLogged(isAuthenticated());
    }

    function logoff(response) {
        logout();
        setLogged(isAuthenticated());
    }
    return (
        <div>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Link className={classes.root}>
                            <Typography variant="h6">
                                Pokemon App
                            </Typography>
                        </Link>
                        {
                            !logged 
                                ? <GoogleLogin
                                        clientId="282250174489-g6d7bm400h2jhla9o6sei9el41r40572.apps.googleusercontent.com"
                                        buttonText="Faça login com Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />

                                 :   <GoogleLogout
                                        clientId="282250174489-g6d7bm400h2jhla9o6sei9el41r40572.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        onLogoutSuccess={logoff}
                                    />
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <Typography variant="h4" color="#fff" className={classes.textEntrada}>
                Veja todos os Pokemons ou todos os tipos
            </Typography>
            <div className={classes.menus}>
                <FormControl >
                    <Select
                        value={tipo}
                        id="select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        className={classes.select}
                        onChange={handleChange}
                    >
                        <MenuItem className={classes.menuitem} value={"Pokemon"}>Pokemon</MenuItem>
                        <MenuItem className={classes.menuitem} value={"Tipo"}>Tipo</MenuItem>
                    </Select>
                </FormControl>
                <Typography className={classes.visualizarpor} variant="h5">Visualizar por: </Typography>
            </div>

                {
                    tipo === "Pokemon"
                        ?   <div className={classes.containerGrid}>
                                <GridList spacing={15} cellHeight={200} cols={4} >
                                    {   
                                        personagens.map((person)=>(
                                            <GridListTile key={person.name} className={classes.gridItem}>
                                                <img src={pokeImg(person.url)} alt={"teste"} />
                                                <GridListTileBar
                                                    title={person.name}
                                                    subtitle={<span>saiba mais sobre o {person.name}</span>}
                                                    actionIcon={
                                                        <Link to={{
                                                            pathname: "/details",
                                                            search: getUrld(person.url),
                                                        }}>
                                                            <IconButton aria-label={`Detalhes sobre ${person.name}`} className={classes.icon}>
                                                                <MdKeyboardArrowRight />
                                                            </IconButton>
                                                        </Link>
                                                    }
                                                />
                                            </GridListTile>
                                    
                                        ))
                                    }
                                    
                                </GridList>
                                <div className={classes.containerBotton}>
                                    {previous !== "" 
                                        ?   <IconButton onClick={previousPage}>
                                                <MdKeyboardArrowLeft />
                                            </IconButton>
                                        : null
                                    }
                                    {next !== "" 
                                        ?   <IconButton onClick={nextPage}>
                                                <MdKeyboardArrowRight />
                                            </IconButton>
                                        : null
                                    }
                                </div>
                            </div>
                    :   <diV className={classes.rootList}>
                            {tipos.map((tipo)=>(
                                <ExpansionPanel expanded={expanded === `panel${tipo.name}`} onChange={handleChangePanel(`panel${tipo.name}`, tipo.url)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<MdExpandMore />}
                                            aria-controls="panel1bh-content"
                                            id={`panel${tipo.name}-header`}
                                        >
                                            <Typography className={classes.heading} >{tipo.name}</Typography>
                                            <Typography className={classes.secondaryHeading} >Expanda para saber mais</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                {expandedText}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                </ExpansionPanel>
                            ))  
                        }                          
                    </diV>
                }
        </div>
    );
}

/*
*/
