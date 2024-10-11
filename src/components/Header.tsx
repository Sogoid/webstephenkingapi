import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-center items-center gap-6 w-full mt-5">
            <h1 className="font-custom text-7xl text-center uppercase">Coleção Stephen King</h1>
            <img className="w-20" src="/src/assets/img/desenholivro.png" alt="Logo"/>
        </header>
    );
};

export default Header;
