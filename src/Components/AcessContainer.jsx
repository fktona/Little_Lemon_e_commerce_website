import logo from '../assets/img/logo.png'
export default function AuthorizationContainer( { children }) {
  return (
    <div className="  background md:bg-action-green absolute w-[100%] left-0 min-h-[100vh] top-0 lg:px-24  py-[3rem] ">
      <div className="absolute md:hidden w-full top-0 flex justify-start bg-black z-50  p-2">
      </div>
      <div className="md:grid block grid-cols-2 rounded-lg relative   h-full lg:shadow-xl   ">
        <div className="bg-black hidden relative md:flex items-center  rounded-l-xl justify-center flex-col">
          <img src={logo} alt="logo" width={400} height={400} />
        </div>
        <div className="md:bg-white/30 relative  flex flex-col gap-9   rounded-r-xl px-12 pt-8 justify-center items-center ">
          {children}
        </div>
      </div>
    </div>
  )
}
