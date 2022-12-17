import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className="container flex h-screen bg-blue-500 dark:bg-[#191A19] overflow-hidden min-w-full">
      <div className="overflow-hidden mt-[1.5rem] mb-[1.5rem] mx-auto lg:m-auto bg-slate-50 rounded-md lg:w-3/5 lg:h-3/4 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}/>
          <div className={styles.cloud_one}/>
          <div className={styles.cloud_two}/>
        </div>
        <div className="lg:right mt-[-6rem] lg:mt-0 xs:row lg:flex lg:flex-col justify-evenly bg-slate=100 dark:bg-[#D8E9A8]">
          <div className="text-center py-4 lg:py-10">
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}
