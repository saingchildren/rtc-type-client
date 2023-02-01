import React from "react"
import {Socket} from "socket.io-client";
import { createContext } from "use-context-selector"

type User = {
	username: string;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	room: string;
	setRoom: React.Dispatch<React.SetStateAction<string>>;
	socket: Socket | undefined;
}

const Context: User = {
	username: "",
	setUserName: () => {},
	room: "",
	setRoom: () => {},
	socket: undefined 
}

export default createContext<User>(Context)
