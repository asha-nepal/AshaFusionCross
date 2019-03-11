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

export const createText = (fontSize) => ({
  children,
  x = 0,
  y = 0,
  xScale = 1.0,
}: {
  children: React$Element<any>,
  x: number,
  y: number,
  xScale: number,
}) => (
  <span
    style={{
      position: 'absolute',
      left: `${x}mm`,
      top: `${y}mm`,
      fontSize: `${fontSize}mm`,
      transform: `scale(${xScale}, 1.0)`,
      transformOrigin: 'top left',
    }}
  >{children}</span>
);

export const Table = ({
  children,
  x,
  y,
  fontSize,
}: {
  children: React$Element<any>,
  x: number,
  y: number,
  fontSize: number,
}) => (
  <table
    style={{
      position: 'absolute',
      left: `${x}mm`,
      top: `${y}mm`,
      fontSize: `${fontSize}mm`,
      whiteSpace: 'pre',
      tableLayout: 'fixed',
    }}
  >
    <tbody>
      {children}
    </tbody>
  </table>
);

export const Row = ({
  children,
  height,
}: {
  children: React$Element<any>,
  height: number,
}) => (
  <tr
    style={{
      height: `${height}mm`,
    }}
  >{children}</tr>
);

export const Col = ({
  children,
  width,
}: {
  children: React$Element<any>,
  width: number,
}) => (
  <td
    style={{
      width: `${width}mm`,
      textAlign: 'center',
      position: 'relative',
    }}
  >{children}</td>
);

export const ImageTemplate = ({
  children,
  src,
  pageBreak = false,
}: {
  children: React$Element<any>,
  src: string,
  pageBreak: boolean,
}) => (
  <div
    style={{
      position: 'relative',
      margin: 0,
      width: '251mm',
      height: '172mm',
      pageBreakAfter: pageBreak ? 'always' : undefined,
    }}
  >
    <img
      src={src}
      role="presentation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
        width: '100%',
      }}
    />
    {children}
  </div>
);
