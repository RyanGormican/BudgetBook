import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
export const GrabButtonColors= () => {
	const {settings} = useContext (AppContext);
	return settings.buttonColors;
};
