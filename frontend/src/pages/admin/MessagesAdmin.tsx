import toast from 'react-hot-toast'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  useContactMessages,
  useDeleteContactMessage,
  useUpdateContactMessageStatus,
} from '@/hooks/useContactMessages'
import { ApiError } from '@/types/api'
import type { MessageStatus } from '@/types/contact'

const statusOptions: MessageStatus[] = ['unread', 'read', 'responded']

export function MessagesAdmin() {
  const { data: messages, isPending, isError, refetch } = useContactMessages()
  const updateStatus = useUpdateContactMessageStatus()
  const deleteMessage = useDeleteContactMessage()

  const handleStatusChange = async (id: string, status: MessageStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status })
      toast.success('Status updated')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to update status.')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete the message from "${name}"?`)) return
    try {
      await deleteMessage.mutateAsync(id)
      toast.success('Message deleted')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to delete message.')
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-brand-teal-700">Contact Messages</h1>
      {isPending && <Spinner label="Loading messages…" />}
      {isError && <ErrorState message="Couldn't load messages." onRetry={() => refetch()} />}
      {!isPending && !isError && messages && messages.length === 0 && (
        <EmptyState
          title="No messages yet"
          description="Submissions from the Contact page will show up here."
        />
      )}
      {!isPending && !isError && messages && messages.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-white shadow-md shadow-slate-900/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-slate-100 align-top last:border-0">
                  <td className="px-4 py-3 font-semibold text-slate-700">{message.name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{message.email}</div>
                    <div>{message.phone}</div>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-slate-600">{message.message}</td>
                  <td className="px-4 py-3">
                    <select
                      value={message.status}
                      onChange={(event) =>
                        handleStatusChange(message.id, event.target.value as MessageStatus)
                      }
                      className="rounded border border-slate-300 px-2 py-1 text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(message.id, message.name)}
                      className="font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
