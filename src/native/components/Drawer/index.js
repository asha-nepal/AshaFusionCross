/**
 * Copyright 2017 Yuichiro Tsuchiya
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

import React from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import SideMenu from '../../containers/Drawer/SideMenu';

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#fff' },
  main: { paddingLeft: 3 },
};

export default ({
  onNavigate,
  navigationState,
}: {
  onNavigate: Function,
  navigationState: Object,
}) => {
  const children = navigationState.children;

  return (
    <Drawer
//        ref="navigation"
      type="overlay"
      open={navigationState.open}
      onOpen={() => Actions.refresh({ key: navigationState.key, open: true })}
      onClose={() => Actions.refresh({ key: navigationState.key, open: false })}
      content={<SideMenu
        onClose={() => Actions.refresh({ key: navigationState.key, open: false })}
      />}
      tapToClose
      openDrawerOffset={0.2}
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={drawerStyles}
//        negotiatePan
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 },
      })}
    >
      <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
    </Drawer>
  );
};
