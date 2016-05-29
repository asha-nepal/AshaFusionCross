import React from 'react'
import {reduxForm} from 'redux-form'

export default reduxForm({
  form: 'patient',
  fields: ['name', 'age', 'sex', 'address']
})(React.createClass({
  render() {
    const {
      fields,
      handleSubmit,
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input type="text" {...fields.name}/>
          </label>
        </div>

        <div>
          Sex
          <label>
            <input type="radio" {...fields.sex} value="male" checked={fields.sex.value === 'male'}/> Male
          </label>
          <label>
            <input type="radio" {...fields.sex} value="female" checked={fields.sex.value === 'female'}/> Female
          </label>
        </div>

        <div>
          <label>
            Age
            <input type="number" {...fields.age}/>
          </label>
        </div>

        <div>
          <label>
            Address
            <input type="text" {...fields.address}/>
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    )
  }
}))
