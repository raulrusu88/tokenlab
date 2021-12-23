import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Checkbox } from "./Forms/Checkbox";

export const AlphaBanner = () => {
  const [open, setOpen] = React.useState(false);

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
              <div className="flex flex-col">
                <Checkbox checkbox text="Google Sign Up / Sign In" />
                <Checkbox checkbox text="CMC Api with live data" />
                <Checkbox text="WS implementation for live-ish data" />
                <Checkbox text="Show each crypto correct logo" />
                <Checkbox text="User dashboard / portfolio" />
                <Checkbox text="User dashboard trade history" />
                <Checkbox text="Correctly save user trade in DB" />
                <Checkbox text="Search for coins" />
                <Checkbox text="Responsive layout" />
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
