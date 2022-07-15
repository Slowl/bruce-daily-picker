
import { keyframes } from 'styled-components'

export const isPickedAnimation = keyframes`
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
`
