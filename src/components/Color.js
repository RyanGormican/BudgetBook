import React, {useContext} from "react";
import {AppContext} from "../context/AppContext";

export const GetButtonColors = () => {
	const { settings } = useContext(AppContext);

	return settings.buttonColors;
};