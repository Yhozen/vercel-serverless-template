import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Modal, useModal } from '@geist-ui/react'

type Components = { content?: JSX.Element; title?: JSX.Element }

type DisplayModalContextType = {
  openDialog: (options: Components) => void
}

export const DisplayModalContext = createContext<DisplayModalContextType>({
  openDialog: () => {
    return
  },
})

export const DisplayModalContextProvider: FC = ({ children }) => {
  const { visible, setVisible, bindings } = useModal()
  const [values, setValues] = useState<Components>(null)

  useEffect(() => {
    if (!visible) setValues(null)
  }, [visible])

  const openDialog: DisplayModalContextType['openDialog'] = useCallback(
    ({ content, title }) => {
      setVisible(true)
      setValues({ content, title })
    },
    [setVisible, setValues],
  )

  return (
    <DisplayModalContext.Provider value={{ openDialog }}>
      {children}

      <Modal {...bindings}>
        <Modal.Title>{values.title}</Modal.Title>
        <Modal.Subtitle>Subtitle</Modal.Subtitle>
        <Modal.Content>{values.content}</Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
      </Modal>
    </DisplayModalContext.Provider>
  )
}
