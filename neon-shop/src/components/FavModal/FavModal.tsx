import "./FavModal.css";
import ModelBox from "components/Models/ModelBox/ModelBox";
import { FaHeart, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

export interface IProps {
  data: any;
}

const FavModal = ({ setIsFavOpen, navbarFavs }: any) => {
  console.log("navbarFav", navbarFavs);

  return (
    <div className="favWrapper">
      <div className="closeBtn">
        <p className="fav_header">Избранное </p>
        <FaTimes
          style={{
            color: "rgba(71, 36, 117, 0.89)",
            cursor: "pointer",
          }}
          onClick={() => setIsFavOpen(false)}
        />
      </div>
      <div className="fav-items">
        {navbarFavs &&
          navbarFavs?.map(([key, value]: any) => (
            <>
              <div className="favItem">
                <div className="favTopItem">
                  <ModelBox
                    width="8em"
                    height="8 em"
                    glbSrc={value.glbFile}
                    iosSrc={value.iosSrc}
                  />
                  <p>{value.name}</p>
                </div>
              </div>
            </>
          ))}
        {navbarFavs.length === 0 ? <h3>Наши вывески нуждаются в ваших&nbsp;<FaHeart/></h3> : ""}
      </div>
    </div>
  );
};

export default FavModal;
