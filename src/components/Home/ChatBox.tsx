import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import Context from "../../contexts/Context"
import { useContextSelector } from "use-context-selector"
import { Container, Alert, Form } from "react-bootstrap"
import {Socket} from "socket.io-client"

type Receiver = {
	receiver: string | boolean;
	setReceiver: React.Dispatch<React.SetStateAction<string | boolean>>;
	msgData: Msg[] | undefined
}

type Msg = {
	receiver: string;
	sender: string;
	msg: string;
	view: boolean;
}

const ChatBox: React.FC<Receiver> = ({ receiver, setReceiver, msgData }) => {

	const socket = useContextSelector(Context, item => item.socket)
	const username = useContextSelector(Context, item => item.username)

	const sendMessage = (e: any) => {
		e.preventDefault()
		if (message) {
			socket?.emit("send_msg", { receiver, message })
			setMessage("")
		}
	}

	const [message, setMessage] = useState("")

	return (
		<Container fluid="md">
            <Alert
                variant="light"
                style={{ height: "500px" }}
                onClose={() => setReceiver(false)}
                dismissible
            >
                <Alert.Heading className="text-center">
                    {receiver}
                </Alert.Heading>
                <hr />
                <Container style={{ overflowY: "scroll", height: "85%" }}>
					{msgData?.map((item) => {
						if (item?.sender === username) {
							return <h1>{item.msg}</h1>
						} else {
							return <h2>{item.msg}</h2>
						}
					})}
                </Container>
            </Alert>
            <Form onSubmit={sendMessage}>
                <Form.Control
                    type="text"
                    placeholder={`text your message to ${receiver}`}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                ></Form.Control>
            </Form>
        </Container>	
	)
}

export default ChatBox
