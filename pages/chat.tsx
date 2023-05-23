// @ts-nocheck
import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useAuthState } from 'react-firebase-hooks/auth' // if we are signed in this state will return true , if false then we are not signed in
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRef, useState } from 'react'
import Navigator from '../componenets/Navigator'
import { useOs } from '@mantine/hooks'

import { motion } from 'framer-motion'
firebase.initializeApp({
  apiKey: 'AIzaSyDNwiA_ikKtlumCBEltYeoKjhJwsQzF7LU',
  authDomain: 'first-firebase-18a9b.firebaseapp.com',
  projectId: 'first-firebase-18a9b',
  storageBucket: 'first-firebase-18a9b.appspot.com',
  messagingSenderId: '613948805738',
  appId: '1:613948805738:web:bad5dcc2ed7efeaee83013',
  measurementId: 'G-LBDMTLK0ED',
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function FadeInWhenVisible({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

function SlowFadeInWhenVisible({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

function chat() {
  const [user] = useAuthState(auth)

  return (
    <>
      <Navigator
        NavigatorHeader={
          <>
            <div className={`app2`}>
              <header className={`${user ? '' : '!hidden'}`}>
                <SignOut />
              </header>

              <section>{user ? <ChatRoom /> : <Signin />}</section>
            </div>
          </>
        }
      />
    </>
  )
}

function Signin() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <SlowFadeInWhenVisible>
      <div className="shadow-2xl  m-auto w-fit p-4 rounded-lg  ">
        <button className="btn sign-in rounded-2xl" onClick={signInWithGoogle}>
          Sign in with google
        </button>
      </div>
    </SlowFadeInWhenVisible>
  )
}

function SignOut() {
  // if there is a current user
  return (
    <button className={`btn rounded-md`} onClick={() => auth.signOut()}>
      Sign Out
    </button>
  )
}

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt')
  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      photoURL,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    })

    setFormValue('')
  }

  const handleClick = () => {
    dummy.current.scrollIntoView()
  }
  const os = useOs()

  return (
    <>
      <main className="meany">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className="formy">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
          className="inputty rounded-sm"
        />
        <button
          className="btn"
          onClick={handleClick}
          type="submit"
          disabled={!formValue}
        >
          <img src={`./${os}.png`} className="w-10 h-25" alt="" />
        </button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <FadeInWhenVisible>
        <div className={` ${messageClass} flex gap-2 `}>
          <img
            src={
              photoURL ||
              'https://api.adorable.io/avatars/23/abott@adorable.png'
            }
            className="w-[40px] h-[40px] rounded-full "
          />
          <p className="para">{text}</p>
        </div>
      </FadeInWhenVisible>
    </>
  )
}

export default chat
