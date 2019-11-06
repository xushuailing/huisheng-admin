import _Storage from './storage';
import * as loading from './loading';
import * as verify from './verify';
import * as _UserInfo from './userInfo';
import * as handlerEvent from './handlerEvent';
import * as handlerData from './handlerData';
import * as basic from './basic';
import * as formatDate from './formatDate';
import * as dialog from './operationDialog';
import * as error from './error';
import * as setColumns from './setColumns';
import * as judge from './judge';

export default {
  ...basic,
  ...verify,
  ...dialog,
  ...loading,
  ...formatDate,
  ...handlerData,
  ...handlerEvent,
  ...error,
  ...setColumns,
  ...judge,
  _UserInfo,
  _Storage,
};
