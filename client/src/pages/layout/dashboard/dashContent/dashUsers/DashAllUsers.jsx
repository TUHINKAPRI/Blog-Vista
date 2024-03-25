import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUser } from "services/slices/userSlice";
import Loader from "utils/Loader/Loader";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
function DashAllUsers() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
const[openModal,setOpenModal]=useState(false)
const [userId,setUserId]=useState(null)
const submitHandler=()=>{
  dispatch(deleteUser({userid:userId})).then(res=>{
    if(res?.payload?.status==='success'){
      toast.success(res.payload.message)
    }

  })
}
  useEffect(() => {
    dispatch(fetchAllUser());
    
  }, []);
  return (
    <div className="w-full max-h-full  ">
      {loading ? (
        <div className="w-full min-h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto m-2">
          <Table>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>user-image</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>user-name</Table.HeadCell>
              <Table.HeadCell>admin</Table.HeadCell>
              <Table.HeadCell>delete</Table.HeadCell>
              
            </Table.Head>
            <Table.Body className="divide-y">
            {
              users?.map((user)=>{
                return(
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                 {new Date(user?.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <img src={user?.profilePicture} alt='erwgrg ' className="w10 h-10 object-cover rounded-full"/>
                </Table.Cell>
                <Table.Cell>{user?.email}</Table.Cell>
                <Table.Cell>{user?.username}</Table.Cell>
                <Table.Cell>
                  {
                    user?.isAdmin?(<><FaCheck className="text-red-500" /></>):(<>
                      <FaTimes />
                    </>)
                  }
                </Table.Cell>
                <Table.Cell>
                <button onClick={()=>{setOpenModal(true);
                setUserId(user?._id)
                }}>
                <MdOutlineDelete className="text-xl" />
                </button>
                </Table.Cell>
              </Table.Row>
                )
              })
            }
              
            </Table.Body>
          </Table>
        </div>
      )}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={submitHandler}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashAllUsers;
