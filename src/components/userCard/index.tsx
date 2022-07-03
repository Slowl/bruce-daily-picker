
import styled from 'styled-components'

const UserCardContainer = styled.div<{ isPicked: boolean }>`
	border: 2px solid  #4477bb;
	border-radius: 6px;
	display: flex;
	align-items: baseline;
	padding: .3rem .5rem;
	font-size: .95rem;
	word-spacing: 1px;
	animation: 3s linear 0s infinite normal none running ${({ isPicked }) => isPicked ? 'IsPicked' : ''};

	.user-picture {
		width: 18px;
		height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .6rem;
		border-radius: 50%;
		margin-right: 10px;
		border: 1px solid #4bc9f5;
		background-color: #4bc9f5;
		flex-shrink: 0;
	}

	@keyframes IsPicked {
		0% {
			transform: translateX(3px) rotate(1deg);
			border: 2px solid  #f77070;
		}
		2.5% {
			transform: translateX(-3px) rotate(-1deg);
			border: 2px solid  #f77070;

		}
		5% {
			transform: translateX(3px) rotate(1deg);
			border: 2px solid  #f77070;

		}
		7.5% {
			transform: translateX(-3px) rotate(-1deg);
			border: 2px solid  #f77070;
		}
		10% {
			transform: translateX(2px) rotate(1deg);
			border: 2px solid  #f77070;
		}
		12.5% {
			transform: translateX(-2px) rotate(-1deg);
			border: 2px solid  #f77070;
		}
		15% {
			transform: translateX(2px) rotate(1deg);
			border: 2px solid  #f77070;
		}
		17.5% {
			transform: translateX(-2px) rotate(-1deg);
			border: 2px solid  #f77070;
		}
		20% {
			transform: translateX(1px) rotate(1deg);
			border: 2px solid  #f77070;
		}
		22.5% {
			transform: translateX(-1px) rotate(-1deg);
			border: 2px solid  #f77070;
		}
		25% {
			transform: translateX(0px) rotate(0deg);
			border: 2px solid  #f77070;
		}
	}
`

const UserCard = ({ isPicked, participant }: { isPicked: boolean; participant: string | null; }) => (
	<UserCardContainer isPicked={isPicked}>
		<div className='user-picture'>
			{participant?.split(' ')[0].split('')[0]}
			{participant?.split(' ')[1].split('')[0]}
		</div>
		<div className='user-name'> {participant} </div>
	</UserCardContainer>
)

export default UserCard
