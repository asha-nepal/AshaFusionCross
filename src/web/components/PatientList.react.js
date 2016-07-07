/* @flow */

import React, { PropTypes} from 'react'
import { Link } from 'react-router'

export default React.createClass({

  propTypes: {
    isFetching: PropTypes.bool,
    fetchPatientList: PropTypes.func.isRequired,
    subscribeChange: PropTypes.func.isRequired,
    patientList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })).isRequired,
    onPatientSelect: PropTypes.func,
  },

  getInitialState: function(){
      return { searchString: '' };
  },

  handleChange: function(e){
      this.setState({searchString: e.target.value});
  },

  componentWillMount() {
    this.props.fetchPatientList()
    this.setState({
      unsubscribeChange: this.props.subscribeChange(),
    })
  },

  componentWillUnmount() {
    if (this.state.unsubscribeChange) {
      this.state.unsubscribeChange()
    }
  },

  render() {
    var {
      isFetching,
      patientList,
      onPatientSelect,
    } = this.props

    if (isFetching) {
      return <div>Fetching patient list...</div>
    }

    searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){
        patientList = patientList.filter(function(l){
        return l.name.toLowerCase().match( searchString );
    });
   }

   return (
          <div>
           <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
           <Link to={'/patient/'}>
             New
           </Link>
           <ul>
           {patientList.map((patient, i) =>
             <li key={i}>
               <Link to={`/patient/${patient._id}`}>
                 {patient.name}
               </Link>
             </li>
           )}
           </ul>
         </div>
       )
     }
  })
