import React, { ReactElement } from 'react';

/**
 * 일반인 KIOSK 레이아웃
 * @param props
 * @constructor
 */
const Layout = (props: { children: ReactElement }) => {
  return (
    <div className="mx-auto max-w-screen-md h-screen p-4 md:p-30">
      <div className="flex h-full border-solid border-2 border-b-gray-950">{props.children}</div>
    </div>
  );
};

export default Layout;
