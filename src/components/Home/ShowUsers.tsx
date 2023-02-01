import React, { useState, useEffect, useRef } from "react"
import Context from "../../contexts/Context"
import { useContextSelector } from "use-context-selector"
import { Container, Row, Col, Button } from "react-bootstrap"
import {Socket} from "socket.io-client"
import ChatBox from "./ChatBox"

type User = {
	id: string;
	username: string;
}

type Msg = {
	receiver: string;
	msg: string;
	sender: string;
	view: boolean;
}

const ShowUsers: React.FC = () => {
	const socket = useContextSelector(Context, item => item.socket)
	const username = useContextSelector(Context, item => item.username)
	const [users, setUsers] = useState<User[]>([])
	const [receiver, setReceiver] = useState<string | boolean>(false)
	const [msgData, setMsgData] = useState<Msg[] | undefined>(undefined)

	const getMsg = () => {
		socket?.on("get_msg", (MsgData: Msg[]) => {
			console.log(MsgData)
			setMsgData(MsgData)
		})
	}

	const getUsers = () => {
		socket?.emit("getUsers");
		socket?.on("users", (users) => {
			setUsers(users)
			console.log(users)
		})
	}

	useEffect(() => {
		getUsers()
		getMsg()
	}, [])

	return !receiver ? (
		<Container
			className="mt-3 text-center justify-content-start"
			style={{ width: "300px" }}
		>
			<Row>
				<Col style={{ fontSize: "2.3rem", color: "green" }}>
					Online User
				</Col>
			</Row>
			{users.map((user) =>
				user.id !== socket?.id ? (
					<Row className="mt-1">
						<Col
							className="d-grid"
							style={{
								background: "#1E1E1E",
								color: "white",
							}}
						>
							<Button
								size="lg"
								onClick={() => {
									setReceiver(user.username);
								}}
							>
								{user.username}
							</Button>
						</Col>
					</Row>
				) : null
			)}
		</Container>
	) : (
		<ChatBox receiver={receiver} setReceiver={setReceiver} msgData={msgData} />
	);
}

export default ShowUsers
