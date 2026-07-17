import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { useSiteStats, useUpdateSiteStats } from '@/hooks/useSiteStats'
import { ApiError } from '@/types/api'
import type { SiteStatsInput } from '@/types/stats'

export function AdminStats() {
  const { data: stats, isPending, isError, refetch } = useSiteStats()
  const updateStats = useUpdateSiteStats()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SiteStatsInput>({
    defaultValues: { vehiclesSold: 0, dealersCount: 0, statesCovered: 0 },
  })

  useEffect(() => {
    if (stats) {
      reset({
        vehiclesSold: stats.vehiclesSold,
        dealersCount: stats.dealersCount,
        statesCovered: stats.statesCovered,
      })
    }
  }, [stats, reset])

  const onSubmit = async (values: SiteStatsInput) => {
    try {
      await updateStats.mutateAsync(values)
      toast.success('Site stats updated')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Failed to update stats.')
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="mb-4 text-2xl font-bold text-brand-teal-700">Home Page Stats Band</h1>
      <p className="mb-4 text-sm text-slate-600">
        These numbers power the "Vehicles Sold / Dealers / States Covered" band on the public Home
        page.
      </p>
      {isPending && <Spinner label="Loading stats…" />}
      {isError && <ErrorState message="Couldn't load stats." onRetry={() => refetch()} />}
      {!isPending && !isError && (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Input
              label="Vehicles Sold"
              type="number"
              {...register('vehiclesSold', { valueAsNumber: true })}
            />
            <Input
              label="Dealers"
              type="number"
              {...register('dealersCount', { valueAsNumber: true })}
            />
            <Input
              label="States Covered"
              type="number"
              {...register('statesCovered', { valueAsNumber: true })}
            />
            <Button type="submit" isLoading={isSubmitting} className="self-start">
              Save
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}
