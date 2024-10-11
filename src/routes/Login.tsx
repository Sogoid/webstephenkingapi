import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from './../services/AuthService';
import loginImage from './../assets/img/fundologin.jpeg'; // Importando a imagem

const Login: React.FC = () => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassWord] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
    const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

    const navigate = useNavigate();

    const clearInputs = (): void => {
        setUserName('');
        setPassWord('');
    };

    const handleLogin = async (): Promise<void> => {
        try {
            console.log(`Tentando login com usuário: ${username} e senha: ${password}`);
            await login(username, password); // Removendo a atribuição de 'user' se não for usada
            clearInputs(); // Limpa os inputs
            navigate('/Home'); // Navegar para o Dashboard
        } catch (e) {
            console.log(`Erro ao fazer login: ${e}`);
            setError('Usuário ou senha inválido.');
            setModalVisible(true); // Abre o modal em caso de erro
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen relative">
            <img src={loginImage} alt="Fundo de login"
                 className="absolute inset-0 object-cover w-full h-full opacity-50"/>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-10">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
                {modalVisible && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow">
                            {error && <p className="text-red-600">{error}</p>}
                            <button onClick={() => setModalVisible(false)}
                                    className="bg-red-500 text-white p-2 rounded mt-4">
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
                <div className="relative mb-6">
                    <label
                        className={`font-custom absolute left-2 transition-transform duration-200 transform uppercase ${username || usernameFocused ? 'font-custom -translate-y-3 scale-75 text-gray-600 -left-1 bg-white' : 'translate-y-0 scale-100 text-gray-400'}`}
                    >
                        Usuário
                    </label>
                    <input
                        className={`w-full border-2 rounded-md p-2 transition-all duration-200 focus:outline-none focus:border-indigo-600 ${username ? 'font-custom border-indigo-600' : 'border-gray-300'}`}
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        onFocus={() => setUsernameFocused(true)} // Define o foco ao clicar
                        onBlur={() => setUsernameFocused(false)} // Remove o foco ao sair
                    />
                </div>
                <div className="relative mb-6">
                    <label
                        className={`absolute left-2 transition-transform duration-200 transform font-custom uppercase ${password || passwordFocused ? 'font-custom -translate-y-3 scale-75 text-gray-600 -left-1 bg-white' : 'translate-y-0 scale-100 text-gray-400'}`}
                    >
                        Password
                    </label>
                    <input
                        className={`w-full border-2 rounded-md p-2 transition-all duration-200 focus:outline-none focus:border-indigo-600 ${password ? 'border-indigo-600' : 'border-gray-300'}`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassWord(e.target.value)}
                        onFocus={() => setPasswordFocused(true)} // Define o foco ao clicar
                        onBlur={() => setPasswordFocused(false)} // Remove o foco ao sair
                    />
                </div>
                <button onClick={handleLogin} className="w-full bg-red-500 text-white p-2 rounded">Login</button>
                <p className="mt-4 text-center text-indigo-600 cursor-pointer">Esqueceu sua senha?</p>
            </div>
        </div>
    );
};

export default Login;
