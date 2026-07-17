import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { MailIcon, MessageIcon, PhoneIcon, UserIcon } from '@/components/icons/FormIcons'
import { useSubmitContactMessage } from '@/hooks/useContactMessages'
import { contactFormSchema, type ContactFormValues } from '@/forms/schemas'
import { ApiError } from '@/types/api'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) })
  const { mutateAsync, isPending } = useSubmitContactMessage()

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await mutateAsync(values)
      toast.success('Message sent! We will get back to you shortly.')
      reset()
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to send message.'
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        tone="dark"
        icon={<UserIcon />}
        label="Your Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        tone="dark"
        icon={<MailIcon />}
        label="Your Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        tone="dark"
        icon={<PhoneIcon />}
        label="Your Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Textarea
        tone="dark"
        icon={<MessageIcon />}
        label="Your Message"
        {...register('message')}
        error={errors.message?.message}
      />
      <Button type="submit" tone="dark" isLoading={isPending} className="self-start">
        Send Message
      </Button>
    </form>
  )
}
