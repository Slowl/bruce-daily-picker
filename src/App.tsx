import { useEffect, useState } from 'react'
import { DOMMessage, DOMMessageResponse } from './types'
import styled from 'styled-components'

//#region STYLE
const AppContainer = styled.div`
  width: 500px;
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
  a {
    color: blue;
  }
`
const UserCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 0 3rem;
  gap: 1rem;
`
const UserCard = styled.div<{ isPicked: boolean }>`
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

const Button = styled.div<{ isDisabled: boolean }>`
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
//#endregion

const App = () => {

  const [host, setHost] = useState('meet.google.com')
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
    [],
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
                      <UserCard isPicked={selectedIndex === index} key={index}>
                        <div className='user-picture'>
                          {participant?.split(' ')[0].split('')[0]}
                          {participant?.split(' ')[1].split('')[0]}
                        </div>
                        <div className='user-name'> {participant} </div>
                      </UserCard>
                  )
                )}
              </UserCardsContainer>

              <Button
                onClick={(event) => selectedIndex ? event.preventDefault() : randomPick(participants.length)}
                isDisabled={selectedIndex !== null}
              >
                Pick someone
              </Button>
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
