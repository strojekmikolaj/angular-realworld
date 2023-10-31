import { BackendErrorInterface } from "src/app/shared/types/backend-errors.interface"

export interface SettingsStateInterface {
    isSubmitting: boolean
    validationErrors: BackendErrorInterface | null
}