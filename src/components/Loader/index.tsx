import { reuleaux } from 'ldrs'
import styles from './Loader.module.scss'

reuleaux.register();


const Loader = () => {
  return (
    <div className={styles.root}>
    <l-reuleaux color="#fe5f1e"></l-reuleaux>
    </div>
  )
}

export default Loader