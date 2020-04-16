import React, {useState ,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography, 
} from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import api from '../../services/api';
import { isAuthenticated, logout } from '../../services/auth';
import styles from './styles';

export default function Details() {

    const defaulImg = "https://i.pinimg.com/originals/46/8f/78/468f7826c935091acfb33c303733a0e5.png";
    const [logged, setLogged] = useState(isAuthenticated());
    const [poke, setPoke] = useState({})
    const [habli, setHabili] = useState([])
    const [elements, setElements] = useState([])
    const [peso, setPeso] = useState(null)
    const [defimg, setDefimg] = useState("https://upload.wikimedia.org/wikipedia/commons/1/12/White_background.png")

    const classes = styles();
    const history = useHistory();

    useEffect(()=>{
        let pokeid = history.location.search.split('=')[1];
        api.get(`pokemon/${pokeid}`)
            .then(response=>{
                setPoke(response.data.sprites);
                setHabili(response.data.abilities);
                setElements(response.data.types);
                setPeso(response.data.weight);
                console.log(response.data.types);
            });
    }, []);

    function logoff(response) {
        logout();
        history.push("/");
        setLogged(isAuthenticated());
    }

    return (
        <div className={classes.root}>
            <div>
            <AppBar position="static">
                    <Toolbar>
                        <Link to="/" className={classes.root}>
                            <Typography variant="h6" className={classes.fontLink}>
                                Pokemon App
                            </Typography> 
                        </Link>
                    
                        <GoogleLogout
                            clientId="282250174489-g6d7bm400h2jhla9o6sei9el41r40572.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={logoff}
                        />
                        
                    </Toolbar>
                </AppBar>
                <div className={classes.sprites}>
                    <div className={classes.divSprite}>
                        <img className={classes.imgPoke} 
                            src={poke.back_default !== null ? poke.back_default : defaulImg} 
                            onClick={()=>setDefimg(poke.back_default !== null ? poke.back_default : defaulImg)} 
                        />
                        <img className={classes.imgPoke} 
                            src={poke.back_female !== null ? poke.back_female : defaulImg} 
                            onClick={()=>setDefimg(poke.back_female !== null ? poke.back_female : defaulImg)}    
                        />
                        <img className={classes.imgPoke} 
                            src={poke.back_shiny !== null ? poke.back_shiny : defaulImg} 
                            onClick={()=>setDefimg(poke.back_shiny !== null ? poke.back_shiny : defaulImg)}    
                        />
                        <img className={classes.imgPoke} 
                            src={poke.back_shiny_female !== null ? poke.back_shiny_female : defaulImg} 
                            onClick={()=>setDefimg(poke.back_shiny_female !== null ? poke.back_shiny_female : defaulImg)}    
                        />
                        <img className={classes.imgPoke} 
                            src={poke.front_default !== null ? poke.front_default : defaulImg}
                            onClick={()=>setDefimg(poke.front_default !== null ? poke.front_default : defaulImg)}    
                        />
                        <img className={classes.imgPoke} 
                            src={poke.front_female !== null ? poke.front_female : defaulImg} 
                            onClick={()=>setDefimg(poke.front_female !== null ? poke.front_female : defaulImg)}    
                        />
                        <img className={classes.imgPoke} 
                            src={poke.front_shiny !== null ? poke.front_shiny : defaulImg} 
                            onClick={()=>setDefimg(poke.front_shiny !== null ? poke.front_shiny : defaulImg)}
                        />
                        <img className={classes.imgPoke} 
                            src={poke.front_shiny_female !== null ? poke.front_shiny_female : defaulImg} 
                            onClick={()=>setDefimg(poke.front_shiny_female !== null ? poke.front_shiny_female : defaulImg)}
                        />
                    </div>
                    <div className={classes.aumentSprite}>
                        <img className={classes.grandeImg} src={defimg} />
                    </div>

                    <div className={classes.habilidadesContainer}>
                        <Typography variant="h5">Habilidades deste pokemon:</Typography>
                        {
                            habli.map((habilidade)=>(
                                <span className={classes.habilidades}>{habilidade.ability.name}</span>
                            ))
                        }
                        <Typography variant="h5">{"Elemento(s)"}:</Typography>
                        {
                            elements.map((element)=>(
                                <span className={classes.habilidades}>{element.type.name}</span>
                            ))
                        }

                        <Typography variant="h5">{"Peso (em libras)"}:</Typography>

                        <span className={classes.habilidades}>{peso}</span>

                    </div>
                </div>
            </div>
        </div>
    );
}