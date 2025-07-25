import React from 'react'
import Button from './ui/Button'
import { EButtonVariant } from '@/lib/enums'

interface IProps {
  saveNewList: (formData: FormData) => void
}

const CreateForm = ({ saveNewList }: IProps) => (
  <form
    action={(data) => saveNewList(data)}
    className="flex flex-col gap-4"
  >
    <div className="mb-4">
      <label htmlFor="listName">nazev </label>
      <input type="text" id="listName" name="listItem" />
    </div>

    <Button variant={EButtonVariant.PRIMARY} type="submit">
      Vytvořit
    </Button>
  </form>
)


export default CreateForm
