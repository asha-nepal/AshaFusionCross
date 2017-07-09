import styles from './styles.json';
import medicines from '../../../../../data/dhulikhel-medicine-list-brandnames.json';

styles
  .record
  .find(s => s.id === 'physical')
  .style
  .find(s => s.field === 'prescription')
  .fields
  .find(s => s.field === 'medicine')
  .suggestions
    = medicines;

export default styles;
