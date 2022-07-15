
import styled from 'styled-components'

const ButtonContainer = styled.div<{ isResetable: boolean }>`
	width: 35%;
	padding: .25rem .4rem .35rem;
	margin: auto;
	text-align: center;
	font-weight: bold;
	letter-spacing: 1px;
	font-size: .9rem;
	border: 2px solid ${({ isResetable }) => isResetable ? '#f77070' : '#4477bb'};
	border-radius: 10px;
	color: #fff;
	background-color: ${({ isResetable }) => isResetable ? '#f77070' : '#4477bb'};
	cursor: pointer;
	transition: .3s;
	user-select: none;

	:hover {
		background-color: ${({ isResetable }) => isResetable ? '#f77070' : '#5c8dcf'};
		border: 2px solid ${({ isResetable }) => isResetable ? '#f77070' : '#5c8dcf'};
	}
`

const Button = ({ isResetable, onClickAction }: { isResetable: boolean; onClickAction: { reset: () => void; randomize: () => void } }) => (
	<ButtonContainer
		onClick={() => isResetable ? onClickAction.reset() : onClickAction.randomize()}
		isResetable={isResetable}
	>
		{isResetable ? 'Reset your pick' : 'Pick someone'}
	</ButtonContainer>
)

export default Button
