
const ProductTable = () => {
    return (
        <>
            <div className="flex flex-col bg-white my-8 mx-8 text-left">
                Product Table
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div
                        className="
                        shadow
                        overflow-hidden
                        border-b border-gray-200
                        sm:rounded-lg
                        "
                        >
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="
                                        px-6
                                        py-3
                                        text-left text-xs
                                        font-medium
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                        "
                                        >
                                        Name
                                        </th>
                                        <th
                                        scope="col"
                                        className="
                                        px-6
                                        py-3
                                        text-left text-xs
                                        font-medium
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                        "
                                        >
                                        Title
                                        </th>
                                        <th
                                        scope="col"
                                        className="
                                        px-6
                                        py-3
                                        text-left text-xs
                                        font-medium
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                        "
                                        >
                                        Status
                                        </th>
                                        <th
                                        scope="col"
                                        className="
                                        px-6
                                        py-3
                                        text-left text-xs
                                        font-medium
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                        "
                                        >
                                        Role
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                                    alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        Flora Wu
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        flora.wu@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Software engineer</div>
                                        <div className="text-sm text-gray-500">IT</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                        className="
                                        px-2
                                        inline-flex
                                        text-xs
                                        leading-5
                                        font-semibold
                                        rounded-full
                                        bg-green-100
                                        text-green-800
                                        "
                                        >
                                        Active
                                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Admin
                                        </td>
                                        <td
                                        className="
                                        px-6
                                        py-4
                                        whitespace-nowrap
                                        text-right text-sm
                                        font-medium
                                        "
                                        >
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </a
                                        >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable
