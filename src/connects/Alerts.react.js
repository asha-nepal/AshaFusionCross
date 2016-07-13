import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
