import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { GrabButtonColors, GrabTextColors } from './Utility';

const Settings = () => {
    const { settings, dispatch } = useContext(AppContext);
    const [decimalPrecision, setDecimalPrecision] = useState(settings.decimalPrecision);
    const buttonStyle = { backgroundColor: settings.buttonColor, color: settings.textColor };

    const updateSettings = () => {
        const setting = {
            ...settings,
            decimalPrecision: parseInt(decimalPrecision),
        };
        dispatch({
            type: 'UPDATE_SETTINGS',
            payload: setting
        });
    };

    useEffect(() => {
        updateSettings();
    }, [decimalPrecision]);

    const handleImportData = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const importedSettings = JSON.parse(e.target.result);
                setDecimalPrecision(importedSettings.decimalPrecision);
                alert('Settings imported successfully!');
            } catch (error) {
                alert('Error importing settings! Please ensure the file is valid JSON.');
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className='row'>
            <div className='col-sm'>
                <label htmlFor='decimalPrecision'> Decimal Precision </label>
                <input
                    required='required'
                    type='number'
                    className='form-control'
                    id='decimalPrecision'
                    value={decimalPrecision}
                    min="1"
                    max="15"
                    onChange={(event) => setDecimalPrecision(event.target.value)}
                />
                <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    style={{ display: 'none' }}
                    id="importSettingsInput"
                />
                <label htmlFor="importSettingsInput">
                    <button className="btn" style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}>
                        Import Settings
                    </button>
                </label>
            </div>
        </div>
    );
};
export default Settings;
