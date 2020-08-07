/*
Use this component only when the entire list is available when using this.
Don't use this when items have to be fetched from the server to show more items
*/

//React
import React, { useState, useEffect } from 'react';
import { Context } from '../Context';

//Components

//Styles
import { createUseStyles } from 'react-jss';
import { button } from '../styles';
const useStyles = createUseStyles({
  showMoreBtn: state => ({
    ...button,
    display: state.length - state.itemsToShow ? 'block' : 'none'
  }),
  moreCount: {
    backgroundColor: '#455A64',
    display: 'inline-block',
    padding: 1,
    margin: {
      left: 4
    },
    borderRadius: 2
  }
});

function Paginator(props) {
  //let { state, dispatch } = React.useContext(Context);

  const [items, setItems] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(0); // This is the length not index
  const [length, setLength] = useState(0);
  const [increment, setIncrement] = useState(0);
  useEffect(() => {
    setItems(props.items);
    setLength(props.items.length);
    setIncrement(props.increment || 4);
    setItemsToShow(Math.min(props.initialItems || 4, props.items.length));
    // The Math.min is to keep itemsToShow < length at all times
  }, [props]);

  const classes = useStyles({ length, itemsToShow });
  function increaseLength() {
    if (itemsToShow + increment <= length) {
      setItemsToShow(itemsToShow + increment);
    } else {
      setItemsToShow(length);
    }
  }
  return (
    <>
      {items.slice(0, itemsToShow)}
      <div style={{ display: 'flex' }}>
        {/* This flex is to push the button to the end */}
        <div style={{ flexGrow: 1 }}></div>
        <button className={classes.showMoreBtn} onClick={() => increaseLength()}>
          {props.showMoreMessage || 'Show More'}

          <span className={classes.moreCount}>{length - itemsToShow}</span>
        </button>
      </div>
    </>
  );
}

export default Paginator;
