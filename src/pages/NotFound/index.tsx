import styles from './NotFound.module.scss'


const NotFound = () => {
  return (
    <div className={styles.base}>
      <h2>Ничего не найдено 😕</h2>
      <p>
        К сожалению, данная страница отсутсвует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFound;
