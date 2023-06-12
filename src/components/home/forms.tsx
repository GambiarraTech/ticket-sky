import React from "react"

interface ApplicationLayoutProps {
    children: React.ReactNode
}


const Forms: React.FC<ApplicationLayoutProps> = ({children}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="inline-flex rounded-md shadow-sm " role="group">
                    <button type="button" className="font-bold px-4 py-2 text-sm font-medium text-gray-900  hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-azulBalanço dark:hover:text-white dark:hover:bg-azulBalanço dark:focus:ring-blue-500 dark:focus:text-white">
                        Cliente
                    </button>
                    <button type="button" className="font-bold px-4 py-2 text-sm font-medium text-gray-900  hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-azulBalanço dark:hover:text-white dark:hover:bg-azulBalanço dark:focus:ring-blue-500 dark:focus:text-white">
                        Promoter
                    </button>
                </div>
            </div>

            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                {children}
            </div>
        </div>
    );
}

export default Forms;


// <ion-icon name="person-outline"></ion-icon>