const navigation = [
    
   
    
    
  
  ]
  
  export default function Footer() {
    return (
      <footer className="bg-white relative top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-2 md:mt-0 text-center">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 Su Empresa, Inc. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    )
  }