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
      <div className="block">
        <DateRangePicker
          startDate={date.startDate}
          endDate={date.endDate}
          focusedInput={this.state.focused}
          onDatesChange={onDatesChange}
          onFocusChange={(focused) => { this.setState({ focused }); }}
          isOutsideRange={() => false}
          {...opts}
        />
        <a
          className="button is-large"
          onClick={e => {
            e.preventDefault();
            onDatesChange({ startDate: null, endDate: null });
          }}
        ><i className="fa fa-times" /></a>
      </div>
    );
  }
}
