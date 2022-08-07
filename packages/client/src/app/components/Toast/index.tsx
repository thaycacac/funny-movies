import { Toaster, ToastOptions } from 'react-hot-toast';

import React from 'react';

export const TToast: React.FC<ToastOptions> = props => {
  return <Toaster {...props} />;
};

export { toast, type ToastOptions } from 'react-hot-toast';
