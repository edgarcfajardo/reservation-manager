import { Calendar } from "lucide-react"

interface AppBrandingProps {
  showDescription?: boolean
  className?: string
}

export default function AppBranding({ showDescription = true, className = "" }: AppBrandingProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
        <Calendar className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">AgendaPro</h1>
      {showDescription && <p className="text-gray-600 mt-1">Gestiona tus citas de forma inteligente</p>}
    </div>
  )
}
