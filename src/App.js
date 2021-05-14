import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import Sisu from './artifacts/contracts/Sisu.sol/Sisu.json'
//contract id
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const sisuAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function App() {
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') { 
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(sisuAddress, Sisu.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log('Balance', balance.toString());
    } else {
      console.log('Ethereum not connected');
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(sisuAddress, Sisu.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Sisu has been transfered to ${userAccount}`);
    } else { 
      console.log('Ethereum not connected');
    }
  }

  async function fetchGreeting() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      try {
        const data = await contract.greet();
        console.log('data', data);
      } catch(e) {
        console.log('Error', e);
      }
    }
  }
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue('');
      await transaction.wait();
      fetchGreeting();
    }
  }
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}> Fetch Greetings</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)}
          placeholder="Set Greeting"
          value={greeting}/>

        <hr/>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
