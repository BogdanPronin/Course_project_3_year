import "./Sort.css";

export interface IProps {
  sortOption: any;
  setSortOption: any;
}

const Sort: React.FC<IProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="select">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option defaultValue="Sort by">Фильтр</option>
        <option value="price: high-to-low">Сначала дороже</option>
        <option value="price: low-to-high">Сначала дешевле</option>
      </select>
    </div>
  );
};

export default Sort;
