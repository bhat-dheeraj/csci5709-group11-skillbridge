import { useEffect, useState } from "react"
import MessageContainer from "../../components/messages/MessageContainer"
import { Box, Card, Grid, Paper, TextField, Typography } from "@mui/material";
import { ConversationModel } from "../../models/message.model";
import { getConversations } from "./Messages";

const MessageDashboard: React.FC = () => {
	const [currentRecieverId, setCurrentRecieverId] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [conversations, setConversations] = useState<ConversationModel[]>([])

	useEffect(() => {
		getConversations().then(newConversations => {
			setConversations(newConversations)
		}).catch(error => console.error("Unable to get conversations", error))
	}, []);


	const handleSearchChange = (searchTerm: string) => {
		setSearchTerm(searchTerm)
	}

	const handleConversationChange = (recieverId: string) => {
		setCurrentRecieverId(recieverId)
	}


	const filteredConversations = conversations.filter(conversation => conversation.recieverName.toLowerCase().includes(searchTerm.toLowerCase()))

	return (
		<>
			<Paper sx={{ minHeight: 600 }}>
				<Grid container>
					<Grid item xs={4}>
						<Box sx={{ height: "100%", width: "100%" }}>
							<Grid container>
								<Grid item xs={12}>
									<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5px", padding: "10px" }}>
										<TextField label="Search conversations" variant="outlined" fullWidth value={searchTerm} onChange={e => handleSearchChange(e.target.value)} />
									</Box>
								</Grid>
								<Grid item xs={12}>
									{filteredConversations && filteredConversations.map(conversation => (
										<Card sx={{ display: "flex", justifyContent: "left", margin: "5px", padding: "10px" }} key={conversation.receiverId} onClick={() => handleConversationChange(conversation.receiverId)} >
											<Typography variant="h5">{conversation.recieverName}</Typography>
										</Card>
									))}
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={8}>
						<Box >
							{currentRecieverId.length !== 0 &&
								<MessageContainer recieverId={currentRecieverId} />
							}
						</Box>
					</Grid>
				</Grid>
			</Paper >
		</>
	)
}

export default MessageDashboard