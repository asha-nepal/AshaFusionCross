/**
 * Copyright 2017 Yuguan Xing
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
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import type { Moment } from 'moment';

type Props = {
  date: Moment,
  onDatesChange: Moment,
}

export default class DatePicker extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      focused: null,
    };
  }

  state: {
    focused: START_DATE | END_DATE | null,
  }

  props: Props

  render() {
    const {
      date,
      onDatesChange,
    } = this.props;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const opts = {
      numberOfMonths: isMobile ? 1 : 2,
      withPortal: isMobile,
    };

    return (
      <div className="columns">
        <div className="column is-narrow">
          <DateRangePicker
            startDate={date.startDate}
            endDate={date.endDate}
            focusedInput={this.state.focused}
            onDatesChange={onDatesChange}
            onFocusChange={(focused) => { this.setState({ focused }); }}
            isOutsideRange={() => false}
            {...opts}
          />
        </div>
        <div className="column is-narrow">
          <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
            <a
              className="delete"
              onClick={e => {
                e.preventDefault();
                onDatesChange({ startDate: null, endDate: null });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
