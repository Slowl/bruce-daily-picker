
import { DOMMessage, DOMMessageResponse } from '../types'
 
// Function called when a new message is received
const messagesFromReactAppListener = (
    msg: DOMMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: DOMMessageResponse) => void) => {

    console.log('[content.js]. Message received', msg)
   
    const participants = Array.from(document.getElementsByClassName('zWGUib')).map((participant) => participant.textContent)
 
    const response: DOMMessageResponse = {
        host: document.location.host,
        participants,
    }

    sendResponse(response)
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
