import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ActivityIndicator} from './../components/ActivityIndicator'; // Importando seu componente de carregamento
import loadingImage from '../assets/img/desenholivro.png'; // Importando a imagem corretamente

const Splash: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(async () => {
            navigate('/login'); // Navegar para a tela de login
        }, 2000); // Tempo de processamento do splash screen

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="image-container">
                <img
                    src={loadingImage} // Usando a imagem importada
                    alt="Loading"
                    className="w-[160px] h-[160px] mb-5"
                />
            </div>
            <div className="flex flex-row items-center mt-2">
                <span className="text-black font-bold uppercase italic mr-2">Loading</span>
                <ActivityIndicator size="40px" color="red"/> {/* Usando o seu componente aqui */}
            </div>
            <h1 className="font-custom text-[50px] mt-5 text-black uppercase text-center">
                Coleção Stephen King
            </h1>
        </div>
    );
};

export default Splash;
