import { Dialog, Transition } from "@headlessui/react";
import React from "react";

interface Props {
  openModal: boolean;
  data: any;
}

export const ModalCoin = ({ openModal = false, data }: Props) => {
  const [open, setOpen] = React.useState(openModal);

  const handleModal = () => setOpen(!open);

  return (
    <>
      <button onClick={handleModal}>
        <div className="absolute h-max w-max -right-14 -top-4 z-10 flex items-center mt-9 rotate-45 overflow-hidden">
          <div className="w-52 h-9 bg-red-400 text-center shadow-md shadow-gray-600">
            <span className="text-2xl font-semibold text-gray-200">Alpha</span>
          </div>
        </div>
      </button>
      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog
          open={open}
          onClose={handleModal}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-primary/50" />
            <div className="relative bg-secondary rounded max-w-md mx-auto text-text px-4 py-4">
              <Dialog.Title>Current progression</Dialog.Title>
              <Dialog.Description className="mt-2">
                Here are some of the features that need to be implemented or
                are.
              </Dialog.Description>
              <div className="flex flex-col">{<pre>{data}</pre>}</div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
