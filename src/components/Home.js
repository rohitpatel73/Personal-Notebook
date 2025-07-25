import React from 'react';
import Notes from './Notes';
const Home = ({ showAlert }) => {
    return (
        <>
            <Notes showAlert={showAlert} />
        </>
    )
}
export default Home;