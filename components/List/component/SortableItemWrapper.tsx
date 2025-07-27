import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";

interface IProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const SortableItemWrapper = ({ 
  id, 
  children,
  disabled = false
}: IProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    disabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {!disabled && (
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 cursor-move p-2" 
          {...attributes} 
          {...listeners}
        >
         <RxDragHandleDots2 className="text-3xl" />
        </div>
      )}
      <div className="pl-10">
        {children}
      </div>
    </div>
  );
};

export default SortableItemWrapper;