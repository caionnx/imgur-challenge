import {ReactNode} from "react";

export const DefaultLayout = ({ children }: { children: ReactNode}) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 opacity-90 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-900"></div>
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-12 lg:pt-16">
          <header className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl text-white font-extrabold tracking-tight text-slate-900 sm:text-4xl">Portal</h1>
            <p className="mt-2 text-sm font-semibold text-white">
              Welcome to the best images of the internet!
            </p>
          </header>
        </div>
      </div>
      <main className="mb-14 p-12 lg:p-18">
        {children}
      </main>
      <footer className="w-screen fixed bottom-0 bg-indigo-900 py-4 text-gray-100">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 w-full text-center sm:w-auto sm:text-left">
              Made with ❤️ by Caio Nunes.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
