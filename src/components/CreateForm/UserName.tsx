import React from "react"
import { Form, FloatingLabel } from "react-bootstrap"
import { useContextSelector } from "use-context-selector"
import Context from "../../contexts/Context"

const UserName: React.FC = () => {
	
	const username = useContextSelector(Context, item => item.username)
	const setUserName = useContextSelector(Context, item => item.setUserName)

	return (
		<FloatingLabel label="UserName">
			<Form.Control
				type="text"
				value={username}
				onChange={(e) => { setUserName(e.target.value) }} />
		</FloatingLabel>
	)
}


export default UserName
