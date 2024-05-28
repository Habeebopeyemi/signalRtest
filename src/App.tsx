import { useState, useEffect } from "react";
import './App.css';
import Connector from './signalr-connection';

function App() {
  const { sendPaymentNotification, events } = Connector();
  const [message, setMessage] = useState("initial value");
  
  useEffect(() => {
    events((response) => setMessage(response.message));
  }, [events]);

  return (
    <div className="App">
      <span>Payment notification: <span style={{ color: "green" }}>{message}</span> </span>
      <br />
      <button onClick={() => sendPaymentNotification((new Date()).toISOString())}>Send payment notification</button>
    </div>
  );
}

export default App;

// import {useState, useEffect} from "react";
// import './App.css';
// import Connector from './signalr-connection'
// function App() {
//   const { newMessage, events } = Connector();
//   const [message, setMessage] = useState("initial value");
//   useEffect(() => {
//     events((_, message) => setMessage(message));
//   });
//   return (
//     <div className="App">
//       <span>message from signalR: <span style={{ color: "green" }}>{message}</span> </span>
//       <br />
//       <button onClick={() => newMessage((new Date()).toISOString())}>send date </button>
//     </div>
//   );
// }
// export default App;