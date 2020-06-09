import { VueConstructor } from 'vue';

import Table from './components/Table';
// import MaxTable from './components/MaxTable';
import MinTable from './components/MinTable';
// import SmallTable from './components/SmallTable';

import AddForm from './components/AddForm';
import FormTag from './components/FormTag';
import Dialog from './components/Dialog';
// import Map from './components/Map';
// import Exports from './components/Exports';
// import Tree from './components/Tree';
// import TreeSelect from './components/TreeSelect';
import Pagination from './components/Pagination';
// import DetailTable from './components/DetailTable';
import Header from './components/Header';
import Search from './components/Search';
import Edit from './components/Edit';
import Upload from './components/Upload';
// import Tag from './components/Tag';
// import SettingTable from './components/SettingTable';
// import Audio from './components/Audio';
// import Video from './components/Video';
// import Qrcode from './components/Qrcode';
import Editor from './components/Editor';
// import Filter from './components/Filter';
import Breadcrumb from './components/Breadcrumb';
import Sku from './components/SKU';
import { OTable, OTableRow } from './components/OrderTable';
// import directives from './directive';
// import utils from './utils';
// import axios from './axios';
// import filters from './filters';
// import api from './api';

const components = [
  // { com: AppLayout, name: AppLayout.name },
  // { com: AppMain, name: AppMain.name },
  // { com: MaxTable, name: MaxTable.name },
  { com: MinTable, name: MinTable.name },
  // { com: SmallTable, name: SmallTable.name },
  { com: Table, name: Table.name },
  { com: AddForm, name: AddForm.name },
  { com: FormTag, name: 'ScFormTag' },
  { com: Dialog, name: 'ScDialog' },
  // { com: Exports, name: Exports.name },
  // { com: Map, name: 'ScMap' },
  // { com: Tree, name: Tree.name },
  // { com: TreeSelect, name: 'ScTreeSelect' },
  { com: Pagination, name: Pagination.name },
  // { com: DetailTable, name: DetailTable.name },
  { com: Header, name: Header.name },
  { com: Search, name: Search.name },
  { com: Edit, name: Edit.name },
  { com: Upload, name: Upload.name },
  { com: Breadcrumb, name: 'ScBreadcrumb' },
  // { com: Tag, name: 'ScTag' },
  // { com: SettingTable, name: SettingTable.name },
  // { com: Audio, name: 'ScAudio' },
  // { com: Video, name: 'ScVideo' },
  // { com: Qrcode, name: 'ScQrcode' },
  { com: Editor, name: 'ScEditor' },
  { com: Sku, name: 'ScSku' },
  { com: OTable, name: 'OTable' },
  { com: OTableRow, name: 'OTableRow' },
  // { com: Filter, name: 'ScFilter' },
];

const install = (Vue: VueConstructor) => {
  components.forEach((component: any) => {
    Vue.component(component.name, component.com);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  //   AppLayout,
  //   AppMain,
  //   MaxTable,
  MinTable,
  //   SmallTable,
  Table,
  //   DetailTable,
  FormTag,
  Dialog,
  AddForm,
  //   Exports,
  //   Map,
  //   Tree,
  //   TreeSelect,
  Pagination,
  Header,
  Search,
  Edit,
  Upload,
  Breadcrumb,
  //   Tag,
  //   SettingTable,
  //   Audio,
  //   Video,
  //   Qrcode,
  Editor,
  Sku,
  OTable,
  OTableRow,
  //   Filter,
};
