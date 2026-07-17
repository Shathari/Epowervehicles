import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useSubmitDealershipApplication } from '@/hooks/useDealershipApplications'
import { dealershipFormSchema, type DealershipFormValues } from '@/forms/schemas'
import { ApiError } from '@/types/api'

export function DealershipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DealershipFormValues>({ resolver: zodResolver(dealershipFormSchema) })
  const { mutateAsync, isPending } = useSubmitDealershipApplication()

  const onSubmit = async (values: DealershipFormValues) => {
    try {
      await mutateAsync(values)
      toast.success('Application submitted! Our team will reach out soon.')
      reset()
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to submit application.'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 text-left">
      <Input tone="dark" label="Your Name" {...register('name')} error={errors.name?.message} />
      <Input
        tone="dark"
        label="Your Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        tone="dark"
        label="Your Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Input tone="dark" label="Your City" {...register('city')} error={errors.city?.message} />
      <Textarea
        tone="dark"
        label="Tell us about your business"
        {...register('message')}
        error={errors.message?.message}
      />
      <Button type="submit" tone="dark" isLoading={isPending} className="self-start">
        Submit Application
      </Button>
    </form>
  )
}
