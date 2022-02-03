import { useContext } from 'react'
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthContext } from './contexts/Auth'
import styles from './App.module.scss'
import seal from './assets/seal.svg'

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWapper} ${ !!user ? styles.contentSigned : ''}`}>
      <MessageList />

      <div className={styles.seal}><img src={seal} alt="Selo da Rocketseat" /></div>
      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}
