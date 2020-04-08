// //React
// import React, { useState, useEffect } from 'react';
// import { Context } from '../Context';

// //Components
// import SourceBox from './SourceBox';

// import { dataFetch } from '../modules/dataFetch';

// //Styles
// import { createUseStyles } from 'react-jss';
// import { header4, button } from '../styles';

// const useStyles = createUseStyles({
//   showMoreBtn: {
//     ...button,
//     color: 'black',
//     float: 'right'
//   },
//   header4: {
//     ...header4,
//     margin: {
//       top: 35
//     }
//   }
// });

// function ChooseSources(props) {
//   let { state, dispatch } = React.useContext(Context);
//   const classes = useStyles();
//   let [techSources, setTechSources] = useState([]);
//   let [newsSources, setNewsSources] = useState([]);
//   let [designSources, setDesignSources] = useState([]);
//   let [techShowing, setTechShowing] = useState(3);
//   let [newsShowing, setNewsShowing] = useState(3);

//   useEffect(() => {
//     // TODO do only one fetch on mount not on state.subscriptions

//     dataFetch('getSources', { searchTerm: 'I_N_I_T' }).then(jsonRes => {
//       setTechSources(
//         jsonRes.tech.filter(source => state.subscriptions.indexOf(source.title) === -1)
//       );
//       setNewsSources(
//         jsonRes.news.filter(source => state.subscriptions.indexOf(source.title) === -1)
//       );
//       setDesignSources(
//         jsonRes.design.filter(source => state.subscriptions.indexOf(source.title) === -1)
//       );
//     });
//   }, [state.subscriptions]);
//   return (
//     <>
//       <h4 className={classes.header4}>Tech</h4>
//       {techSources.slice(0, techShowing).map(source => (
//         <SourceBox name={source.title} key={source.title} />
//       ))}
//       <button
//         className={classes.showMoreBtn}
//         style={{ display: techShowing > techSources.length ? 'none' : 'block' }}
//         onClick={() => {
//           setTechShowing(techShowing + 3);
//         }}
//       >
//         More Tech sources
//       </button>
//       <h4 className={classes.header4}>News</h4>

//       {newsSources.slice(0, newsShowing).map(source => (
//         <SourceBox name={source.title} key={source.title} />
//       ))}
//       <button
//         className={classes.showMoreBtn}
//         style={{ display: newsShowing > newsSources.length ? 'none' : 'block' }}
//         onClick={() => {
//           setNewsShowing(newsShowing + 3);
//         }}
//       >
//         More News sources
//       </button>
//       <h4 className={classes.header4}>Design</h4>
//       {designSources.map(source => (
//         <SourceBox name={source.title} key={source.title} />
//       ))}

//       <div className={classes.header4}>
//         You're subscribed to {state.subscriptions.length} source
//         {state.subscriptions.length === 1 ? '' : 's'}
//       </div>
//       {state.subscriptions.map(subscription => (
//         <SourceBox name={subscription} key={subscription} subscribed={true} />
//       ))}
//     </>
//   );
// }

// export default ChooseSources;
