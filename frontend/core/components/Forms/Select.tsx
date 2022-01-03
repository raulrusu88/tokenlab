import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const leverage = [
  {
    id: 1,
    amount: 1,
  },
  {
    id: 2,
    amount: 2,
  },
  {
    id: 3,
    amount: 5,
  },
  {
    id: 4,
    amount: 10,
  },
  {
    id: 5,
    amount: 15,
  },
  {
    id: 6,
    amount: 20,
  },
  {
    id: 7,
    amount: 50,
  },
  {
    id: 8,
    amount: 100,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Select = ({
  selectValue,
}: {
  selectValue?: (n: number) => void;
}) => {
  const [selected, setSelected] = useState(leverage[0]);

  selectValue(selected.amount);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-primary/50 border border-text/25 rounded-md shadow-sm pl-3 pr-5 py-2 text-left cursor-default focus:outline-none focus:ring-1  sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate text-text">
                  {selected.amount}x
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-primary shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {leverage.map((lev) => (
                  <Listbox.Option
                    key={lev.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-secondary" : "text-text/75",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={lev}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {lev.amount}x
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-positive",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
