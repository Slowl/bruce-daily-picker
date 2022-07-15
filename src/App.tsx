import { useEffect, useState } from 'react'
import { DOMMessage, DOMMessageResponse, User } from './types'
import styled from 'styled-components'
import Button from './components/button'
import UserCard from './components/userCard'

//#region STYLE
const AppContainer = styled.div`
	width: 550px;
	background-color: white;
	border: 2px solid #f2f2f2;
	position: relative;
	.title {
		font-size: 1.4rem;
		font-weight: bold;
		padding: .5rem .5rem .8rem;
		text-align: center;
		background-color: #f2f2f2;
	}
`
const ContentContainer = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;  
	a {
		color: blue;
	}
	.current-participants {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.participants-number {
			width: 28px;
			height: 28px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: .9rem;
			font-weight: bold;
			border-radius: 8px;
			color: #fff;
			background-color: #4477bb;
			border: 1px solid #4477bb;
		}
	}
`
const UserCardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 2rem 0 3rem;
	gap: 1rem;
`
//#endregion

const App = () => {

	const [host, setHost] = useState('')
	const [participants, setParticipants] = useState<User[]>()
	const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)

	useEffect(
		() => {
			chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(
					tabs[0].id || 0,
					{ type: 'GET_DOM' } as DOMMessage,
					(response: DOMMessageResponse) => {
						setHost(response.host)
						setParticipants(response.participants.map(
							(user: string | null, index): User => ({
								id: `${Math.random().toString(36).slice(2, 6)}_${(Date.now() + ((index + 1) * (Math.round(Math.random() * 1000)))).toString(36).slice(4, 10)}`,
								name: user,
								ratio: parseFloat((Math.random() * 2).toFixed(1)),
							})
						))
					}
				)
			})
		},
		[chrome.tabs],
	)

	const newRandomPick = (numberOfParticipants: number) => {

		const rumbledParticipants = participants?.map(
			(participant, index) => ({
				...participant,
				ratio: participant.ratio * (index + 1)
			})
		).sort((a, b) => a.ratio - b.ratio)

		setSelectedUser(rumbledParticipants?.[Math.round(Math.random() * (numberOfParticipants - 1))])

	}

	const resetPick = () => setSelectedUser(undefined)

	//#region RENDER
	return (
		<AppContainer>
			<div className='title'> Google Meet Picker </div>
			<ContentContainer>
				{host === 'meet.google.com' && participants
					? (
						<>
							<div className='current-participants'>
								<div> Google Meet participants </div>
								<div className='participants-number'> {participants.length} </div>
							</div>
							<UserCardsContainer>
								{participants.map(
									(participant, index) => (
										<UserCard
											isPicked={selectedUser?.id === participant.id}
											key={index}
											participant={participant.name}
										/>
									)
								)}
							</UserCardsContainer>

							<Button
								isResetable={!!(selectedUser)}
								onClickAction={{
									reset: () => resetPick(),
									randomize: () => newRandomPick(participants.length)
								}}
							/>
						</>
					)
					: (
						<div> <a href='https://youtu.be/dQw4w9WgXcQ' target='__blank'> You're are not supposed to open this extension outside of Google Meet 🤔 </a> </div>
					)
				}
			</ContentContainer>
		</AppContainer>
	);
	//#endregion
}

export default App
