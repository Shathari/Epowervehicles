import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'
import { loginFormSchema, type LoginFormValues } from '@/forms/schemas'
import { ApiError } from '@/types/api'

export function AdminLogin() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginFormSchema) })

  if (user) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin'
    return <Navigate to={redirectTo} replace />
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values)
      navigate('/admin')
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Invalid credentials.'
      toast.error(message)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-10">
      <Card className="w-full">
        <h1 className="mb-6 text-center text-2xl font-bold text-brand-teal-700">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button type="submit" isLoading={isSubmitting} className="mt-2">
            Log In
          </Button>
        </form>
      </Card>
    </div>
  )
}
