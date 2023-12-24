import { useToast } from 'vue-toastification'
const toast = useToast()
interface ErrorDetail {
  message: string
  path: string[]
  type: string
  context: {
    label: string
    value: any
    key: string
  }
}

interface CustomError {
  value: {
    [key: string]: any
  }
  error: {
    _original: {
      [key: string]: any
    }
    details: ErrorDetail[]
  }
}

export function useValidate(schema: any) {
  const validate = (data: any) => {
    const result: CustomError = schema.validate(data)
    if (result.error) {
      toast.error(result.error.details[0].message, { color: 'error' })
      throw new Error(result.error.details[0].message)
    }
  }
  return validate
}
