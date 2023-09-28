import { useForm, FormProvider } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CompleteOrderForm } from './components/CompleteOrderForm'
import { SelectedCoffees } from './components/SelectedCoffees'
import { CompleteOrderContainer } from './styles'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const confirmOrderFormValidationSchema = zod.object({
  cep: zod.string().min(1, 'Informe o CEP'),
  street: zod.string().min(1, 'Informe o Rua'),
  number: zod.string().min(1, 'Informe o Número'),
  complement: zod.string(),
  district: zod.string().min(1, 'Informe o Bairro'),
  city: zod.string().min(1, 'Informe a Cidade'),
  uf: zod.string().min(1, 'Informe a UF'),
  // paymentMethod: zod.nativeEnum(paymentMethods, {
  //   errorMap: () => {
  //     return { message: 'Informe o método de pagamento' }
  //   },
  // }),
})

export type OrderData = zod.infer<typeof confirmOrderFormValidationSchema>

type ConfirmOrderFormData = OrderData

export function CompleteOrderPage() {
  const navigate = useNavigate()
  const { cleanCart } = useCart()

  const confirmOrderForm = useForm<ConfirmOrderFormData>({
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      // paymentMethod: undefined,
    },
  })

  const { handleSubmit } = confirmOrderForm

  function handleConfirmOrder(data: ConfirmOrderFormData) {
    navigate('/orderConfirmed', {
      state: data,
    })
    cleanCart()
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <CompleteOrderContainer
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
        <CompleteOrderForm />
        <SelectedCoffees />
      </CompleteOrderContainer>
    </FormProvider>
  )
}