import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from './Table';

function Wallet() {
  // const dispatch: Dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCurrencies());
  // }, [dispatch]);

  return (
    <>
      <Header />
      <WalletForm />
      <Table />
    </>
  );
}

export default Wallet;
