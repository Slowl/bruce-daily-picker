
import styled from 'styled-components'

const ButtonContainer = styled.div<{ isDisabled: boolean }>`
	width: 35%;
	padding: .25rem .4rem .35rem;
	margin: auto;
	text-align: center;
	font-weight: bold;
	letter-spacing: 1px;
	font-size: .9rem;
	border: 2px solid ${({ isDisabled }) => isDisabled ? '#eeeeee' : '#4477bb'};
	border-radius: 10px;
	color: ${({ isDisabled }) => isDisabled ? 'grey' : '#fff'};
	background-color: ${({ isDisabled }) => isDisabled ? '#eeeeee' : '#4477bb'};
	cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
	transition: .3s;

	:hover {
		background-color: ${({ isDisabled }) => isDisabled ? '#eeeeee' : '#5c8dcf'};
		border: 2px solid ${({ isDisabled }) => isDisabled ? '#eeeeee' : '#5c8dcf'};
	}
`

const Button = ({ isDisabled, onClickAction }: { isDisabled: boolean; onClickAction: () => void; }) => (
	<ButtonContainer
		onClick={(event) => isDisabled ? event.preventDefault() : onClickAction()}
		isDisabled={isDisabled}
	>
		Pick someone
	</ButtonContainer>
)

export default Button
