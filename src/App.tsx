import { useEffect, useRef, useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import { AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { DOMMessage, DOMMessageResponse, User } from './types'
import styled from 'styled-components'
import Button from './components/button'
import UserCard from './components/userCard'
import { generateId } from './utils/helper'

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
		color: #4c4c4c;
	}
`
const ContentContainer = styled.div<{ isRestoreButtonVisible: boolean; }>`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;  
	.current-participants {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.participants-number {
			width: 28px;
			height: 28px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: .9rem;
			font-weight: bold;
			border-radius: 8px;
			color: #fff;
			background-color: #4477bb;
			border: 1px solid #4477bb;
			.reinitialize-participants {
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				right: 45px;
				top: 6px;
				font-size: 1.2rem;
				color: #3a3a3a;
				cursor: pointer;
				opacity: ${({ isRestoreButtonVisible }) => isRestoreButtonVisible ? 1 : 0};
				visibility: ${({ isRestoreButtonVisible }) => isRestoreButtonVisible ? 'visible' : 'hidden'};
				transition: .2s;

				:hover {
					transform: rotate(120deg);
				}
			}
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
	const initialParticipants: { current?: User[] } = useRef()

	//#region ONMOUNT
	useEffect(
		() => {

			if (chrome) {
				chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
					chrome.tabs.sendMessage(
							tabs[0].id || 0,
							{ type: 'GET_DOM' } as DOMMessage,
							(response: DOMMessageResponse) => {
		
								const participants = response.participants.map(
									(user: string | null, index): User => ({
										id: generateId(index),
										name: user,
										ratio: parseFloat((Math.random() * 2).toFixed(1)),
									})
								)
		
								setHost(response.host)
								setParticipants(participants)
								initialParticipants.current = participants
							}
						)
					})
			} else {
				console.log('You are not using a Chromium based browser.')
			}
		},
		[chrome.tabs],
	)
	//#endregion
	
	//#region EVENTS
	/**
	 * Main function that randomly picks a participant.
	 */
	const newRandomPick = (numberOfParticipants: number) => {

		const rumbledParticipants = participants?.map(
			(participant, index) => ({
				...participant,
				ratio: participant.ratio * (index + 1)
			})
		).sort((a, b) => a.ratio - b.ratio)

		setSelectedUser(rumbledParticipants?.[Math.round(Math.random() * (numberOfParticipants - 1))])
	}

	/**
	 * Function to remove a participant from the list.
	 */
	const removeParticipant = (participantId: string) => (
		setParticipants((prevState) => prevState?.filter((participant) => participant.id !== participantId))
	)
	
	/**
	 * Function to restore initial participants, only triggerable when at least one participant has been removed from the list.
	 */
	const restoreInitialParticipants = () => setParticipants(initialParticipants.current)

	/**
	 * Function to reset the user pick.
	 */
	const resetPick = () => setSelectedUser(undefined)
	//#endregion 

	//#region RENDER
	return (
		<AppContainer>
			<div className='title'> Google Meet Picker </div>
			<ContentContainer
				isRestoreButtonVisible={participants?.length !== initialParticipants.current?.length}
			>
				{host === 'meet.google.com' && participants
					? (
						<>
							<div className='current-participants'>
								<div> Google Meet participants </div>
								<div className='participants-number'>
									{participants.length}
									<div className='reinitialize-participants' onClick={() => restoreInitialParticipants()}>
										<FaSyncAlt />
									</div>
								</div>
							</div>
							<UserCardsContainer>
								{participants.map(
									(participant, index) => (
										<UserCard
											isPicked={selectedUser?.id === participant.id}
											key={index}
											participant={participant.name}
											removeParticipant={() => removeParticipant(participant.id)}
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
							>
								{!!(selectedUser) ? 'Reset your pick' : 'Pick someone'}
							</Button>
						</>
					)
					: (
						<Button href='https://meet.google.com/new'>
							Create a new meeting <AiOutlineVideoCameraAdd />
						</Button>
					)
				}
			</ContentContainer>
		</AppContainer>
	);
	//#endregion
}

export default App
