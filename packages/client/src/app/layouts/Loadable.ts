/**
 *
 * Asynchronously loads the component for Layouts
 *
 */

import { lazyLoad } from '../../utils/loadable';

export const Layouts = lazyLoad(
  () => import('./index'),
  module => module.default
);
