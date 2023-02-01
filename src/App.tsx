import React, { useEffect, useState }  from "react"
import Context from "./contexts/Context"
import io, { Socket } from "socket.io-client"
import Router from "./routers/Router"

const App: React.FC = () => {
	
	document.body.style.backgroundColor = "#1E1E1E"

	const [username, setUserName] = useState<string>("");
	const [room, setRoom] = useState<string>("");
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		setSocket(io("http://localhost:1100"))
	}, [])
	
	return (
		<Context.Provider value={{
			username: username,
			setUserName: setUserName,
			room: room,
			setRoom: setRoom,
			socket: socket
		}}>
			<Router />
		</Context.Provider>
	)
	
}

export default App
