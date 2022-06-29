import styles from '../styles/Info.module.scss';

export function Info() {
  return (
    <div className={styles.container}>

      <h2>Como funciona</h2>

      <div className={styles.wrapper}>
        <p>O Gameodoro é uma aplicação de realização de tarefas de estudo ou trabalho através do método pomodoro com elementos de gamificação. Trata-se de uma ferramenta simples e eficaz para gerenciamento do tempo e de incentivo para aumentar a produtividade.</p>

        <strong>Timer</strong>
        <p>Os ciclos são cronometrados de 25 minutos.</p>

        <strong>Intervalo para descanso</strong>
        <p>Os intervalos são de 5 minutos após cada ciclo.</p>

        <strong>Cronômetro programado</strong>
        <p>Na criação das tarefas, será possível selecionar quantos iterações de ciclos vão ser necessários para a realização.</p>

        <strong>Lista de Tarefas</strong>
        <p>Ao iniciar as tarefas, o cronômetro vai indicar os ciclos do método quando trabalhar e quando descansar.</p>

        <strong>Barras de progresso</strong>
        <p>Indicando a percentagem necessária para completar cada projeto criado.</p>

        <strong>Ranking</strong>
        <p>Vai indicar o número de ciclos completos por cada usuário de acordo com o projeto criado e realização dessas tarefas.</p>
      </div>
    </div>
  )
}