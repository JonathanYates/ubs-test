import React from 'react';
import Layout from './components/Layout/Layout';
import { ApplicationsProvider } from './context/ApplicationContext';

function App() {
    return (
        <ApplicationsProvider>
            <Layout />
        </ApplicationsProvider>
    );
}

export default App;
