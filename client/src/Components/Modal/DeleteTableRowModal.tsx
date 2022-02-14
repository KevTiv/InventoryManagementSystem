import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-fluent/delete-48-filled';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type deleteTableRowModalProps={
    deleteId: number,
    deleteCategory: string
}
//() => setIsOpen(false)
export const DeleteTableRowModal =({deleteId, deleteCategory}:deleteTableRowModalProps ) =>{
  let axios = require('axios').default;
  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const onOpen=()=>setIsOpen(true);
  const onClose=()=>setIsOpen(false);
  const inventoryUrlFragment = '/api/inventory/';
  const productUrlFragment = '/api/product/';
  const brandUrlFragment = '/api/brand/';
  
  const deleteFunction = async(idToDelete:number, categoryToDelete:string )=>{

    // ! Create a refesh method after axios is complete.

    switch (categoryToDelete) {
      case 'inventory':
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}${inventoryUrlFragment}${idToDelete}`)
        .then(function(res:any){
          console.log(res);
        }).catch(function(err:any){
          console.log(err);
        });
        navigate('/dashboard');
        break;

      case 'product':
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}${productUrlFragment}${idToDelete}`)
        .then(function(res:any){
          console.log(res);
        }).catch(function(err:any){
          console.log(err);
        });
        navigate('/dashboard');
        break;

      case 'brand':
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}${brandUrlFragment}${idToDelete}`)
        .then(function(res:any){
          console.log(res);
        }).catch(function(err:any){
          console.log(err);
        });
        navigate('/dashboard');
        break;

      default:
        break;
    }
    
  }
  return (
    // <Dialog open={isOpen} onClose={onClose}>
    //   <Dialog.Overlay />

    //   <Dialog.Title>Delete function called</Dialog.Title>
    //   <Dialog.Description>
    //     This will permanently delete this row entry.
    //   </Dialog.Description>

    //   <p>
    //     Are you sure you want to delete this entry? This action cannot be undone.
    //   </p>

    //   <button 
    //     onClick={() =>{ 
    //       deleteRow();
    //       onClose();
    //     }}>Delete this entry</button>
    //   <button onClick={() => onClose()}>Cancel</button>
    // </Dialog>
    
      <>
        <div className="relative inset-0 ">
            <button
              type="button"
              onClick={onOpen}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <Icon icon={deleteIcon} className="text-lg text-red-400 dark:text-red-700"/>
            </button>
          </div>
          {isOpen? 
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform
                      bg-white dark:bg-gray-600 shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="flex align-middle text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >
                        <Icon  icon="gg:danger" className="text-red-600 dark:text-red-600 mx-1 my-1"/>
                        Delete function called
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-base text-red-600 dark:text-red-400">
                          This will permanently delete this row entry.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-100">
                          Are you sure you want to delete this entry? This action cannot be undone.
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-base font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={()=>{
                            deleteFunction(deleteId, deleteCategory);
                            onClose()
                          }}
                        >
                          <Icon icon={deleteIcon} className="text-lg text-red-400 dark:text-red-700 mx-1 "/> Delete
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          :null}
      </>
  )
}