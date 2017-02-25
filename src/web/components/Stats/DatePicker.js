/* @flow */
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import type { Moment } from 'moment';

type Props = {
  date: Moment,
  onDatesChange: Moment,
}

export default class DatePicker extends Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  state: {
    focused: boolean,
  }

  props: Props

  render() {
    const {
      date,
      onDatesChange,
    } = this.props;

    return (
      <DateRangePicker
        id="date_input"
        startDate={date.startDate}
        endDate={date.endDate}
        focusedInput={this.state.focused}
        onDatesChange={onDatesChange}
        onFocusChange={(focused) => { this.setState({ focused }); }}
        isOutsideRange={() => false}
      />
    );
  }
}
