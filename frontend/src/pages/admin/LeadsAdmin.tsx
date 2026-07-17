import toast from 'react-hot-toast'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  useDealershipApplications,
  useDeleteDealershipApplication,
  useUpdateDealershipApplicationStatus,
} from '@/hooks/useDealershipApplications'
import { ApiError } from '@/types/api'
import type { LeadStatus } from '@/types/dealership'

const statusOptions: LeadStatus[] = ['pending', 'contacted', 'approved', 'rejected']

export function LeadsAdmin() {
  const { data: leads, isPending, isError, refetch } = useDealershipApplications()
  const updateStatus = useUpdateDealershipApplicationStatus()
  const deleteLead = useDeleteDealershipApplication()

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      await updateStatus.mutateAsync({ id, status })
      toast.success('Status updated')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to update status.')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete the application from "${name}"?`)) return
    try {
      await deleteLead.mutateAsync(id)
      toast.success('Application deleted')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to delete application.')
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-brand-teal-700">Dealership Applications</h1>
      {isPending && <Spinner label="Loading applications…" />}
      {isError && <ErrorState message="Couldn't load applications." onRetry={() => refetch()} />}
      {!isPending && !isError && leads && leads.length === 0 && (
        <EmptyState
          title="No applications yet"
          description="Submissions from the Dealership page will show up here."
        />
      )}
      {!isPending && !isError && leads && leads.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-white shadow-md shadow-slate-900/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 align-top last:border-0">
                  <td className="px-4 py-3 font-semibold text-slate-700">{lead.name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{lead.email}</div>
                    <div>{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{lead.city}</td>
                  <td className="px-4 py-3 max-w-xs text-slate-600">{lead.message}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(event) =>
                        handleStatusChange(lead.id, event.target.value as LeadStatus)
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
                      onClick={() => handleDelete(lead.id, lead.name)}
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
