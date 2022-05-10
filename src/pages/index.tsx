import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { listenerCount } from 'process';

import { Countdown } from '../components/Countdown';
import { PlayerProfile } from '../components/PlayerProfile';
import { Header } from '../components/Header';
import { CountdownProvider } from '../contexts/CountdownContext';
import { PlayerProvider } from '../contexts/PlayerContext';

import styles from '../styles/Home.module.scss';
import { useState, KeyboardEvent } from 'react';
import { Item } from '../types/item';
import { ListItem } from '../components/ListItem';

interface HomeProps {
  iterationsCompleted: number;

}
type Props = {
  onEnter: (TaskName: string) => void
}
export const AddArea = ( { onEnter }: Props) => {
  const [inputdText, setInputText] = useState('');

}

  export default function Home(props: HomeProps) {
  const [list, setList] = useState<Item[]>([
    { id: 1, name: 'tarefa 1', done: false},
    { id: 2, name: 'tarefa 2', done: true},
    { id: 3, name: 'tarefa 3', done: false}

  ]);
  const handleItemTask = (TaskName: string) =>{
    let newList = [...list];
    newList.push({
      id: list.length +1,
      name: TaskName,
      done: false
    });
    setList(newList);

  }
  const [inputText, setInputText] = useState('');
  const handlKeyUp = (e: KeyboardEvent) =>{
    if(e.code === 'Enter' && inputText!== ''){
      onEnter(inputText);
      
    }
  }
  return (
    <>
      <Head>
        <title>Gameodoro</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        
        <div className={styles.conteudo1}>
          <PlayerProvider
          iterationsCompleted={props.iterationsCompleted}
        >
          <CountdownProvider>
            <Countdown />
          </CountdownProvider>
          <PlayerProfile />
        </PlayerProvider>
        </div>

        <div className={styles.conteudo2}>
          <h2>Tarefas</h2>
          <input 
                type="text"
                placeholder="Adicione uma terefa"
                value={inputText}
                onChange={e=>setInputText(e.target.value)}
                onKeyUp={handlKeyUp}
            />
          {list.map((Item, index)=>(
          <ListItem key={index} item={Item}/>
          

          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { iterationsCompleted } = context.req.cookies;

  return {
    props: {
      iterationsCompleted: Number(iterationsCompleted)
    }
  }
}