import React from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import useNotification from '../../../hooks/useNotification';

interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, closeModal }) => {
  const { notifications, isLoading, error } = useNotification();

  return (
    <Transition show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center lg:justify-end lg:-top-[30rem] lg:right-52 p-4">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="scale-95"
            enterTo="scale-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="scale-100"
            leaveTo="scale-95"
          >
            <DialogPanel className="w-full max-w-md transform rounded-lg bg-white p-6 text-left shadow-xl transition-all">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={closeModal}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-4 max-h-96 overflow-y-auto">
                {isLoading ? (
                  <p className="text-sm text-gray-500">Loading notifications...</p>
                ) : error ? (
                  <p className="text-sm text-red-500">Failed to load notifications.</p>
                ) : notifications && notifications.length > 0 ? (
                  <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                      <li key={index} className="border rounded p-3">
                        <p className="text-sm font-semibold text-gray-900">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.category}</p>
                        <p className="text-sm text-gray-500">Name: {notification.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {notification.quantity}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">You have no new notifications.</p>
                )}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationModal;
