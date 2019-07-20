import React from 'react';
import moment from 'moment';
import NepaliDatePicker from 'react-datepicker-nepali';
import { default as NepaliDate } from 'nepali-date';

type Props = {
  date: {
    startDate: Moment,
    endDate: Moment,
  },
  onDatesChange: ({
    startDate: Moment,
    endDate: Moment,
  }) => void,
}

export default class NepaliDateRangePicker extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.createDates = this.createDates.bind(this);
  }

  state: {
    selectedStartDate: Date,
    selectedEndDate: Date,
  }

  handleStartDateChange(selectedStartDate) {
    if (this.state.selectedEndDate && this.state.selectedEndDate < selectedStartDate) {
      return;
    }

    this.setState({ selectedStartDate });

    if (this.state.selectedStartDate) {
      this.props.onDatesChange(
        this.createDates(selectedStartDate, this.state.selectedEndDate)
      );
    }
  }

  handleEndDateChange(selectedEndDate) {
    if (this.state.selectedStartDate && selectedEndDate < this.state.selectedStartDate) {
      return;
    }

    this.setState({ selectedEndDate });

    if (this.state.selectedStartDate) {
      this.props.onDatesChange(
        this.createDates(this.state.selectedStartDate, selectedEndDate)
      );
    }
  }

  createDates(startNepaliDate, endNepaliDate) {
    return {
      startDate: moment(new NepaliDate(startNepaliDate).getEnglishDate()),
      endDate: moment(new NepaliDate(endNepaliDate).getEnglishDate()),
    };
  }

  render() {
    return (
      <div>
        <small>Nepali Date</small>
        <div className="level">
          <div className="level-left">
            <NepaliDatePicker
              date={this.state.selectedStartDate}
              onChange={this.handleStartDateChange}
            />
          </div>
          <div className="level-right">
            ~
            <NepaliDatePicker
              date={this.state.selectedEndDate}
              onChange={this.handleEndDateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
