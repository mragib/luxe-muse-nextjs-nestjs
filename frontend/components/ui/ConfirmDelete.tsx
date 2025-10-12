import { Button } from "./button";

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
  function handleConfirmClick() {
    onConfirm();
    onCloseModal();
  }

  return (
    <div className="w-[40rem] flex flex-col gap-4">
      <h3 className="text-3xl">Delete {resource}</h3>
      <p className="text-gray-500 mb-4">
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
