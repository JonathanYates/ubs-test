import React, { useCallback, useEffect, useState } from 'react';
import { Application } from '../models/ApplicationModels';
import ApplicationService from '../services/ApplicationService';

interface FilterRange {
    min: number;
    max: number;
}

interface ApplicationContextState {
    selectedBusinessCapability: string | undefined;
    selectedApplications: Application[];
    onSelectedBusinessCapabilityChanged: (businessCapability: string) => void;
    spendingFilterRange: FilterRange;
    spendingFilter: number;
    onSpendingFilterChanged: (spendingFilter: number) => void;
}

const ApplicationContext = React.createContext<
    ApplicationContextState | undefined
>(undefined);

interface CountProviderProps {
    children: React.ReactNode;
}

const ApplicationsProvider = ({ children }: CountProviderProps) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedApplications, setSelectedApplications] = useState<
        Application[]
    >([]);
    const [selectedBusinessCapability, setSelectedBusinessCapability] =
        useState<string | undefined>(undefined);
    const [spendingFilterRange, setSpendingFilterRange] = useState<FilterRange>(
        { min: 0, max: 0 }
    );
    const [spendingFilter, setSpendingFilter] = useState<number>(0);

    useEffect(() => {
        (async () => {
            var apps = await ApplicationService.getApplicationData();
            setApplications(apps);
            var spending = apps.map((app) => app.spend);
            var range = {
                min: Math.min(...spending),
                max: Math.max(...spending),
            };
            setSpendingFilterRange(range);
            setSpendingFilter(range.max);
        })();
    }, [setApplications, setSpendingFilterRange, setSpendingFilter]);

    useEffect(() => {
        setSelectedApplications(
            applications.filter((application) => {
                return (
                    (application.BCAP1 === selectedBusinessCapability ||
                        application.BCAP2 === selectedBusinessCapability ||
                        application.BCAP3 === selectedBusinessCapability) &&
                    application.spend <= spendingFilter
                );
            })
        );
    }, [applications, selectedBusinessCapability, spendingFilter]);

    const onSelectedBusinessCapabilityChanged = useCallback(
        (businessCapability: string) => {
            setSelectedBusinessCapability(businessCapability);
        },
        []
    );

    const onSpendingFilterChanged = useCallback(
        (value: number) => {
            setSpendingFilter(value);
        },
        [setSpendingFilter]
    );

    return (
        <ApplicationContext.Provider
            value={{
                selectedBusinessCapability,
                selectedApplications,
                onSelectedBusinessCapabilityChanged,
                spendingFilterRange,
                spendingFilter,
                onSpendingFilterChanged,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

const useApplicationContext = () => React.useContext(ApplicationContext);

export { ApplicationsProvider, useApplicationContext };
