import axios from 'axios'
import { useState } from 'react'
import Loader from '../componenets/Loader'
function MailList() {
  const [sent, setSent] = useState(false)
  const [mail, setMail] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [failed, setFailed] = useState(false)

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (validateEmail(mail)) {
      try {
        setWaiting(true)
        const res = await axios.post('http://localhost:8800/api/send', {
          target: mail,
        })
        setSent(true)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    } else {
      setFailed(true)
    }
  }

  //create a function to validate Email

  return (
    <div className="w-full mt-[50px] bg-slate-800 text-white flex flex-col items-center gap-[20px] p-[35px] ">
      <h1 className="md:text-left text-center">Save time and save money!</h1>
      <span>Sign up and we will send the vest deals to you</span>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex md:flex-row flex-col items-center gap-4  p-2  border-0"
        >
          {!sent ? (
            <>
              {waiting ? (


                <Loader />


              ) : (
                <>
                  <input
                    type="email"
                    placeholder={`${failed
                      ? 'Please enter a vaild E-mail'
                      : 'Enter your E-mail'
                      }`}
                    className="p-3 text-black w-[300px] rounded-md"
                    onChange={(e) => setMail(e.target.value)}
                  />

                  <button
                    type="submit"
                    className=" bg-[#0071c2] text-white font-bold rounded-md p-3"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="text-green-500">Email is sent!</h2>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default MailList
