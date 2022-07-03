
export type DOMMessage = {
	type: 'GET_DOM'
}

export type DOMMessageResponse = {
	host: string;
	participants: (string | null)[];
}
