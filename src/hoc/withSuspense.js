import React from "react";

export const withSuspense = (Component) => {
   return (props) => {
      return (
         <React.Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props} />
         </React.Suspense>
      )
   }
}

export default withSuspense