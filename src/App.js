import React from 'react';
import P5Wrapper from 'react-p5-wrapper'
import testSketch from './testSketch'
import './App.css';

function App() {
    return (
        <>
            <div className={ "container" }>
                <h1>
                    Ressler
                    <br />
                    Attractor
                    <br />
                    Laser
                    <br />
                    Beam
                </h1>
            </div>
            <P5Wrapper sketch={testSketch} />
        </>
    );
}

export default App;
