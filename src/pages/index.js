import React, {useState, useEffect} from 'react';
import '../styles/index.module.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import ReactDOM from 'react-dom';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function CardGame () {
  const [cards, setCards] = useState([]); // カードの状態管理
  const [message, setMessage] = useState('ゲームを開始してください');

  // カードデータの初期化
  useEffect(() => {
    const initialCards = [
      { id: 1, value: 'A', isFlipped: false },
      { id: 2, value: 'B', isFlipped: false },
      { id: 3, value: 'C', isFlipped: false },
      { id: 4, value: 'D', isFlipped: false }
    ];
    setCards(initialCards);
  }, []);

  // カードをクリックしたときの処理
  const handleCardClick = (id) => {
    const newCards = cards.map(card => 
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setCards(newCards);

    // 任意のゲームロジック (ここでは簡単なメッセージの切り替え)
    setMessage(`カード ${id} が選ばれました！`);
  };

  return (
    <div className="game-container">
      <h1>カードゲーム</h1>
      <p>{message}</p>
      <div className="card-grid">
        {cards.map(card => (
          <div 
            key={card.id} 
            className={`card ${card.isFlipped ? 'flipped' : ''}`} 
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped ? card.value : '🂠'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGame;