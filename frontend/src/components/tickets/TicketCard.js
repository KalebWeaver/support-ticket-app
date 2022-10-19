import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSendMessageMutation } from '../../app/services/tickets'
import { useForm } from '../../utils/hooks'

export default function TicketCard({ ticket }) {
  const { user } = useSelector((state) => state.auth)
  const { ticketId } = useParams()

  const { values, onChange, onSubmit } = useForm(submitMessage, {
    ticketId,
    message: '',
    username: user.username,
  })

  const [sendMessage] = useSendMessageMutation()

  function submitMessage() {
    sendMessage(values)
    console.log(values)
  }

  return (
    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow mx-6">
      <div className="px-4 py-5 sm:px-6 flex flex-col gap-4">
        {/* Content goes here */}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-medium leading-6 text-gray-900 sm:truncate underline">
            Ticket: {ticket.title}
          </h1>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-md font-medium leading-6 text-gray-900 sm:truncate">
            Status: {ticket.status}
          </h1>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-md font-medium leading-6 text-gray-900 sm:truncate">
            Description: {ticket.description}
          </h1>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-md font-medium leading-6 text-gray-900 sm:truncate">
            Created By: {ticket.username}
          </h1>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {/* Message Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-row gap-4 w-full items-center">
            <div className=" flex flex-col gap-2 w-full">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message:
              </label>
              <input
                type="text"
                name="message"
                value={values.message}
                onChange={onChange}
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
              />
            </div>
            <div className="self-end w-1/6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-cyan-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </div>
        </form>
        {/* Message List */}
        <div className="mt-2 w-full">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-medium leading-6 text-gray-900 sm:truncate underline">
              Messages:
            </h1>
          </div>
          <ul className="mt-2 divide-y divide-gray-200 flex flex-col border-2 border-gray-200 p-4 w-full">
            {ticket.messages.map((message) => (
              <li
                key={message._id}
                className={
                  (message.username === user.username
                    ? 'justify-end'
                    : 'justify-start') +
                  ' ' +
                  'py-4'
                }
              >
                <div className="bg-cyan-500 text-white text-center px-4 py-1 rounded-lg text-md w-fit">
                  {message.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
