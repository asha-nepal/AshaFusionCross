/**
 * Copyright 2017 Yuichiro Tsuchiya
 * Copyright 2017 kubo shizuma
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import { SubformList, SubformListComponent, ReadonlySubformList } from './SubformList';
import { Block } from './Block';
import fieldify from './common/fieldify';

const fieldComponentList = {
  textinput: fieldify(TextInput),
  textunitinput: fieldify(TextUnitInput),
  textarea: fieldify(TextArea),
  radio: fieldify(RadioGroup),
  select: fieldify(Select),
  attachment: fieldify(Attachment),
  attachmentinput: fieldify(AttachmentInput),
  attachmentviewer: fieldify(AttachmentViewer),
  accordion: Accordion,
  check: fieldify(Checkbox),
  checkgroup: fieldify(CheckGroup),
  autocalc: fieldify(AutoCalc),
  guide: GuideTools,
  diagnoses: Diagnoses,
  multiinput: fieldify(MultiInput),
  subformlist: fieldify(SubformList),
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
  SubformList, SubformListComponent, ReadonlySubformList,
  Block,
  fieldComponentList,
};
