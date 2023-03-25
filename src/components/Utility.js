import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const GrabButtonColors= () => {
		const { settings, dispatch } = useContext (AppContext);
		console.log(settings.buttonColors);

		return settings.buttonColors;
};
