import React, { useCallback } from 'react';
import { useApplicationContext } from '../../context/ApplicationContext';
import './FiltersView.css';

const FiltersView = () => {
    var applicationsState = useApplicationContext();

    const spendingFilterChanged = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            var spendingFilter = Number(e.currentTarget.value);
            if (spendingFilter !== applicationsState?.spendingFilter) {
                applicationsState?.onSpendingFilterChanged(spendingFilter);
            }
        },
        [applicationsState]
    );

    return (
        <div className="filters-view">
            <div>Spending</div>

            <input
                className="spending-range"
                type="range"
                value={applicationsState?.spendingFilter}
                min={applicationsState?.spendingFilterRange.min}
                max={applicationsState?.spendingFilterRange.max}
                onChange={spendingFilterChanged}
            />
            <div className="spending-range-values">
                <div>{applicationsState?.spendingFilterRange.min}</div>
                <div>{applicationsState?.spendingFilterRange.max}</div>
            </div>
        </div>
    );
};

export default FiltersView;
