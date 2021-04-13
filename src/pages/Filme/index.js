import './styles.css';
import {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Filme(){

const { id } = useParams();
const history = useHistory();
const [filme,setFilme] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
    async function loadFilme(){
        const response =  await api.get(`/r-api/?api=filmes/${id}`);

        if(response.data.length === 0){
            history.replace('/');
            return;
        }

        setFilme(response.data);
        setLoading(false);
    }
    loadFilme();




},[id,history]);

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando seu filme</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} />
            <h3>Sinopse</h3>
            {filme.sinopse}
        </div>
    );
}