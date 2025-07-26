import React from "react";
import Button from "./ui/Button";
import { EButtonVariant } from "@/lib/enums";

interface IProps {
  saveNewList: (formData: FormData) => void;
  withNumberInput?: boolean;
}

const CreateForm = ({ saveNewList, withNumberInput }: IProps) => (
  <form action={(data) => saveNewList(data)} className="flex flex-col gap-3">
    <div className="grid grid-cols-3 mb-4 w-1/2">
      <label htmlFor="listName" className="">nazev </label>
      <input type="text" id="listName" name="listItem" className="col-span-2 mb-4" />
      
      {withNumberInput && (
          <>
            <label htmlFor="listAmount">počet </label>
            <input
              type="number"
              id="listAmount"
              name="listAmount"
              min="1"
              defaultValue={1}
              className="col-span-2"
            />
          </>
      )}
    </div>

    <Button variant={EButtonVariant.PRIMARY} type="submit">
      Vytvořit
    </Button>
  </form>
);

export default CreateForm;
