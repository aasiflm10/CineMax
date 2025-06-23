import Link from "next/link";

export function Navbar() {
  return (
    <div className="bg-indigo-500 w-full h-44 pl-24 pr-24 pt-6 pb-25 ">
      <div className=" bg-red-50 h-9 flex justify-between">
        <Link href={"/"}>Hey there</Link>
        <div className=" bg-green-200 flex">
          <label className=" p-4 inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>

          <span className="ml-8"> Profile</span>
        </div>
      </div>
    </div>
  );
}
