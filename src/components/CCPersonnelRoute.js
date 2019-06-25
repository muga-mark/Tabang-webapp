import React from "react";
//import DashboardCCPersonnel from './DashboardCCPersonnel';
//import { Route, Redirect } from "react-router-dom";
import {
    
    Route,
    
    Redirect,
    
  } from 'react-router'
  
// export const CCPersonnelRoute = ({
//   component: Component,
//   ...rest
// }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (auth.isAuthenticated()) {
//           return <Component {...props} />;
//         } else {i
//           return (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location
//                 }
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

// export const CCPersonnelRoute = ({ component: Component, ...rest }) => ( 
//     <Route {...rest} render={(props) => (
//       props.user_type === 'Command Center Personnel'
//         ? <Component {...props} />
//         : <Redirect to='/login' />
//     )} />
// );

// export const CCPersonnelRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       (this.props.user_type === 'Command Center Personnel') ? (
//         <Component {...props} {...rest} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//           }}
//         />
//       )
//     }
//   />
// );

const CCPersonnelRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      (this.props.user_type === 'Command Center Personnel') ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default CCPersonnelRoute;