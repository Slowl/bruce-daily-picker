
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'
import { isPickedAnimation } from '../../utils/animation'

const UserCardContainer = styled.div<{ isPicked: boolean }>`
	display: flex;
	align-items: baseline;
	position: relative;
	padding: .3rem .5rem;
	border: 2px solid  #4477bb;
	border-radius: 6px;
	font-size: .95rem;
	word-spacing: 1px;
	cursor: default;
	animation: 3s linear 0s infinite normal none running ${({ isPicked }) => isPicked ? isPickedAnimation : ''};
	transition: .2s;

	:hover {
		padding-right: 1.7rem;
		.user-remove {
			opacity: 1;
		}
	}

	.user-picture {
		width: 18px;
		height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .6rem;
		border-radius: 50%;
		border: 1px solid #4bc9f5;
		background-color: #4bc9f5;
		flex-shrink: 0;
		transform: translateY(-2px);
	}

	.user-name {
		margin: 0 7px;
	}

	.user-remove {
		position: absolute;
		right: 5px;
		opacity: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: 3px;
		border-radius: 50%;
		cursor: pointer;
		transform: translateY(1px);
		transition: .2s;

		:hover {
			background-color: #f78383;

		}
	}
`

const UserCard = ({ isPicked, participant, removeParticipant }: {
	isPicked: boolean;
	participant: string | null;
	removeParticipant: () => void;
}) => (
	<UserCardContainer isPicked={isPicked}>
		<div className='user-picture'>
			{participant?.split(' ')?.[0]?.split('')?.[0]}
			{participant?.split(' ')?.[1]?.split('')?.[0]}
		</div>
		<div className='user-name'> {participant} </div>
		<div className='user-remove' onClick={removeParticipant}> <IoCloseOutline /> </div>
	</UserCardContainer>
)

export default UserCard
