import Button from "@/components/ui/Button";
import { EButtonVariant } from "@/lib/enums";

interface IProps {
  editValues: { name: string; amount: number };
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
  id: string;
  setEditValues: React.Dispatch<
    React.SetStateAction<{ name: string; amount: number }>
  >;
}

const EditableItem = ({
  editValues,
  handleCancelEdit,
  handleSaveEdit,
  id,
  setEditValues,
}: IProps) => {
  return (
    <>
      <div className="flex gap-2 flex-1">
        <input
          type="text"
          value={editValues.name}
          onChange={(e) =>
            setEditValues({ ...editValues, name: e.target.value })
          }
          className="border rounded px-2 py-1"
          autoFocus
        />

        <input
          type="number"
          value={editValues.amount}
          onChange={(e) =>
            setEditValues({ ...editValues, amount: Number(e.target.value) })
          }
          className="border rounded px-2 py-1 w-20"
          min="1"
        />
        <span>kusů</span>
      </div>

      <div className="gap-2 flex">
        <Button
          variant={EButtonVariant.PRIMARY}
          onClick={() => handleSaveEdit(id)}
        >
          Uložit
        </Button>
        <Button variant={EButtonVariant.DELETE} onClick={handleCancelEdit}>
          Zrušit
        </Button>
      </div>
    </>
  );
};

export default EditableItem;
