import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="hidden lg:flex lg:flex-1 bg-brand-brown p-8 text-white flex-col justify-between">
        <div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5Iyplqwe2PCDj3xPhqZ19VfqFKAmBV.png"
            alt="Del Yaqui Logo"
            width={150}
            height={150}
            className="mb-8"
            priority
          />
        </div>
        <div>
          <blockquote className="text-2xl font-medium mb-4">
            "Entregando confianza y puntualidad en cada paquete, conectando personas y negocios en todo México."
          </blockquote>
          <cite className="text-lg">- Equipo Del Yaqui</cite>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
            <p className="text-sm text-gray-600 mt-2">Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <div className="mt-8">
            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="correo@delyaqui.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange"
                />
              </div>
              <div>
                <Link
                  href="/dashboard"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-brown hover:bg-brand-brown/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continuar con</span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange">
                  <Github className="h-5 w-5" />
                  GitHub
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-600">
              Al continuar, aceptas nuestros{" "}
              <a href="#" className="text-brand-brown hover:text-brand-brown/90">
                Términos de servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-brand-brown hover:text-brand-brown/90">
                Política de privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

