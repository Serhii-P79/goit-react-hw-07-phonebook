import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
// import PropTypes from 'prop-types';
import { CssForm, CssContactList, ContactItem } from 'сomponents';

import { useSelector, useDispatch } from 'react-redux';
//import { deleteContact } from 'redux/store';

import { useGetContactsQuery } from 'utilities/contacts';
//import { useAddContactMutation } from 'utilities/contacts';
import { useDeleteContactMutation } from 'utilities/contacts';

import { setDisabledButton } from 'redux/store';

export function ContactList() {
  const { data: contacts, error, isLoading } = useGetContactsQuery();
  const dispatch = useDispatch();
  //const [addData] = useAddContactMutation();

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  //dispatch(setDisabledButton(isDeleting));
  // const handleAddContact = async () => {
  //   try {
  //     await addData({ name: 'fdgdfg', phone: '12354651' }).unwrap();
  //   } catch {}
  // };
  useEffect(() => {
    dispatch(setDisabledButton(isDeleting));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleting]);
  // handleAddContact();

  //const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter.value);
  const isDisabledButton = useSelector(state => state.isDisabledButton.value);

  //dispatch(setDisabledButton(isDeleting));
  // console.log('isDisabledButton - ', isDisabledButton);
  // console.log('isDeleting 1 - ', isDeleting);
  let contactsServer = [];

  const getFilteringContactsServer = () => {
    const normolizeFiltr = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normolizeFiltr)
    );
  };

  if (!isLoading && !error) {
    // console.log(contacts);
    contactsServer = getFilteringContactsServer();
  }

  // console.log(error);

  // const getFilteringContacts = () => {
  //   const normolizeFiltr = filter.toLowerCase();
  //   return contacts.filter(({ name }) =>
  //     name.toLowerCase().includes(normolizeFiltr)
  //   );
  // };

  return (
    <CssContactList.ContactList>
      {contactsServer.map(({ id, name, phone }) => {
        return (
          <ContactItem key={id} name={name} number={phone}>
            <CssForm.Button
              type="button"
              name="del"
              onClick={e => {
                deleteContact(id).then(
                  toast.success(`Contact - ${name} - has been deleted.`)
                );
              }}
              disabled={isDisabledButton}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </CssForm.Button>
          </ContactItem>
          // <CssContactList.Contact key={id}>
          //   <CssContactList.Name>{name}:</CssContactList.Name> tel:{' '}
          //   <CssContactList.Number>{number}</CssContactList.Number>
          //   <CssForm.Button
          //     type="button"
          //     name="del"
          //     onClick={e => onDelete(e, id)}
          //   >
          //     Delete
          //   </CssForm.Button>
          // </CssContactList.Contact>
        );
      })}
    </CssContactList.ContactList>
  );
}

// ContactList.propTypes = {
//   contact: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onDelete: PropTypes.func.isRequired,
// };
