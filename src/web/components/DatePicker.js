/* @flow */
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import type { Moment } from 'moment';
import { START_DATE, END_DATE } from 'react-dates/constants';

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

    return (
      <div className="block">
        <DateRangePicker
          id="date_input"
          startDate={date.startDate}
          endDate={date.endDate}
          focusedInput={this.state.focused}
          onDatesChange={onDatesChange}
          onFocusChange={(focused) => { this.setState({ focused }); }}
          isOutsideRange={() => false}
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
