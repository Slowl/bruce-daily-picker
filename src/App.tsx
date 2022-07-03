import { useEffect, useState } from 'react'
import { DOMMessage, DOMMessageResponse } from './types'
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
	const [participants, setParticipants] = useState<(string | null)[]>([])
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	useEffect(
		() => {
			chrome.tabs && chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
			chrome.tabs.sendMessage(
					tabs[0].id || 0,
					{ type: 'GET_DOM' } as DOMMessage,
					(response: DOMMessageResponse) => {
						setHost(response.host)
						setParticipants(response.participants)
					}
				)
			})
		},
		[chrome.tabs],
	)

	const randomPick = (numberOfParticipants: number) => setSelectedIndex(Math.round(Math.random() * (numberOfParticipants - 1)))

	//#region RENDER
	return (
		<AppContainer>
			<div className='title'> Google Meet Picker </div>
			<ContentContainer>
				{host === 'meet.google.com'
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
											isPicked={selectedIndex === index}
											key={index}
											participant={participant}
										/>
									)
								)}
							</UserCardsContainer>

							<Button
								isDisabled={selectedIndex !== null}
								onClickAction={() => randomPick(participants.length)}
							/>
						</>
					)
					: (
						<div> <a href='https://youtu.be/dQw4w9WgXcQ' target='__blank'> Oh hi there ! Come, click on me :) </a> </div>
					)
				}
			</ContentContainer>
		</AppContainer>
	);
	//#endregion
}

export default App
