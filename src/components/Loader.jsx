import { HashLoader } from "react-spinners";

const Loader = ({ loading, color }) => {

    const override = {
        position: 'fixed',
        left: '42%',
        top: '34%',
        zIndex: '999',
      };
  return <HashLoader cssOverride={override} color={color ? color : "#36d7b7"} loading={loading} size={150} />;
};

export default Loader;