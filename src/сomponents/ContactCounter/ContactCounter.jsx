import React from 'react';
// import PropTypes from 'prop-types';
// import { CssForm } from 'сomponents';

//import { useSelector, useDispatch } from 'react-redux';
import { useGetContactsQuery } from 'utilities/contacts';

// import { setfilter } from 'redux/store';

export function ContactCounter() {
  const { data: contacts, isFetching } = useGetContactsQuery();

  //console.log(contacts);

  return <span>( total contacts: {!isFetching && contacts.length} )</span>;
}
