
import styled from 'styled-components'

const ButtonContainer = styled.a<{ isResetable?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 35%;
	padding: .25rem .8rem .35rem;
	margin: auto;
	text-align: center;
	font-weight: bold;
	letter-spacing: 1px;
	font-size: .9rem;
	border: 2px solid ${({ isResetable }) => isResetable ? '#f77070' : '#4477bb'};
	border-radius: 20px;
	color: #fff;
	text-decoration: none;
	background-color: ${({ isResetable }) => isResetable ? '#f77070' : '#4477bb'};
	cursor: pointer;
	transition: .3s;
	user-select: none;

	> svg {
		font-size: 1.3rem;
		padding: .1rem;
		margin-left: .5rem;
	}

	:hover {
		background-color: ${({ isResetable }) => isResetable ? '#f77070' : '#5c8dcf'};
		border: 2px solid ${({ isResetable }) => isResetable ? '#f77070' : '#5c8dcf'};
	}
`

const Button = ({ children, href, isResetable, onClickAction }: {
		children: any;
		href?: string;
		isResetable?: boolean;
		onClickAction?: { reset: () => void; randomize: () => void }
	}) => (
	<ButtonContainer
		onClick={() => isResetable ? onClickAction?.reset() : onClickAction?.randomize()}
		isResetable={isResetable}
		href={href}
		target='__blank'
	>
		{children}
	</ButtonContainer>
)

export default Button
