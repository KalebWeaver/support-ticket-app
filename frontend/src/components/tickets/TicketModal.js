//----General-Imports----//
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCreateTicketMutation } from '../../app/services/tickets'

import { useForm } from '../../utils/hooks'

export default function TicketModal({ setIsOpen }) {
  const { user } = useSelector((state) => state.auth)

  const [open, setOpen] = useState(true)
  const [filterName, setFilterName] = useState('')

  const [createTicket, { isLoading }] = useCreateTicketMutation()

  const { onChange, onSubmit, values } = useForm(submitTicket, {
    title: '',
    description: '',
    username: user.username,
  })

  const handleClose = () => {
    setOpen(false)
    setIsOpen(false)
  }

  function submitTicket() {
    console.log(values)
    handleClose()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <form onSubmit={onSubmit}>
                  <div>
                    <div className="mt-3 sm:mt-5">
                      <Dialog.Title
                        as="h1"
                        className="text-2xl text-center leading-6 font-semibold text-gray-900 mb-10"
                      >
                        Create Ticket
                      </Dialog.Title>
                      <div className="mt-2">
                        <label
                          htmlFor="title"
                          className="text-left text-md font-semibold"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={values.title}
                          placeholder="Title..."
                          onChange={onChange}
                          className="max-w-xl block focus:ring-cyan-500 focus:border-cyan-500 w-full shadow-sm  sm:text-sm border-gray-300 rounded-md text-sm font-medium text-gray-700 text-center"
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="description"
                          className="text-left text-md font-semibold"
                        >
                          Description:
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={4}
                            name="description"
                            value={values.description}
                            onChange={onChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-500 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:text-sm"
                    >
                      Create Ticket
                    </button>
                  </div>
                </form>
                <div>{JSON.stringify(values)}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
