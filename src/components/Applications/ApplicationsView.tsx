import React from 'react';
import { useApplicationContext } from '../../context/ApplicationContext';
import { Application } from '../../models/ApplicationModels';
import './ApplicationsView.css';

interface ApplicationViewProps {
    application: Application;
}

const ApplicationView = ({ application }: ApplicationViewProps) => {
    return (
        <div className="application">
            <div> {application.name}</div>
            <div>Total spend ${application.spend}</div>
        </div>
    );
};

const ApplicationsView = () => {
    const applicationsState = useApplicationContext();

    return (
        <div className="applications-view">
            <div className="header">
                {applicationsState?.selectedBusinessCapability}
            </div>
            <div className="applications">
                {applicationsState?.selectedApplications.map((application) => (
                    <ApplicationView
                        key={application.name}
                        application={application}
                    />
                ))}
            </div>
        </div>
    );
};

export default ApplicationsView;
