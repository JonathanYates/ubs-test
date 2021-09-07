import React from 'react';
import { BusinessCapabilitiesTree } from '../../models/BusinessCapabilitiesTree';
import ApplicationsView from '../Applications/ApplicationsView';
import FiltersView from '../Filters/FiltersView';
import TreeView from '../TreeView/TreeView';
import './Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <div className="side-layout">
                <div>
                    <div className="header">Navigation</div>
                    <TreeView node={BusinessCapabilitiesTree} isRoot={true} />
                </div>
                <div className="splitter" />
                <div>
                    <div className="header">Filters</div>
                    <FiltersView />
                </div>
            </div>
            <div>
                <ApplicationsView />
            </div>
        </div>
    );
};

export default Layout;
