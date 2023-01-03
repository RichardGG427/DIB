import { createApp } from 'vue';
import App from './App.vue';
import 'amfe-flexible';
import {
  Button,
  Icon,
  Tab,
  Tabs,
  Toast,
  TreeSelect,
  Stepper,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  ContactCard,
  Card,
  Dialog,
  AddressList,
  AddressEdit,
  Field,
  Form,
} from 'vant';
import router from '../src/router';
import './common/css/base.less';
import 'default-passive-events';
import store from './store';
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

const app = createApp(App);

app
  .use(Button)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(TreeSelect)
  .use(Stepper)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(ContactCard)
  .use(Card)
  .use(Dialog)
  .use(AddressList)
  .use(AddressEdit)
  .use(Field)
  .use(Form);

app.use(router);
app.use(store);
app.mount('#app');
Locale.use('en-US', enUS);
