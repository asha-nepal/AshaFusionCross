/* @flow */

import { RadioGroup, RadioGroupComponent } from './RadioGroup';
import { Select, SelectComponent } from './Select';
import { TextInput, TextInputComponent } from './TextInput';
import { TextArea } from './TextArea';
import { TextUnitInput, TextUnitInputComponent } from './TextUnitInput';
import { Attachment } from './Attachment';
import { AttachmentInput } from './AttachmentInput';
import { AttachmentViewer } from './AttachmentViewer';
import { Accordion } from './Accordion';
import { Checkbox, CheckboxComponent } from './Checkbox';
import { CheckGroup } from './CheckGroup';
import { AutoCalc } from './AutoCalc';
import { GuideTools } from './GuideTools';
import { Diagnoses } from './Diagnoses';
import { MultiInput } from './MultiInput';
import { MultiDoubleInput } from './MultiDoubleInput';
import { SubformList, SubformListComponent, ReadonlySubformList } from './SubformList';
import { Block } from './Block';

const fieldComponentList = {
  textinput: TextInput,
  textunitinput: TextUnitInput,
  textarea: TextArea,
  radio: RadioGroup,
  select: Select,
  attachment: Attachment,
  attachmentinput: AttachmentInput,
  attachmentviewer: AttachmentViewer,
  accordion: Accordion,
  check: Checkbox,
  checkgroup: CheckGroup,
  autocalc: AutoCalc,
  guide: GuideTools,
  diagnoses: Diagnoses,
  multiinput: MultiInput,
  multidoubleinput: MultiDoubleInput,
  subformlist: SubformList,
  block: Block,
};

export {
  RadioGroup, RadioGroupComponent,
  Select, SelectComponent,
  TextInput, TextInputComponent,
  TextArea,
  TextUnitInput, TextUnitInputComponent,
  Attachment,
  AttachmentInput,
  AttachmentViewer,
  Accordion,
  Checkbox, CheckboxComponent,
  CheckGroup,
  AutoCalc,
  GuideTools,
  Diagnoses,
  MultiInput,
  MultiDoubleInput,
  SubformList, SubformListComponent, ReadonlySubformList,
  Block,
  fieldComponentList,
};
