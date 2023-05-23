import { Menu, Transition } from '@headlessui/react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import axios from 'axios'

interface FormDialogProps {
  className?: string
  name: string
  id: string
}

export default function SimpleListMenu({
  className,
  name,
  id,
}: FormDialogProps) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [value, setValue] = useState('')

  const [correct, setCorrect] = useState(false)

  const [clicked, setClicked] = useState(false)

  const toLowerCase = (str: string) => {
    return str.toLowerCase()
  }

  const handleDelete = async () => {
    setClicked(true)
    if (toLowerCase(value) === toLowerCase(name)) {
      setCorrect(true)

      try {
        const res = await axios.delete(`https://weak-lime-sea-urchin-cap.cyclic.app/api/users/${id}`)

        console.error(res)
        localStorage.removeItem('user')
        window.location.reload()
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        DELETE ACCOUNT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {clicked && correct ? (
              <>
                {' '}
                <p className="text-xl">Your account has been deleted</p>{' '}
              </>
            ) : (
              <>
                You are about to delete your account. Are you sure? if you want
                to continue please enter{' '}
                <span className="font-bold text-lg text-red-500 uppercase">
                  {name}{' '}
                </span>
                below and click delete
              </>
            )}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="string"
            fullWidth
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
            disabled={correct}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
