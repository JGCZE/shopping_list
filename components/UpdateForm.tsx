import React from "react";
import Button from "./ui/Button";
import { EButtonVariant } from "@/lib/enums";

interface IProps {
  onChange: (formData: FormData) => void;
  onDelete?: () => void;
  withNumberInput?: boolean;
  deleteButtonName?: string;
  submitButtonName?: string;
}

const UpdateForm = ({
  onChange,
  onDelete,
  withNumberInput,
  deleteButtonName,
  submitButtonName = "Vytvořit",
}: IProps) => (
  <form action={(data) => onChange(data)} className="flex flex-col gap-3">
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

    <div className="flex gap-6">
      <Button variant={EButtonVariant.PRIMARY} type="submit">
        {submitButtonName}
      </Button>

      {!!deleteButtonName && (
        <Button
          variant={EButtonVariant.DELETE}
          type="button"
          onClick={onDelete}
        >
          {deleteButtonName}
        </Button>
      )}
    </div>
  </form>
);

export default UpdateForm;
