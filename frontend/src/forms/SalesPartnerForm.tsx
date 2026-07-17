import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import {
  BriefcaseIcon,
  BuildingIcon,
  MailIcon,
  MapPinIcon,
  MessageIcon,
  PhoneIcon,
  UserIcon,
} from '@/components/icons/FormIcons'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { openWhatsApp } from '@/utils/whatsapp'
import { useSubmitSalesPartnerApplication } from '@/hooks/useSalesPartnerApplications'
import {
  INDIAN_STATES,
  SALES_EXPERIENCE_OPTIONS,
  salesPartnerFormSchema,
  type SalesPartnerFormValues,
} from '@/forms/schemas'

function buildMessage(values: SalesPartnerFormValues): string {
  const lines = [
    "Hi EPOWER Vehicles, I'd like to apply as a Sales Partner.",
    `Name: ${values.fullName}`,
    `WhatsApp: ${values.whatsappNumber}`,
    values.email ? `Email: ${values.email}` : null,
    `City: ${values.city}`,
    `State: ${values.state}`,
    `Experience: ${values.experience}`,
    values.previousCompany ? `Previous Company: ${values.previousCompany}` : null,
    values.aboutYourself ? `About: ${values.aboutYourself}` : null,
  ]
  return lines.filter(Boolean).join('\n')
}

export function SalesPartnerForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SalesPartnerFormValues>({ resolver: zodResolver(salesPartnerFormSchema) })
  const submitApplication = useSubmitSalesPartnerApplication()

  const onSubmit = async (values: SalesPartnerFormValues) => {
    try {
      await submitApplication.mutateAsync(values)
    } catch {
      // The WhatsApp handoff below is the primary flow — don't block it on a backend hiccup,
      // just let the admin know the record may not have been saved.
      toast.error("Couldn't save your application, but continuing to WhatsApp…")
    }
    openWhatsApp(buildMessage(values))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl border border-neon-500/30 bg-ink-900/70 p-8 text-center"
      >
        <h3 className="text-xl font-bold text-neon-400">Application sent!</h3>
        <p className="mt-2 text-slate-300">
          We've opened WhatsApp with your details prefilled — hit send there to complete your
          application. Our team will reach out shortly.
        </p>
        <Button tone="dark" variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Submit another application
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Input
        tone="dark"
        floating
        icon={<UserIcon />}
        label="Full Name *"
        {...register('fullName')}
        error={errors.fullName?.message}
      />
      <Input
        tone="dark"
        floating
        icon={<PhoneIcon />}
        label="WhatsApp Number *"
        type="tel"
        {...register('whatsappNumber')}
        error={errors.whatsappNumber?.message}
      />
      <Input
        tone="dark"
        floating
        icon={<MailIcon />}
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        tone="dark"
        floating
        icon={<MapPinIcon />}
        label="City *"
        {...register('city')}
        error={errors.city?.message}
      />
      <Select
        tone="dark"
        icon={<MapPinIcon />}
        label="State"
        defaultValue=""
        {...register('state')}
        error={errors.state?.message}
      >
        <option value="" disabled>
          Select your state
        </option>
        {INDIAN_STATES.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </Select>
      <Select
        tone="dark"
        icon={<BriefcaseIcon />}
        label="Sales Experience"
        defaultValue=""
        {...register('experience')}
        error={errors.experience?.message}
      >
        <option value="" disabled>
          Select your experience
        </option>
        {SALES_EXPERIENCE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Input
        tone="dark"
        floating
        icon={<BuildingIcon />}
        label="Previous Company / Dealer (if any)"
        {...register('previousCompany')}
        error={errors.previousCompany?.message}
      />
      <Textarea
        tone="dark"
        icon={<MessageIcon />}
        label="Tell Us About Yourself"
        {...register('aboutYourself')}
        error={errors.aboutYourself?.message}
      />
      <Button type="submit" tone="dark" isLoading={isSubmitting} className="self-start">
        <WhatsAppIcon className="h-5 w-5" />
        Apply via WhatsApp
      </Button>
    </form>
  )
}
