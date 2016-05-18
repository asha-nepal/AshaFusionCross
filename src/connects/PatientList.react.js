import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    patientList: state.patientList,
  }
}

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
