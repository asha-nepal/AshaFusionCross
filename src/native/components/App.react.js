import React, {
  Component,
} from 'react'

import Root from '../../common/Root.react'

import PatientList from '../containers/PatientList.react'

export default class extends Component {
  render() {
    return (
      <Root>
        <PatientList />
      </Root>
    )
  }
}
